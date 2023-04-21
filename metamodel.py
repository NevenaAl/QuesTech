
from textx import metamodel_from_file, TextXSemanticError
from os.path import join


def get_assessment_mm(this_folder):
    object_processors = {
        "Quiz": quiz_points_validators,
        'QuizQuestion': quiz_question_validators,
        "ScoredSurveyQuestion": scored_survey_question_validators,
        "SurveyQuestion": survey_question_validator,
        "PollQuestion": survey_question_validator,
        "ScoredSurvey": scored_survey_ranges_validator,
        "SurveyScoring": survey_scoring_range_order_processor,
        "CustomScale": custom_scale_validator
    }

    metamodel = metamodel_from_file(
        join(this_folder, 'grammar.tx'))

    # metamodel = metamodel_from_file(
    #     join(this_folder, 'grammar.tx'), classes=[Assessment])
    # TODO da li ovde vratiti classes i onda validaciju odraditi unutar njih u pomocnim metodama
    # ili ovde ostaviti validaciju, bez klasa, pa prepakovati u dto posle kreiranja mm

    metamodel.register_obj_processors(object_processors)

    return metamodel


def default_points_validator(quiz):
    have_points = True
    if not has_default_points(quiz):
        for question in quiz.questions:
            if not hasattr(question, "question_points") or question.question_points is None:
                have_points = False
                break
    if not have_points and hasattr(quiz, "default_negative_points_per_question") and quiz.default_negative_points_per_question:
        raise TextXSemanticError(
            "If there are default negative points per question defined, all of the questions must have positive points assigned.")


def has_default_points(quiz):
    return hasattr(quiz, "default_points_per_question") and quiz.default_points_per_question


def quiz_points_validators(quiz):
    pass_criteria_points_validator(quiz)
    default_points_validator(quiz)
    accept_partial_answer_validator(quiz)


def accept_partial_answer_validator(quiz):
    if not has_default_points(quiz):
        for question in quiz.questions:
            if question.question_details.type == "multiple_choice":
                if hasattr(question.question_details, "accept_partial_answer") and question.question_details.accept_partial_answer:
                    if not hasattr(question, "question_points") or question.question_points is None:
                        raise TextXSemanticError(
                            "If accept partial answer is true, question must have positive points or default points assigned.")


def pass_criteria_points_validator(quiz):
    has_points = False
    if has_default_points(quiz):
        has_points = True
    else:
        for question in quiz.questions:
            if hasattr(question, "question_points") and question.question_points is not None:
                has_points = True
                break
    if not has_points and hasattr(quiz, "pass_criteria") and hasattr(quiz.pass_criteria, "points_required"):
        raise TextXSemanticError(
            "Can not have points required defined in pass criteria if none of the questions has points assigned.")


def scored_survey_question_validators(scored_survey_question):
    if hasattr(scored_survey_question.question_details, "answers"):
        no_correct_answers_validator(scored_survey_question)


def custom_scale_validator(custom_scale):
    values = []
    for scale_option in custom_scale.scale_options:
        if scale_option.value in values:
            raise TextXSemanticError(
                "There can not be mulutple scale options with the same value.")
        else:
            values.append(scale_option.value)


def survey_question_validator(survey_question):
    if hasattr(survey_question.question_details, "answers"):
        answer_points_validator(survey_question)
        no_correct_answers_validator(survey_question)
    elif hasattr(survey_question.question_details, "correct_answer") and survey_question.question_details.correct_answer:
        # TODO float je 0.0 i kad se ne navede. ako napisem in not None, ulazice u gresku cak iako ga nema u modelu navedenog.
        raise TextXSemanticError(
            "There is no correct answer in a survey/poll.")


def answer_points_validator(question):
    for answer in question.question_details.answers:
        if hasattr(answer, "points") and answer.points:
            raise TextXSemanticError(
                "There are no answer points in a quiz/survey/poll.")


def survey_scoring_range_order_processor(survey_scoring):
    if survey_scoring.range_start > survey_scoring.range_end:
        survey_scoring.range_start, survey_scoring.range_end = survey_scoring.range_end, survey_scoring.range_start


def scored_survey_ranges_validator(scored_survey):
    temp = []
    for scoring_item in scored_survey.scoring:
        for x in range(scoring_item.range_start, scoring_item.range_end):
            if temp.__contains__(x):
                raise TextXSemanticError(
                    "Scoring can not have overlaping ranges i.e. multiple results for the same range.")
            else:
                temp.append(x)


def no_correct_answers_validator(question):
    for answer in question.question_details.answers:
        if hasattr(answer, "is_correct") and answer.is_correct:
            raise TextXSemanticError(
                "There are no correct answers in a survey/scored survey/poll.")


def correct_answers_validator(question):
    if question.question_details.type == "single_choice":
        if sum(1 for answer in question.question_details.answers if answer.is_correct) != 1:
            raise TextXSemanticError(
                "There must be exactly one correct answer in a single choice question.")
    elif question.question_details.type == "multiple_choice":
        # TODO ako ima accept partial answer to pitanje mora imati poene ili quiz defaultne poene
        if sum(1 for answer in question.question_details.answers if answer.is_correct) < 1:
            raise TextXSemanticError(
                "There must be at least one correct answer in a multiple choice question.")
    elif question.question_details.type == "number" or question.question_details.type == "true_false":
        if not hasattr(question.question_details, "correct_answer") or question.question_details.correct_answer is None:
            # TODO prolazice(nece uci ovde u error) ako ne stavimo correct_answer u number pitanju jer je onda po def 0.0
            raise TextXSemanticError(
                "There must be a correct answer in a quiz question.")


def quiz_question_validators(quiz_question):
    if hasattr(quiz_question.question_details, "answers"):
        answer_points_validator(quiz_question)
    correct_answers_validator(quiz_question)
