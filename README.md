# Recipot

## Start backend server

`cd` to this project's root, which is where this file is, and then run:

**Linux, UNIX:**

```
python3 -m venv venv
. $(pwd)/venv/bin/activate
pip install -r requirements.txt
cd backend
python3 manage.py runserver
```

**Windows:**

```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd backend
python manage.py runserver
```

## Start frontend server

`cd` to this project's root, which is where this file is, and then run:

```
cd frontend
npm start
```
