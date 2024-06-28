To use, first create a virtual environment: `python3 -m venv <myenvname>`

Then activate it:

On windows: `.\env\Scripts\activate.bat`
On mac: `source venv/bin/activate`

Then install needed packages: `pip3 install -r requirements.txt`

Then create a file `config.ini` that contains the link to the MONGO database in the format seen in `config.ini.example`.

Then launch the backend API: `python3 app.py`

To test, you can utilize this command: `python3 test_api.py`

--------

Updates for the future: expand filters to include dates/categories, for better interaction with the frontend.