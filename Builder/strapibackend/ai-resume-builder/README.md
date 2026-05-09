Tech Stack :


1) shadcn/ui : Installation Instructions

Install and configure Vite.

# Create project
Start by creating a new React project using vite:

npm create vite@latest

# Add Tailwind and its configuration
Install tailwindcss and its peer dependencies, then generate your tailwind.config.js and postcss.config.js files:

npm install -D tailwindcss postcss autoprefixer
 
npx tailwindcss init -p

**Add this import header in your main css file, src/index.css in our case:

@tailwind base;
@tailwind components;
@tailwind utilities;
 
/* ... */

# Configure the tailwind template paths in tailwind.config.js:

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

# Edit jsconfig.json file
The current version of Vite splits TypeScript configuration into three files, two of which need to be edited. Add the baseUrl and paths properties to the compilerOptions section of the tsconfig.json and tsconfig.app.json files:

{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# Edit jsconfig.app.json file
Add the following code to the tsconfig.app.json file to resolve paths, for your IDE:

{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}

# Update vite.config.ts
Add the following code to the vite.config.ts so your app can resolve paths without error

# (so you can import "path" without error)
npm i -D @types/node
Copy
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

# Run the CLI
Run the shadcn-ui init command to setup your project:

npx shadcn@latest init


2) strapi

# Step 1: Run the installation script and create a Strapi Cloud account
Run the following command in a terminal:

npx create-strapi@latest my-strapi-project

# Step 2: it will ask you to create account skip it for free use

# Step 3: Next it will ask you questions like following 

? Please log in or sign up.
? Please log in or sign up. Skip
? Do you want to use the default database (sqlite) ? (Y/n) n
? Do you want to use the default database (sqlite) ? No
? Choose your default database client
? Choose your default database client postgres
? Database name: neondb
? Database name: neondb
? Host: ep-crimson-sky-a5a7fmsn.us-east-2.aws.neon.tech
? Host: ep-crimson-sky-a5a7fmsn.us-east-2.aws.neon.tech
? Port: (5432)
? Port: 5432
? Username: neondb_owner
? Username: neondb_owner
? Password: ************
? Password: ************
? Enable SSL connection: (y/N) y
? Enable SSL connection: Yes
? Start with an example structure & data? (y/N) n
? Start with an example structure & data? No
? Start with Typescript? (Y/n) n
? Start with Typescript? No
? Install dependencies with npm? (Y/n) y
? Install dependencies with npm? Yes
? Initialize a git repository? (Y/n) n
? Initialize a git repository? No

## Note : Answer accordingly make sure if you are using Postegress with Neon to slect Enable SSL connection as yes otherwise it will give errors

3) Neon with postgress 

## Create account on neon server make sure to slect postgress as db 

4) UUId for random resume uid

 # Step 1: Installation
 npm i uuid
 # Step 2: Craete uuid
 import { v4 as uuidv4 } from 'uuid';
 uuidv4();
 5) Axios 
 $ npm install axios