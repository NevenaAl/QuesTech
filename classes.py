
# TODO implement opinion scale
class Answer(object):
    def __init__(self, text: str):
        self.text = text
        self.is_correct = False
        self.points = None


class Question(object):
    def __init__(self, type: str, text: str):
        self.type = type
        self.text = text
        self.answers = []
        self.required = None
        self.subtype = None
        self.max_rate = None
        self.accept_partial_answer = None
        self.question_points = None


class Scoring(object):
    def __init__(self, range_start: int, range_end: int, result: float | str):
        self.range_start = range_start
        self.range_end = range_end
        self.result = result


def get_answer_object(answer):
    return Answer(str(answer)) if isinstance(answer, (float, str)) else Answer(answer.text)


def convert_answers(question_details):
    if hasattr(question_details, "answers"):
        return list(map(get_answer_object, question_details.answers))
    elif hasattr(question_details, "correct_answer") and question_details.correct_answer is not None:
        # TODO float je 0.0 i kad se ne navede
        return list(map(get_answer_object, [question_details.correct_answer]))
    return []


def get_question_object(question):
    temp = Question(question.question_details.type, question.text)
    temp.answers = convert_answers(question.question_details)
    if hasattr(question, "required"):
        temp.required = question.required
    if hasattr(question.question_details, "subtype"):
        temp.subtype = question.question_details.subtype
    if hasattr(question.question_details, "max_rate"):
        temp.max_rate = question.question_details.max_rate
    if hasattr(question.question_details, "accept_partial_answer"):
        temp.accept_partial_answer = question.question_details.accept_partial_answer
    return temp


def convert_questions(asseessment_details):
    if (hasattr(asseessment_details, "questions")):
        return list(map(get_question_object, asseessment_details.questions))
    elif (hasattr(asseessment_details, "question")):
        return list(map(get_question_object, [asseessment_details.question]))
    return []


def parse_completion_time(assessment_end):
    if hasattr(assessment_end, "completion_time"):
        print(assessment_end.completion_time.hours)
        print(assessment_end.completion_time.minutes)
        print(assessment_end.completion_time.seconds)
        # TODO parse time here to miliseconds
        # return assessment_end.completion_time
    return None


class SurveyScoring(object):
    def __init__(self, start, end, result):
        self.start = start
        self.end = end
        self.result = result

    def __repr__(self):
        return 'start: ' + str(self.start) + " end: " + str(self.end) + "\n"


class AssessmentDetails(object):
    def __init__(self, ):
        self.default_points_per_question = None
        self.default_negative_points_per_question = None
        self.completion_time = None
        self.can_skip_to_end = None
        self.percentage_required = None
        self.num_of_correct_answers_required = None
        self.points_required = None
        self.scoring = None

    def __str__(self):
        return f'Can skip: {self.can_skip_to_end}, default neg points: {self.default_negative_points_per_question}, Scoring:  {str(self.scoring)}'


def convert_assessment_details(assessment_details) -> AssessmentDetails:
    temp = AssessmentDetails()
    if (assessment_details.type != "poll" and assessment_details.end):
        temp.completion_time = parse_completion_time(
            assessment_details.end)
        temp.can_skip_to_end = assessment_details.end.can_skip_to_end

    if (assessment_details.type == "quiz" and assessment_details.pass_criteria):
        temp.default_points_per_question = assessment_details.default_points_per_question
        temp.default_negative_points_per_question = assessment_details.default_negative_points_per_question
        temp.percentage_required = assessment_details.pass_criteria.percentage_required
        temp.num_of_correct_answers_required = assessment_details.pass_criteria.num_of_correct_answers_required
        temp.points_required = assessment_details.pass_criteria.points_required

    if (assessment_details.type == "scored_survey"):
        temp.scoring = list(map(lambda scoring: SurveyScoring(
            scoring.range_start, scoring.range_end, scoring.result), assessment_details.scoring))

    return temp


class Assessment(object):
    def __init__(self, title: str, description: str, ask_for_personal_info: bool, assessment_details: AssessmentDetails):
        print(assessment_details)
        self.title = title
        self.description = description
        self.ask_for_personal_info = ask_for_personal_info
        self.type = assessment_details.type
        self.questions = convert_questions(assessment_details)
        self.assessment_details = convert_assessment_details(
            assessment_details)

    # def __str__(self):
    #     return "Title: " + self.title + ", description: " + self.description + "\nDetails:" + str(self.assessment_details)
