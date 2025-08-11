# Bits and Buy

Bits and Buy is a full-stack e-commerce application designed to provide a seamless and engaging online shopping experience. This project showcases a modern web application built with a React frontend and a Node.js backend, featuring a wide range of functionalities from user authentication to order processing.

## Screenshots

Here are some screenshots of the application in action:

| ![Home Page](screenshorts/Capture1.JPG) | ![Product Page](screenshorts/Capture2.JPG) |
| :-------------------------------------: | :---------------------------------------: |
|                **Home Page**                |              **Product Page**               |

| ![Cart](screenshorts/cart.JPG) | ![Checkout](screenshorts/checkout.JPG) |
| :----------------------------: | :------------------------------------: |
|              **Cart**              |                **Checkout**                |

## Tech Stack

### Frontend

*   **Framework:** [React](https://reactjs.org/)
*   **Styling:** [Bootstrap](https://getbootstrap.com/), [Tailwind CSS](https://tailwindcss.com/)
*   **Routing:** [React Router](https://reactrouter.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **HTTP Client:** [Axios](https://axios-http.com/)
*   **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/)

### Backend

*   **Framework:** [Express.js](https://expressjs.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)
*   **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/), [bcryptjs](https://www.npmjs.com/package/bcryptjs)
*   **Environment Variables:** [dotenv](https://www.npmjs.com/package/dotenv)

## Features

*   User registration and login
*   Product browsing and searching
*   Shopping cart functionality
*   Secure checkout process
*   User profile management
*   Responsive design for a seamless experience across devices

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm
*   PostgreSQL

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/Bits-and-Buy.git
    ```
2.  **Install backend dependencies**
    ```sh
    cd backend
    npm install
    ```
3.  **Install frontend dependencies**
    ```sh
    cd ../frontend
    npm install
    ```
4.  **Set up environment variables**

    Create a `.env` file in the `backend` directory and add the following:

    ```
    DB_USER=your_db_user
    DB_HOST=your_db_host
    DB_DATABASE=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=your_db_port
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1.  **Start the backend server**
    ```sh
    cd backend
    npm start
    ```
2.  **Start the frontend development server**
    ```sh
    cd frontend
    npm start
    ```

## How to Access

Once the application is running, you can access it at `http://localhost:3000` in your web browser.
