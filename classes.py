from pymaybe import maybe
# TODO add validations in interpreter


class Answer(object):
    def __init__(self, text: str):
        self.text = text


class Question(object):
    def __init__(self, text: str, answers: list[Answer]):
        self.text = text
        self.answers = convert_answers(answers)


class Scoring(object):
    def __init__(self, range_start: int, range_end: int, result: float | str):
        self.range_start = range_start
        self.range_end = range_end
        self.result = result


def convert_answers(answers):
    return answers


def convert_questions(questions):
    # ako je samo jedno pitanje napravi niz
    return questions


def parse_completion_time(completion_time):
    return completion_time


class AssessmentDetails(object):
    def __init__(self, questions):
        self.questions = convert_questions(questions)
        self.default_points_per_question = None
        self.default_negative_points_per_question = None
        self.completion_time = None
        self.can_skip_to_end = None
        self.percentage_required = None
        self.num_of_correct_answers_required = None
        self.points_required = None
        self.scoring = []

    def __str__(self):
        return f'Can skip: {self.can_skip_to_end}, default neg points: {self.default_negative_points_per_question}'


def convert_assessment_details(assessment_details):
    temp = AssessmentDetails(assessment_details.questions)
    if (assessment_details.type != "poll"):
        temp.completion_time = parse_completion_time(
            maybe(assessment_details.end).completion_time)
        temp.can_skip_to_end = maybe(assessment_details.end).can_skip_to_end

    if (assessment_details.type == "quiz" and assessment_details.pass_criteria):
        temp.default_points_per_question = assessment_details.default_points_per_question
        temp.default_negative_points_per_question = assessment_details.default_negative_points_per_question
        temp.percentage_required = assessment_details.pass_criteria.percentage_required
        temp.num_of_correct_answers_required = assessment_details.pass_criteria.num_of_correct_answers_required
        temp.points_required = assessment_details.pass_criteria.points_required

    if (assessment_details.type == "scored_survey"):
        temp.scoring = assessment_details.scoring

    return temp


class Assessment(object):
    def __init__(self, title: str, description: str, ask_for_personal_info: bool, assessment_details: AssessmentDetails):
        self.title = title
        self.description = description
        self.ask_for_personal_info = ask_for_personal_info
        self.type = assessment_details.type
        self.assessment_details = convert_assessment_details(
            assessment_details)

    def __str__(self):
        return "Title: " + self.title + ", description: " + self.description + "\nDetails:" + str(self.assessment_details)
