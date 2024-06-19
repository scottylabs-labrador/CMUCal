To use, first create a virtual environment: `python3 -m venv <myenvname>`

Then activate it:

On windows: `.\env\Scripts\activate.bat`
On mac: `source venv/bin/activate`

Then install needed packages: `pip3 install -r requirements.txt`

Then create a file `config.ini` that contains the link to the MONGO database in the format seen in `config.ini.example`.

Then launch the scraper: `python3 scraper.py`

--------

Updates for the future:
- potentially put each scraper in its own file for better modularity
- also improve the Handshake/TC mechanisms to automatically update login cookie information cause it is static at the moment
- other stuff tba