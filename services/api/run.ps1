param()
python -m venv .venv
. .\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
uvicorn optisentry.apps.api.main:app --host 0.0.0.0 --port 8000 --reload
