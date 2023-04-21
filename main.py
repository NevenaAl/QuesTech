from os.path import join, dirname, abspath
from textx.export import metamodel_export
import os
import pydot
import click
from metamodel import get_assessment_mm
from classes import Assessment


class AssessmentData():
    def __init__(self, assessment:  Assessment, assessment_mm, assessment_file):
        self.assessment = assessment
        self.assessment_mm = assessment_mm
        self.assessment_file = assessment_file


@ click.command()
@ click.option('--assessment_file', default="examples/quiz.qt", help="Full or relative path to the assessment file")
def main(assessment_file):
    this_folder = dirname(__file__)
    assessment_mm = get_assessment_mm(this_folder)

    dot_folder = join(this_folder, 'dot_files')
    if not os.path.exists(dot_folder):
        os.mkdir(dot_folder)
    metamodel_export(assessment_mm, join(dot_folder, 'grammar.dot'))
    (graph,) = pydot.graph_from_dot_file(join(dot_folder, 'grammar.dot'))
    graph.write_png(join(dot_folder, 'grammar.png'))

    try:
        # assessment: Assessment = assessment_mm.model_from_file(
        #     join(abspath(this_folder), assessment_file))
        assessment = assessment_mm.model_from_file(
            join(abspath(this_folder), assessment_file))
        print(Assessment(assessment.title, assessment.description,
              assessment.ask_for_personal_info, assessment.assessment_details))
    except:
        try:
            assessment: Assessment = assessment_mm.model_from_file(
                assessment_file)
        except Exception as e:
            print("Exception: {}".format(type(e).__name__))
            print("Exception message: {}".format(e))
            return


if __name__ == "__main__":
    main()
