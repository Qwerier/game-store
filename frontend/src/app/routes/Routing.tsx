import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../App";
import HomePage from "../../features/home/HomePage";
import GameDetails from "../../features/catalog/GameDetails";
import Catalog from "../../features/catalog/Catalog";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ErrorPage from "../../features/errorTest/ErrorPage";
import ServerError from "../../features/errorTest/ServerError";
import NotFound from "../../features/errorTest/NotFound";
import BasketPage from "../../features/basket/BasketPage";

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
            {path: '/basket', element: <BasketPage/>},
            {path: '/error', element: <ErrorPage/> },
            {path: '/server-error', element: <ServerError/>},
            {path: '/notfound', element: <NotFound/>},
            {path: '*', element: <Navigate replace to='/notfound'/>},
        ]
    }
])