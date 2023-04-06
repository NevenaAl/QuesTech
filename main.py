from os.path import join, dirname, abspath
from textx import metamodel_from_file
from textx.export import metamodel_export, model_export
import os
import pydot
import click


class Assessment():
    def __init__(self, assessment, assessment_mm, assessment_file):
        self.assessment = assessment
        self.assessment_mm = assessment_mm
        self.assessment_file = assessment_file


@click.command()
@click.option('--assessment_file', default="scored_survey.qt", help="Full or relative path to the assessment file")
def main(assessment_file):
    this_folder = dirname(__file__)
    assessment_mm = metamodel_from_file(join(this_folder, 'grammar.tx'))
    dot_folder = join(this_folder, 'dot_files')

    if not os.path.exists(dot_folder):
        os.mkdir(dot_folder)
    metamodel_export(assessment_mm, join(dot_folder, 'grammar.dot'))
    (graph,) = pydot.graph_from_dot_file(join(dot_folder, 'grammar.dot'))
    graph.write_png(join(dot_folder, 'grammar.png'))

    # try:
    assessment: Assessment = assessment_mm.model_from_file(
        join(abspath(this_folder), assessment_file))
    print(assessment.assessment_details.questions[0].question_details.type)
    print(
        assessment.assessment_details.questions[0].question_details.answers[1].text)
    # except:
    #     try:
    #         assessment: Assessment = assessment_mm.model_from_file(
    #             assessment_file)
    #     except:
    #         print("The assessment file path is not valid")
    #         return


if __name__ == "__main__":
    main()
