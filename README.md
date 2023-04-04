<h1>QuesTech</h1>
<br/>
<span>DSL for making different types of assessments.</span>
<br/>
<h3>Usage</h3>
[Optional] Create virtual environment,
e.g.
<ol>
    <li>python -m venv venv</li>
    <li>
        <ul>
            <li><b>Windows:</b> .\venv\Scripts\activate</li>
            <li><b>Linux:</b>&emsp;&emsp;source .\venv\bin\activate</li>
        </ul>
    </li>
</ol>
Installation
<ol>
  <li>
     <b>Install textX:</b> pip install textx[cli]
  </li>
  <li>
    <b>Create visualization (GraphViz is needed): </b>
        textx generate grammar.tx --target dot
        dot -Tpng -O grammar.dot
  </li>
</ol>
<br/>
Running
<ol>
    <li>Run application with "python main.py" to use the default assessment file = quiz.qt</li>
    <li>To run other assessment, run with "python main.py assessment_file=[path-to-some-other-assessment-file]"</li>
</ol>
