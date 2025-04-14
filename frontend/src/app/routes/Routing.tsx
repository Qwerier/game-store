import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import HomePage from "../../features/home/HomePage";
import GameDetails from "../../features/catalog/GameDetails";
import Catalog from "../../features/catalog/Catalog";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import NotFound from "../../features/NotFound/NotFound";
import ErrorPage from "../../features/errorTest/ErrorPage";

// defines routes for default path served through RouterProvider in frontend\src\main.tsx
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '', element: <HomePage/>},
            {path: '/catalog', element: <Catalog/>},
            {path: '/catalog/:id', element: <GameDetails/>}, // component based on a path param
            {path: '/about', element: <AboutPage/>},
            {path: '/contact', element: <ContactPage/>},
            {path: '/error', element: <ErrorPage/> },
            {path: '*', element: <NotFound/>},
        ]
    }
])