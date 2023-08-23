# Budget App

Welcome to the Budget App project! This is a simple budget management application built using the latest version of React, React Router DOM (everything with typescript), Tailwindcss, and the Vite development server. [Live Demo](https://lucaslmt.github.io/BudgetApp/)

## Getting Started

Follow these steps to get the application up and running on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/lucasLMT/BudgetApp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd BudgetApp
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

### Running the Application

#### Using Vite Development Server

1. To start the development server with Vite, run:

   ```bash
   npm run dev
   ```

   This will launch the application in development mode and open it in your default web browser. Any changes you make to the code will be automatically reflected in the browser.

2. Open your web browser and navigate to `http://localhost:5173` to see the application in action.

## Project Structure

Here's a brief overview of the project structure:

- `src`: Contains the main source code files of the application.
- `public`: Houses the public assets like HTML files, images, and icons.

Feel free to explore and modify the code to fit your needs.

## Features

- Track your expenses and manage your budget effortlessly.
- Utilize React components and hooks to build a responsive and user-friendly UI.
- Navigate between different views using React Router DOM.
- Leverage the power of Vite development server for fast and efficient development.

## Configuring Vite and React Router Dom for Different Environments

In this guide, we will explore how to configure Vite and React Router Dom to handle different environments, such as development and production. Specifically, we will cover:

1. Configuring `vite.config.ts` to Determine Environment and Set Base Path.
2. Configuring React Router Dom with different base names.

### 1. Configuring `vite.config.js` for Different Environments

In many projects, you might want to have different configurations based on whether the app is running in development or production mode. Vite makes it easy to achieve this.

To configure different environments and set a different base path, follow these steps:

1. Open your project's `vite.config.ts` file.

2. Define your base path values for both development and production environments. For example:

```javascript
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    base: "/",
    plugins: [react()],
  };

  if (command !== "serve") {
    config.base = "/BudgetApp/";
  }

  return config;
});
```

In the above example, the `base` path is set to `/BudgetApp/` in production mode and `/` in development mode.

### 2. Configuring React Router Dom with different base names

React Router Dom allows you to configure different base names for your routes based on the environment. This can be helpful when deploying your app to different contexts.

To configure React Router Dom for different environments, follow these steps:

1. Open your file with the routes definition (e.g., `App.tsx`).

2. Add a configuration object with `basename` property and set the value based on the environment:

   ```javascript
   const routes = [...];
   const router = createBrowserRouter(routes, {basename: import.meta.env.DEV ? "/" : "/BudgetApp" });
   ```

   In the above example, the `basename` is set to `/BudgetApp` in production mode and `/` in development mode.
