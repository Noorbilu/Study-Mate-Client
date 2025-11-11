import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout.jsx';
import Home from './Components/Home/Home.jsx';
import AllMates from './Components/AllMates/AllMates.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import AuthLayout from './Layout/AuthLayout.jsx';
import Register from './Pages/Register/Register.jsx';
import Login from './Pages/Login/Login.jsx';
import PartnerProfile from './Components/PartnerProfile/PartnerProfile.jsx';
import Connections from './Components/Connections/Connections.jsx';
import FindPartner from './Components/FindPartner/FindPartner.jsx';
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx';
import Profile from './Components/Profile/Profile.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/allMates",
        Component: FindPartner
      },
      {
        path: "/connections",
        Component: Connections
      },
      {
        path: "/partnerProfile",
        Component: PartnerProfile
      },
      {
        path:"/profile",
        Component: Profile
      },
      
      {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>
          },
          {
            path: "/auth/register",
            element: <Register></Register>
          }
        ]
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
