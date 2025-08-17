Task Manager API - README
Overview

This is a Task Manager backend API built with Node.js, Express, and MongoDB. It supports user registration, login, and role-based task management with roles like admin and regular users.

User Authentication
Registration (POST /register)

Required fields: fullname, email, phoneNumber, password

Checks if the email is already registered.

Password is hashed with bcrypt before saving.

Returns success message if created.

Login (POST /login)

Required fields: email, password

Checks if user exists and password matches.

On success:

Generates a JWT token valid for 1 day.

Returns user details and token.

Sends token as an HTTP-only cookie.

On failure: returns an error message.

User Roles & Permissions

Users have a role field: either "admin" or default user.

JWT token contains userId and role for authorization.

Task Management
Models

Each task has: title, description, status, priority, dueDate, assignedTo, createdBy, and optional tags.

Status values: "pending", "in-progress", "completed".

Get Task Counts (GET /tasks/counts)

Admin: counts for all tasks across statuses.

User: counts only for tasks created by them.

Create Task (POST /tasks)

Creates a new task.

Requires auth user ID as createdBy.

Validates assignedTo user ID format if provided.

Get All Tasks (GET /tasks)

Admin: retrieves all tasks matching optional keyword (searches title & description).

User: retrieves tasks created by themselves matching keyword.

Get Task By ID (GET /tasks/:id)

Returns task details.

Admin: access any task.

User: access only their own tasks.

Returns 403 Access denied if unauthorized.

Update Task (PUT /tasks/:id)

Admin: can update all fields (title, description, status, priority, dueDate, assignedTo, tags).

User: can only update status field to one of the allowed values.

Unauthorized users get a 403 Access denied.

Invalid status updates return a 400 Bad Request.

Delete Task (DELETE /tasks/:id)

Only admin users can delete tasks.

Others receive 403 Only admin can delete tasks.

How to Use

Register a new user or use an existing user.

Login with valid credentials to get an auth token.

Use the token in the Authorization header (Bearer <token>) for subsequent API calls.

Create, read, update, and delete tasks based on your user role.

Non-admin users have limited access to tasks they created and can only update task status.

Admins have full control over all tasks.

Example Workflow

User signs up and logs in.

User creates tasks assigned to themselves or others.

User can view and update their tasks' status.

Admin can manage (view/update/delete) all tasks.

Admin can assign tasks to any user and update all details.

Security Notes

Passwords are hashed with bcrypt.

JWT tokens are used for authentication and stored as HTTP-only cookies.

Role-based access control enforced in all task-related endpoints.

Feel free to ask if you want me to generate example API routes or usage with curl/Postman!

Would you like me to help you with a Postman collection or client example next?