# Ctrl-Alt-Elite

Project description: Our app is called FreebieFinders. It is an app where the users can sell their personal items for free to anyone anywhere. There is a landing page, all listings page, account page, specific items page, and upload item page.

https://www.figma.com/design/UO3XsDZJ9Al31bELp3YrSi/Page-Designs?node-id=0-1&p=f&t=MlQxZAdc7xlC5NVR-0
Date last updated: 2/22

Development environment setup:
1. Make sure npm is installed. The backend and frontend are run using "npm run dev" from their respective directories.
2. We are using GitHub to host our repo, which you should know if you have access to this file. Make sure you have git and know how to use it.
3. Install express in the backend only by running "npm install -w express-backend express" in the backend directory.
4. Install nodemon to restart the server on code change by running "npm install --save-dev nodemon" in the root directory.
   5. Add the script { "dev": "npx nodemon backend.js" } to the package.json in the backend.
6. Install cors in the backend by running "npm install cors" in the backend directory.
7. Install mongoose in the backend by running "npm install mongoose" in the backend directory.
   8. Make sure you get the correct .env variables from the team document.
9. Install prettier by running "npm install -D prettier" in the root directory.
   10. Make sure to get the correct options for your .prettierrc file from the team document.
   11. Add the  script { "format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc" } to package.json in the root directory.
   12. Optionally, set your IDE to run prettier automatically on save.
13. Install eslint in the frontend by running "npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh" in your frontend directory.
14. Install eslint in the backend by running "npm install -D eslint @eslint/compat @eslint/eslintrc @eslint/js" in your backend directory.
15. Set up formatting and linting according to the CONTRIBUTING.md.
16. Setup deployment:
    17. run: npm ci
    18. run: npm run -w express-backend lint
    19. run: npm run -w react-frontend lint
    20. run: npm run -w react-frontend build

doc folder link: https://vscode.dev/github/kyramirez/Ctrl-Alt-Elite/blob/main/docs 
