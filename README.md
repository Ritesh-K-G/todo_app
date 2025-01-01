# Todo App
Overview
---
Shinobi Planner is a task management application inspired by the Naruto theme, where users can manage their tasks in a visually engaging interface. 
It uses Dropwizard for the backend, MariaDB as the database, and Vite for the frontend. 
The app allows users to manage their tasks, view progress, and perform actions like marking tasks as in progress, completed, deleting, or moving them to a bin for later restoration.

Features
---
- Task Management: Users can view, create, update, and delete tasks.
- Progress Tracking: Tasks show a progress timeline, making it easy to track the status of each task.
- Task Actions:
    1. Mark tasks as "In Progress" or "Done"
    2. Delete tasks permanently
    3. Move tasks to the bin (for later restoration)
    4. Restore tasks from the bin
- Naruto-Themed UI: The frontend is styled in Naruto's universe, featuring themed elements that match the Shinobi theme.

Tech Stack
---
    Backend:
        Dropwizard: For creating the backend API
        MariaDB: For data storage
    Frontend:
        Vite: For fast and optimized frontend build
        React: For building the user interface
    Docker: For containerizing the entire application (frontend, backend, and database)

Backend API Endpoints
---
The backend exposes the following REST API endpoints for managing tasks:

    GET /tasks: Fetch all tasks.
    POST /tasks: Create a new task.
    GET /tasks/{id}: Get a task by its ID.
    DELETE /tasks/{id}: Delete a task by its ID.
    PATCH /tasks/{id}: Update a task's details.
    PATCH /tasks/{id}/moveToBin: Move a task to the bin.
    PATCH /tasks/{id}/restoreFromBin: Restore a task from the bin.
    PATCH /tasks/{id}/markWIP: Mark a task as "In Progress".
    PATCH /tasks/{id}/markDone: Mark a task as "Done".

Task Data Model
---
Each task has the following fields:

    id: Unique identifier for the task.
    title: The name of the task.
    description: A brief description of the task.
    startTime: When the task was started.
    endTime: When the task is due to be completed.
    status: The current status of the task (e.g., CREATED, WIP, DONE, DELETED).

Frontend
---
The frontend is built using React and is styled to reflect the theme of the Naruto universe. The user interface is simple and intuitive, allowing users to:

    View tasks in a list.
    Create new tasks.
    View the progress of each task via a timeline.
    Perform actions on tasks, such as updating their status, deleting them, or moving them to the bin.

Installation
---

Dockerized Setup

To simplify the setup, the entire application (frontend, backend, and database) is containerized using Docker. You can quickly run the application using Docker Compose.

Clone the repository:
```
git clone https://github.com/Ritesh-K-G/todo_app.git
```
Build and run the Docker containers:

Make sure Docker and Docker Compose are installed on your machine.
Navigate to the root directory of the project and run the following command to build and start all the services (frontend, backend, and MariaDB):
```
docker-compose up --build
```
Access the application:

After running the containers, the application will be available on:
```
Frontend: http://localhost:3000
Backend API: http://localhost:8080
```
Stopping the containers: To stop the application and remove the containers, run:
```
docker-compose down
```

Screenshots:
---

![WhatsApp Image 2025-01-01 at 17 28 52](https://github.com/user-attachments/assets/80863d29-a28c-423a-bbef-25f54e45a26e)

![WhatsApp Image 2025-01-01 at 17 28 52(1)](https://github.com/user-attachments/assets/97978251-2c77-4018-9650-877f3e3a35db)
