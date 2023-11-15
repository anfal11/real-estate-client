import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home";
import Properties from "../Pages/Properties";
import Login from "../Pages/Login";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>404 Not Found</h1>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "properties",
                element: <Properties />,
            },
            {
                path: "login",
                element: <Login />,
            }
        ],
    }
])

export default Router;