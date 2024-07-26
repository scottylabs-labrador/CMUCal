Before starting, ensure that pip and python are installed.

Afterwards, run the virtual environment
```
source myvenv/bin/activate
```
Or on Windows
```
myvenv\Scripts\activate
```

Then, install the dependencies from requirement.txt
```
pip install requirements.txt
```

Afterwards, run Flask
```
export FLASK_APP=script.py
flask run
```
