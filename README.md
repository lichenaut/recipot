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

Make sure the `npm start` script in `package.json` points to the right API URL.

## Original Project Summary

Note: may not reflect the current state of the projcet.

Project Name: ReciPot

High Level Concept: Ability to discover and filter recipes based on tags and view recipe details.

API: Create a Recipe API for a recipe-sharing website, where users can upload recipes with details such as description, cooking time, preheat temperature, and tags. The API will allow users to retrieve a list of all recipes, filter recipes by tag, and view individual recipe details.

Front End: The front end will be a user-friendly interface where users can:

    Upload new recipes with details such as description, cooking time, preheat temperature, and tags
    View a list of all uploaded recipes on the home page
    Filter recipes by tag using a search bar or dropdown menu
    Click on a recipe to view its details

Database: The database will contain:

    A Recipes table
    A Tags table
    A RecipeTags table (to establish many-to-many relationships between recipes and tags)
