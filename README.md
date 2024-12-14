Full Stack Coding Platform
Welcome to the Full Stack Coding Platform repository! This project aims to provide an interactive platform for coding challenges, tutorials, and solutions.

Features
Interactive Coding Challenges: A wide range of programming problems designed to help users improve their skills.
Multiple Programming Language Support: Solutions and tests supported for various programming languages such as Python, C++, Rust, and more.
Problem Solutions and Judging: Automated code evaluation using the Judge0 API to validate user-submitted solutions against predefined test cases.
Comprehensive Dashboard: A user-friendly interface built with Angular to browse and solve coding problems, track progress, and view results.
Database Integration: Persistent storage with PostgreSQL to manage problem statements, user submissions, and solutions.
Getting Started
Prerequisites
Database: PostgreSQL should be installed and configured.
Backend: Django for the web backend.
Frontend: Angular for the web frontend.
Environment: Python 3.x for running the Django application.
Judge0 API: Obtain an API key from Judge0 (found in settings.py for evaluating code).
Setup
Clone the repository:

bash
Copier le code
git clone https://github.com/omarelleuch/full-stack-codding-platform.git
cd full-stack-codding-platform
Install the required packages:

bash
Copier le code
pip install -r requirements.txt
Navigate to the frontend directory and install Angular dependencies:

bash
Copier le code
cd frontend
npm install
Configure your PostgreSQL database in settings.py:

Database name: postgres
Database user: postgres
Database password: Omaristired.2
Database host: localhost
Database port: 5432
Apply migrations:

bash
Copier le code
python manage.py migrate
Start the Django development server:

bash
Copier le code
python manage.py runserver
Run the Angular development server:

bash
Copier le code
ng serve
Usage
Register or log in to access coding challenges.
Browse through the problem statements and submit your solutions.
View real-time results and feedback on your code through the Angular frontend.
Screenshots
Here are some key screenshots of the platform:


A clear overview of the coding challenge dashboard.


Showing the problem statement and submission interface.


Display of automated evaluation results.

Contributing
Contributions to this project are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

License
This project is licensed under the MIT License.

Acknowledgments
Judge0 API: For providing backend support for code evaluation.
Community Contributions: Thank you to everyone who has contributed and supported this project.
