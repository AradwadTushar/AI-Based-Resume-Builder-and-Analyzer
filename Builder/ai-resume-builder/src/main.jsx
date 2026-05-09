import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in'
import Home from './home/index.jsx'
import Dashboard from './dashboard'
import ResumeCreator from './dashboard/resumec.jsx'
import {ClerkProvider} from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const router= createBrowserRouter([
  {
    
    element: <App />,
    children: [
  
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>
    },
    {
      path:'/ResumeCreator',
      element:<ResumeCreator></ResumeCreator>
    },
    {
      path: '/dashboard/resume/:resumeId/edit',
      element:<EditResume></EditResume>
    }

  
  ]
  },
  {
    path: '/',
    element:<Home></Home>
  },
{
  path: '/auth/sign-in',
  element: <SignInPage></SignInPage>
}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
