import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home";
import Properties from "../Pages/Properties";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import PropertyDetails from "../Pages/PropertyDetails";
import Errorpage from "../Pages/Errorpage";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Errorpage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/properties",
                element: <PrivateRoute><Properties /></PrivateRoute>,
            },
            {
                path: "/properties/:id",
                element: <PropertyDetails />,
              },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            }
        ],
    }
])

export default Router;