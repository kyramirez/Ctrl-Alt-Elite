Directory layout:

- a main folder called packages that has 2 subfolders

  - express-backend
  - react-frontend

- in express-backend there is a package.json file, backend.js, auth.js, eslint.config.js, .gitignore, .env.
  - there are also 2 subfolders : models and services
    - models contains user.js
    - services contains listing-service.js and user-service.js
- in react-frontend we have package.json, README.md, index.html, eslint.config.js, .gitingore
  - there are also a couple subfolders : src, public, node_modules, dist, components
    - src contains all of our components
      - App.css and App.jsx
      - Login.jsx
      - index.css
      - main.jsx
      - in our components subfolder we have:
        - CreateListingPage.css
        - CreateListingPage.jsx
        - LandingPage.jsx
        - SingeListingPage.jsx
        - we also have 2 subfolders in the components folder: Account and Listings
          - in account :
            - accountPage.css
            - accountPage.jsx
          - in Listings
            - ListingsPage.css
            - ListingsPage.jsx

Frontend application:

- React application where routing is handled by React Router

Backend application:
- Powered by Node.js and Express, handles API requests for operations, such as user authentication, data retrieval, and the manipulation of listings. Interfaces with MongoDB database for data storage.

Centralized Configuration:

- ESLint
