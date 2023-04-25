
class Answer(object):
    def __init__(self, text: str):
        self.text = text
        self.is_correct = False
        self.points = None


class Question(object):
    def __init__(self, text: str):
        self.text = text
        self.answers = []


class Scoring(object):
    def __init__(self, range_start: int, range_end: int, result: float | str):
        self.range_start = range_start
        self.range_end = range_end
        self.result = result


def get_answer_object(answer):
    return Answer(str(answer)) if isinstance(answer, (float, str)) else Answer(answer.text)


def convert_answers(question_details):
    if hasattr(question_details, "answers"):
        # if hasattr(question_details.answers, '__len__') and (not isinstance(question_details.answers, str)):
        return list(map(get_answer_object, question_details.answers))
    elif hasattr(question_details, "correct_answer") and question_details.correct_answer is not None:
        # TODO float je 0.0 i kad se ne navede
        return list(map(get_answer_object, [question_details.correct_answer]))
    return []


def get_question_object(question):
    temp = Question(question.text)
    temp.answers = convert_answers(question.question_details)
    return temp


def convert_questions(asseessment_details):
    if (hasattr(asseessment_details, "questions")):
        # if hasattr(asseessment_details.questions, '__len__') and (not isinstance(asseessment_details.questions, str)):
        return list(map(get_question_object, asseessment_details.questions))
    elif (hasattr(asseessment_details, "question")):
        return list(map(get_question_object, [asseessment_details.question]))
    return []


def parse_completion_time(completion_time):
    return completion_time


class SurveyScoring(object):
    def __init__(self, start, end, result):
        self.start = start
        self.end = end
        self.result = result

    def __repr__(self):
        return 'start: ' + str(self.start) + " end: " + str(self.end) + "\n"


class AssessmentDetails(object):
    def __init__(self, ):
        self.questions = None
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
    temp.questions = convert_questions(assessment_details)
    # TODO ne raditi sa maybe, puca, dodati hasattr
    # if (assessment_details.type != "poll"):
    #     temp.completion_time = parse_completion_time(
    #         maybe(assessment_details.end).completion_time)
    #     temp.can_skip_to_end = maybe(assessment_details.end).can_skip_to_end

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


class Test(object):
    def __init__(self, text):

        self.text = text


class Assessment(object):
    def __init__(self, title: str, description: str, ask_for_personal_info: bool, assessment_details: AssessmentDetails):
        self.title = title
        self.description = description
        self.ask_for_personal_info = ask_for_personal_info
        self.type = assessment_details.type
        self.assessment_details = convert_assessment_details(
            assessment_details)

    # def __str__(self):
    #     return "Title: " + self.title + ", description: " + self.description + "\nDetails:" + str(self.assessment_details)
