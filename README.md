# Full Stack Coding Platform

Welcome to the Full Stack Coding Platform repository! This project aims to provide an interactive platform for coding challenges, tutorials, and solutions.

## Features

- **Interactive Coding Challenges**: A wide range of programming problems designed to help users improve their skills.
- **Multiple Programming Language Support**: Solutions and tests supported for various programming languages such as Python, C++, Rust, and more.
- **Problem Solutions and Judging**: Automated code evaluation using the Judge0 API to validate user-submitted solutions against predefined test cases.
- **Comprehensive Dashboard**: A user-friendly interface built with Angular to browse and solve coding problems, track progress, and view results.
- **Database Integration**: Persistent storage with PostgreSQL to manage problem statements, user submissions, and solutions.

## Getting Started

### Prerequisites

1. **Database**: PostgreSQL should be installed and configured.
2. **Backend**: Django for the web backend.
3. **Frontend**: Angular for the web frontend.
4. **Environment**: Python 3.x for running the Django application.
5. **Judge0 API**: Obtain an API key from Judge0 (found in `settings.py` for evaluating code).

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/omarelleuch/full-stack-codding-platform.git
   cd full-stack-codding-platform

2. Install the required packages:
   ```bash
   pip install -r requirements.txt

3.Navigate to the frontend directory and install Angular dependencies:
    ```bash
   cd frontend
   npm install

## Configure your PostgreSQL database in settings.py:

- **Database name**: ``  
- **Database user**: ``  
- **Database password**: ``  
- **Database host**: ``  
- **Database port**: ``  

## Apply migrations:

   ```bash
   python manage.py migrate

## Start the Django development server:

```bash
python manage.py runserver


