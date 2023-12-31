# Full-Stack Challenge (CPU Usage Hours Dashboard)

This challenge is the build a simple dashboard application.

This application must:

1. Load the data (`cpu_hours.csv`) on the client from a server (REST API).

2. Visualize the data on the client as a chart.

You must use React + TypeScript for the client.

You must use Python for your API; however, you may choose the API framework (e.g. Django/Flask/FastAPI)

We have provided some basic scaffolding to get you started (Vite/React/TypeScript client, Django/Python server).

If you have extra time, consider extending the functionality of your solution. Add anything else you think would be cool :)

Have fun!

#### Some example feature extensions:

- Chart Hover Tooltips

- Chart Filters

- Chart Variants (e.g. line, bar, etc.)

- Chart View (e.g. year, month, week, etc.)

- Chart Interactions (e.g. zoom to change view)

- MySQL Database

- Authentication

## Starter Code Walkthrough

The client lives in the client folder, which uses Vite/React/TypeScript to create a super basic app with a simple fetch.

You can run the client by running `yarn install && yarn dev` or `npm install && npm run dev`

The server lives in the django_server folder, which usees Django/Django Rest Framework/Python to create a super simple REST API with a single endpoint.

We recommend creating a virtual environment (venv, conda, etc.). You can run the server by running the following from the base folder:

```
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Please Provide A Write Up For Your Work

How many hours in total did you spend working on the challenge? What was your time breakdown?
I spent 11 hours on this challenge.
For me, it took a lot of time to implement authentication on both the frontend and backend.

Anything we should know about your implementation? Libraries we need to install for it to work? Commands we need to run?
I implemented all the requirements.
Just use the command that you mentioned to me.

What features did you add? How do we use these features?'
I implement all the required features and csv read feature.
To do this, you need to login and click the Get Data button.

Can you walk us through your thought process for implementing this challenge? How did you approach solving it? Where did you start?
First, I implemented apis for read csv from file and getData by query from DB.
Secod, I implemented Chart view on Frontend.
Third, that I implmented Authentication both in frontend and backend.

What was the most difficult part of the challenge?
Nothing special.

What do you like about your implementation?
First, I want to implment notification.
Second, I want to implement csv file upload and big file upload feature.
Third, I want to add test case for it and make the app dockerizable.

If you had more time, what would you do next? What would you change? What would you improve?
I'm going to implement csv file upload feature and notification.
First I have to add test cases.
Second I have to make this app as dockerizable.

What should be the most challeng thing to solve this test?
