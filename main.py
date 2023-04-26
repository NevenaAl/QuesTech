from os.path import join, dirname, abspath
from textx.export import metamodel_export
import os
import pydot
import click
import uvicorn

from metamodel import get_assessment_mm
from classes import Assessment
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
]

middleware = [
    Middleware(CORSMiddleware, allow_origins=origins,
               allow_methods=["*"], allow_headers=["*"],)
]

app = FastAPI(middleware=middleware)
this_folder = dirname(__file__)
assessment_mm = get_assessment_mm(this_folder)


def generate_model(assessment_file: str):
    try:
        # assessment: Assessment = assessment_mm.model_from_file(
        #     join(abspath(this_folder), assessment_file))
        assessment = assessment_mm.model_from_file(
            join(abspath(this_folder), "examples", assessment_file))
    except FileNotFoundError:
        try:
            assessment = assessment_mm.model_from_file(
                assessment_file)
        except Exception as e:
            print("Exception: {}".format(type(e).__name__))
            print("Exception message: {}".format(e))
            return
    except Exception as e:
        print("Exception: {}".format(type(e).__name__))
        print("Exception message: {}".format(e))
        return
    return assessment


@app.get("/assessment", response_model=None)
def hello(assessment_file: str):
    assessment = generate_model(assessment_file)
    if assessment is None:
        return
    response = Assessment(assessment.title, assessment.description,
                          assessment.ask_for_personal_info, assessment.assessment_details)

    try:
        json_compatible_item_data = jsonable_encoder(response)
    except Exception as e:
        print("Exception: {}".format(type(e).__name__))
        print("Exception message: {}".format(e))
        return

    return JSONResponse(content=json_compatible_item_data)


@ click.command()
@ click.option('--run_server', default="true", help="Option to not run server")
@ click.option('--assessment_file', help="Full or relative path to the assessment file")
# TODO testirati opciju da dodas assessment file
def main(run_server, assessment_file):
    dot_folder = join(this_folder, 'dot_files')
    if not os.path.exists(dot_folder):
        os.mkdir(dot_folder)
    metamodel_export(assessment_mm, join(dot_folder, 'grammar.dot'))
    (graph,) = pydot.graph_from_dot_file(join(dot_folder, 'grammar.dot'))
    graph.write_png(join(dot_folder, 'grammar.png'))

    if assessment_file is not None:
        generate_model(assessment_file)
    elif run_server != "false":
        uvicorn.run("main:app", log_level="info")


if __name__ == "__main__":
    main()
