                             AI Powered Resume Builder & Analyzer
                                   First Step to Your Career

### Project Description
In today’s competitive job market, crafting a standout resume and ensuring it meets industry standards can be daunting. Our AI-powered Resume Builder & Analyzer simplifies this process, empowering individuals to create professional, impactful resumes while gaining insights to optimize their chances of success.

Purpose :
This project aims to bridge the gap between job seekers and their dream roles by leveraging cutting-edge AI technology. By automating the resume evaluation and building process, it helps users save time, refine their content, and tailor their applications to specific job requirements.

Problems It Solves :
Unoptimized Resumes: Provides actionable feedback by analyzing resumes for structure, grammar, keywords, and alignment with job descriptions.
Time-Consuming Processes: Speeds up resume creation with easy-to-use templates and suggestions, eliminating manual efforts.
Personalization Challenges: Tailors resumes to specific industries or roles using AI-driven insights.


## Table of Contents
1. [Project Title](#project-title)
2. [Project Description](#project-description)
3. [Installation Instructions](#installation-instructions)
4. [Usage](#usage)
5. [Features](#features)
6. [Project Structure](#project-structure)
7. [Acknowledgements](#acknowledgements)
8. [Contact Information](#contact-information)

### Installation Instructions

Step 1: Set Up the Environment
Create a new Vite project:

npm create vite@latest my-app
cd my-app
npm install

Step 2: Install Dependencies

2.1 Clerk for Authentication
Install the Clerk SDK for your framework:

React:
npm install @clerk/clerk-react
Vanilla JS:
npm install @clerk/clerk-js

2.2 TailwindCSS for Styling
Install TailwindCSS and configure your project:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Add the following imports to your src/index.css:

@tailwind base;
@tailwind components;
@tailwind utilities;

2.3 Shadcn/UI Components
Initialize Shadcn/UI components:

npx shadcn@latest init

2.4 Strapi for Backend
Run the installation script:

npx create-strapi@latest my-strapi-project
When prompted, select Postgres as the database and enable SSL for compatibility.

2.5 UUID for Unique IDs
Install UUID for generating random IDs:

npm install uuid

2.6 Axios for API Calls
Install Axios for handling API requests:

npm install axios

### Usage
Start the development server:
npm run dev
Sign up or sign in using Clerk authentication.
Access the resume builder to select templates and customize your resume.
Upload resumes for analysis to get feedback on structure, grammar, and keywords.


### Features
Intelligent Resume Analysis:
Detect weak areas, missing keywords, and formatting issues in uploaded resumes.
Automated Resume Builder:
Create resumes using professionally designed templates with customization options.
User-Friendly Interface:
Simple navigation for users of all skill levels.
Dynamic Keyword Matching:
Align resumes with job descriptions for better application success.
Project Structure
Frontend: Vite with React, Clerk for authentication, and TailwindCSS for styling.
Backend: Strapi with PostgreSQL for database management.
AI Analysis: Python scripts for resume parsing and keyword matching.


### Acknowledgements
Special thanks to:

Clerk for providing seamless authentication services.
Strapi for a flexible backend solution.
NeonDB for cloud-based PostgreSQL support.
Open-source libraries and communities for their invaluable contributions.

### Contact Information
For inquiries or collaboration, feel free to reach out:

Email: your_email@example.com
LinkedIn: Your LinkedIn Profile


### How to Run the Application

1. Run the resume analyzer first :

  >>> .\venv\Scripts\activate
  >>> streamlit run  App.py

2. Run the resume builder second :
  >>> for react application 
      >> npm run dev
  >>> for strapi 
      >> npm run develop

      Note : Make sure you have neon db running in background and is in active state    