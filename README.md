<h1>QuesTech</h1>
<br/>
<span>DSL for making different types of assessments.</span>
<br/>
<h3>Usage</h3>
<ol>
    <li>[If not existing] Create virtual environment: <b>python -m venv venv </b></li>
    <li>Activate venv:
        <ul>
            <li><b>Windows:</b> .\venv\Scripts\activate</li>
            <li><b>Linux:</b>&emsp;&emsp;source .\venv\bin\activate</li>
        </ul>
    </li>
    <li>
        <b>Install textX:</b> pip install textx[cli]
    </li>
    <li>Run application with "python main.py". It will create metamodel, generate dot files and run the server on http://127.0.0.1:8000.</li>
    <li>If you only want to create metamodel and dot files, run with "python main.py --run_server=false"</li>
    <li>Enter the folder with "cd ques-tech-fe" and run "npm run start" to start the React application.</li>
</ol>
<br/>
