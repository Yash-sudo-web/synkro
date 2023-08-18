# MERN + TailwindCSS Chat App with Passport.js and Socket.io

Welcome to the MERN + TailwindCSS Chat App with Passport.js and Socket.io! This is a real-time chat application that combines the power of the MERN (MongoDB, Express.js, React, Node.js) stack, along with TailwindCSS for styling, Passport.js for authentication, and Socket.io for real-time chatting.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This chat application allows users to create accounts, log in, and engage in real-time conversations with other users. The application uses the MERN stack, which is a popular choice for building full-stack web applications, along with TailwindCSS for easy and responsive styling. Passport.js provides user authentication, and Socket.io enables real-time communication between users.

## Features

- User registration and authentication using Passport.js
- Real-time chatting functionality using Socket.io
- Responsive and visually appealing design with TailwindCSS
- Sending and receiving text messages instantly
- User-friendly interface for a seamless chatting experience

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/): Make sure you have Node.js and npm (Node Package Manager) installed on your system.

## Installation

1. Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/Yash-sudo-web/synkro.git

2. Navigate to the project directory:

    ```bash
    cd synkro

3. Navigate to the server directory:

    ```bash
    cd server

4. Install server-side dependencies:

    ```bash
    npm install

5. Navigate to the client directory:

    ```bash
    cd ..
    cd client

6. Install client-side dependencies:

    ```bash
    npm install

## Configuration

1. Create a new .env file inside the server folder and add your environmental variables in the following order:

    ```bash
    GOOGLE_CLIENT_ID=""
    GOOGLE_CLIENT_SECRET=""
    FACEBOOK_APP_ID=""
    FACEBOOK_APP_SECRET=""
    DB=""
    COOKIE_KEY=""

## Usage

1. Start the client:

   ```bash
   npm start

2. Open a new terminal window/tab and navigate to the server directory and start the server:

    ```bash
    cd server
    npm start

3. Open your web browser and navigate to http://localhost:3000 to access the chat app.