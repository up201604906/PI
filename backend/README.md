# Todo Web Application Project

Welcome to my personal Todo Web Application project. This endeavor began with the vision of developing a state-of-the-art web application that not only scales efficiently (thanks to containerized deployments) but also maintains the highest standards in terms of security and code quality.

## **Highlights:**
- **Scalability**: Through the use of containers, the application is designed to scale efficiently, ensuring responsiveness even under heavy load.
  
- **Security**: The project emphasizes a robust security protocol. It uses a JWT-based authentication mechanism, and by architecting the application with a clear separation of responsibilities, it minimizes potential security threats. Token storage in `localStorage` and the possibility to switch to session/cookie-based authentication are just the tip of the iceberg.

- **Modern Coding Practices**: Built on the backbone of industry-standard coding practices, the application ensures maintainability and robustness.

- **WebSocket Integration (Upcoming)**: In the pipeline is the integration of WebSockets. This will enable real-time shared todos where users can not only collaborate but also chat, enhancing the user interaction manifold.

- **Advanced Features in the Roadmap**:
    - **File Uploading**: An integrated system for users to attach files to their todos.
    - **Request Throttling**: To ensure fair usage and prevent any misuse of services.
    - **Gamification**: Thinking of making task management fun? Stay tuned for an integrated points system, rewards, and streaks to motivate users.
    - **Calendar Integration**: Sync your todos with your calendar for seamless planning.
    - **Progressive Web Application (PWA)**: Ensuring offline accessibility and a native-app-like experience.
    - **Data Portability**: Users will soon have the option to export their data, ensuring they always have control over their information.

As of now, the backend is being developed to accommodate all these functionalities. Once this is in place, the frontend will come to life using Angular, providing a dynamic and user-friendly interface.



## Application Features:

### Core Features:

### Home Page
**URL**: `/#/`

## Todos:
- [x] View a list of all todos.
- [ ] Filter todos based on criteria (e.g., completed, in-progress).
- [ ] Search functionality to find specific todos.
- [x] Add new todos directly from the home page.
- [ ] Mark todos as completed.
- [ ] Edit or delete todos.

## Sign In/Sign Up Pages:
### URLs: `/#/login`, `/#/signup`
- [] **User Authentication**:
    - [x] Secure JWT-based authentication mechanism.
    - [x] Token stored in `localStorage`.
    - [ ] Option to "Remember Me".
    - [ ] Forget password functionality with email reset option.
    - [x] Input validation and feedback.
    - [ ] Authentication can be switched to session/cookie-based.

## Profile Page:
### URL: `/#/profile/:username`
- [ ] **User Information**:
    - [ ] Display basic user details.
    - [ ] Option to edit profile.
    - [x] View user-specific todos.
    - [ ] Option to change password.
    - [ ] Avatar or profile picture display.



## API Endpoints:

- [User Management](#user-management)
    - [Register](#post-usersregister)
    - [Login](#post-userslogin)
    - [Retrieve Profile](#get-usersprofileusername)
- [Todos Management](#todos-management)
    - [Fetch Todos](#get-todos)
    - [Add Todo](#post-todos)
    - [Update Todo](#put-todosid)
    - [Delete Todo](#delete-todosid)
- [Profile Management](#profile-management)
    - [Edit Profile](#put-usersprofileusernameedit)
    - [Change Password](#put-usersprofileusernamechangepassword)


### **User Management**

### **POST** `/users/signup`
**Purpose**: New user registration.

**Body**:
```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

Response:

    200 OK with user object if successful.
    Error messages for validation failures.


### **POST** `/users/login`

**Purpose**: Existing user login.

**Body**:
```json
{
    "email": "string",
    "password": "string"
}
```

Response:

    200 OK with JWT token if successful.
    Error message for invalid credentials.

### **GET** `/users/profile/:username`

**Purpose**: Retrieve basic user info.

**Parameters**:

    - `username`: The username of the user.

**Response**:

    200 OK with user object


### Todos Management

### **GET** `/todos`

**Purpose**: Fetch all todos for the logged-in user.

**Response**:

    200 OK with an array of todo objects.

### **POST** /todos

**Purpose**: Add a new todo.

**Body**:
```json
{
    "title": "string",
    "description": "string"
}
```
**Response**:

    201 Created with the created todo object.

### **PUT** `/todos/:id`

**Purpose**: Update an existing todo.

**Parameters**:

    - `id`: The ID of the todo to be updated.

**Body**:
```json
{
    "title": "string",
    "description": "string",
    "is_completed": "boolean"
}
```

**Response**:

    200 OK with the updated todo object.

D### **DELETE** `/todos/:id`

**Purpose**: Delete an existing todo.

**Parameters**:

    - `id`: The ID of the todo to be deleted.

**Response**:

    200 OK with a confirmation message.

### Profile Management


### **PUT** `/users/profile/:username/edit`

**Purpose**: Edit user profile.

**Parameters**:

    - `username`: The username of the user.

**Body**:
```json
{
    "username": "string",
    "email": "string",
    "avatar_url": "string"
}
```

**Response**:

    200 OK with the updated user object.


### **PUT** `/users/profile/:username/changepassword`


**Purpose**: Change user password.

**Parameters**:

    username: The username of the user.

**Body**:
```json
{
    "old_password": "string",
    "new_password": "string"
}
```

Response:

    200 OK with a confirmation message.

