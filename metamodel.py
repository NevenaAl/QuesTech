
from textx import metamodel_from_file, TextXSemanticError
from os.path import join


def get_assessment_mm(this_folder):
    object_processors = {
        'QuizQuestion': quiz_question_validators,
        "ScoredSurveyQuestion": scored_survey_question_validator,
        "SurveyQuestion": survey_question_validator,
        "ScoredSurvey": scored_survey_ranges_validator,
        "SurveyScoring": survey_scoring_range_order_processor,
        "PollQuestion": survey_question_validator
    }

    metamodel = metamodel_from_file(
        join(this_folder, 'grammar.tx'))

    # metamodel = metamodel_from_file(
    #     join(this_folder, 'grammar.tx'), classes=[Assessment])
    # TODO da li ovde vratiti classes i onda validaciju odraditi unutar njih u pomocnim metodama
    # ili ovde ostaviti validaciju, bez klasa, pa prepakovati u dto posle kreiranja mm

    metamodel.register_obj_processors(object_processors)

    return metamodel


def survey_question_validator(survey_question):
    if hasattr(survey_question.question_details, "answers"):
        for answer in survey_question.question_details.answers:
            scored_survey_question_validator(survey_question)
            if hasattr(answer, "points") and answer.points:
                raise TextXSemanticError(
                    "There are no answer points in a survey/poll.")
    if hasattr(survey_question.question_details, "answer") and survey_question.question_details.answer:
        # TODO pitati da li postoji nacin da float tj broj ne bude 0 po default cak iako se ne navede u modelu
        raise TextXSemanticError(
            "There is no specific answer in a survey/poll.")
    elif hasattr(survey_question.question_details, "correct_answer") and survey_question.question_details.correct_answer is not None:
        print(survey_question.question_details.correct_answer)
        raise TextXSemanticError(
            "There is no correct answer in a survey/poll.")


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


def scored_survey_question_validator(scored_survey_questions):
    for answer in scored_survey_questions.question_details.answers:
        if hasattr(answer, "is_correct") and answer.is_correct:
            raise TextXSemanticError(
                "There are no correct answers in a survey/scored survey/poll.")


def quiz_question_validators(quiz_question):
    if quiz_question.question_details.type == "single_choice":
        if sum(1 for answer in quiz_question.question_details.answers if answer.is_correct) != 1:
            raise TextXSemanticError(
                "There must be exactly one correct answer.")
