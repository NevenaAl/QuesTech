import itertools


class OpinionScale(object):
    def __init__(self):
        self.scale_start = None
        self.scale_end = None
        self.scale_start_label = None
        self.scale_end_label = None
        self.scale_options = None


class ScaleOption(object):
    def __init__(self, value: float, label: str):
        self.value = value
        self.label = label


class Answer(object):
    def __init__(self, text: str, is_correct: bool = True, points: float = 0):
        self.text = text
        self.is_correct = is_correct
        self.points = points


class Question(object):
    def __init__(self, type: str, text: str):
        self.type = type
        self.text = text
        self.answers = []
        self.required = None
        self.subtype = None
        self.max_rate = None
        self.accept_partial_answer = None
        self.positive_points = None
        self.negative_points = None
        self.scale = None


class SurveyScoring(object):
    def __init__(self, start, end, result):
        self.start = start
        self.end = end
        self.result = result


class AssessmentDetails(object):
    def __init__(self):
        self.completion_time = None
        self.can_skip_to_end = None
        self.percentage_required = None
        self.num_of_correct_answers_required = None
        self.points_required = None
        self.scoring = None


class Assessment(object):
    def __init__(self, title: str, description: str, ask_for_personal_info: bool, assessment_details: AssessmentDetails):
        self.title = title
        self.description = description
        self.ask_for_personal_info = ask_for_personal_info
        self.type = assessment_details.type
        self.questions = convert_questions(assessment_details)
        self.assessment_details = convert_assessment_details(
            assessment_details)


def get_answer_object(answer):
    return Answer(str(answer)) if isinstance(answer, (float, str)) else Answer(answer.text, answer.is_correct, answer.points)


def convert_answers(question_details):
    if hasattr(question_details, "answers"):
        return list(map(get_answer_object, question_details.answers))
    elif hasattr(question_details, "correct_answer") and question_details.correct_answer is not None:
        return list(map(get_answer_object, [question_details.correct_answer]))
    return []


def get_question_object(question, default_positive_points=None, default_negative_points=None):
    temp = Question(question.question_details.type, question.text)
    temp.answers = convert_answers(question.question_details)
    temp.positive_points = default_positive_points
    temp.negative_points = default_negative_points
    if hasattr(question, "required"):
        temp.required = question.required
    if hasattr(question.question_details, "subtype"):
        temp.subtype = question.question_details.subtype
    if hasattr(question.question_details, "max_rate"):
        temp.max_rate = question.question_details.max_rate
    if hasattr(question.question_details, "accept_partial_answer"):
        temp.accept_partial_answer = question.question_details.accept_partial_answer
    if hasattr(question.question_details, "scale") and question.question_details.scale:
        temp.scale = get_scale_object(question.question_details.scale)
    if hasattr(question, "question_points") and question.question_points:
        temp.positive_points = question.question_points.positive
        if question.question_points.negative:
            temp.negative_points = question.question_points.negative
    return temp


def get_scale_object(scale):
    temp = OpinionScale()
    if hasattr(scale, "scale_options"):
        temp.scale_options = []
        for option in scale.scale_options:
            temp.scale_options.append(ScaleOption(option.value, option.label))
    else:
        temp.scale_end = scale.scale_end
        temp.scale_end_label = scale.scale_end_label
        temp.scale_start = scale.scale_start
        temp.scale_start_label = scale.scale_start_label
    return temp


def convert_questions(asseessment_details):
    if (hasattr(asseessment_details, "questions")):
        if asseessment_details.type == "quiz":
            return list(map(lambda q: get_question_object(q, asseessment_details.default_points_per_question, asseessment_details.default_negative_points_per_question), asseessment_details.questions))
        else:
            return list(map(get_question_object, asseessment_details.questions))
    elif (hasattr(asseessment_details, "question")):
        return list(map(get_question_object, [asseessment_details.question]))
    return []


def parse_completion_time(assessment_end):
    if hasattr(assessment_end, "completion_time") and assessment_end.completion_time:
        seconds = 0
        if assessment_end.completion_time.hours:
            seconds += int(assessment_end.completion_time.hours.amount) * 3600
        if assessment_end.completion_time.minutes:
            seconds += int(assessment_end.completion_time.minutes.amount) * 60
        if assessment_end.completion_time.seconds:
            seconds += int(assessment_end.completion_time.seconds.amount)
        return seconds
    return None


def convert_assessment_details(assessment_details) -> AssessmentDetails:
    temp = AssessmentDetails()

    if assessment_details.type == "quiz":
        if assessment_details.pass_criteria:
            temp.percentage_required = assessment_details.pass_criteria.percentage_required
            temp.num_of_correct_answers_required = assessment_details.pass_criteria.num_of_correct_answers_required
            temp.points_required = assessment_details.pass_criteria.points_required
        if assessment_details.end:
            temp.completion_time = parse_completion_time(
                assessment_details.end)
            temp.can_skip_to_end = assessment_details.end.can_skip_to_end

    if (assessment_details.type == "scored_survey"):
        temp.scoring = list(map(lambda scoring: SurveyScoring(
            scoring.range_start, scoring.range_end, scoring.result), assessment_details.scoring))

    return temp
