import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home";
import Properties from "../Pages/Properties";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import PropertyDetails from "../Pages/PropertyDetails";
import Errorpage from "../Pages/Errorpage";
import Dashboard from "../Pages/Dashboard";
import MyProfile from "../Components/UserDashboard/MyProfile";
import EditProfile from "../Components/UserDashboard/EditProfile";
import MyReviews from "../Components/UserDashboard/MyReviews";
import Wishlist from "../Components/UserDashboard/Wishlist";
import AddProperty from "../Components/AgentDashboard/AddProperty";
import MyAddedProperty from "../Components/AgentDashboard/MyAddedProperty";
import MySoldProperty from "../Components/AgentDashboard/MySoldProperty";
import RequestProperties from "../Components/AgentDashboard/RequestProperties";
import UpdateProperty from "../Components/AgentDashboard/UpdateProperty";
import ManageProperties from "../Components/AdminDashboard/ManageProperties";
import ManageUsers from "../Components/AdminDashboard/ManageUsers";
import ManageReviews from "../Components/AdminDashboard/ManageReviews";

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
                element: <Properties />,
            },
            {
                path: "/properties/:id",
                element: <PrivateRoute><PropertyDetails /></PrivateRoute>,
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
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: "profile",
                element: <MyProfile />,
            },
            // user dashboard
            {
                path: "editProfile/:id",
                element: <EditProfile />,
            },
            {
                path: "myReviews",
                element: <MyReviews />,
            },
            {
                path: "wishlist",
                element: <Wishlist />,
            },
            // agent dashboard
            {
                path: "addProperty",
                element: <AddProperty />,
            },
            {
                path: "myAddedProperty",
                element: <MyAddedProperty />,
            },
            {
                path: "mySoldProperty",
                element: <MySoldProperty />,
            },
            {
                path: "reqProperties",
                element: <RequestProperties />,
            },
            {
                path: "update-property/:id",
                element: <UpdateProperty />,
            },
            // admin dashboard
            {
                path: "manageProperties",
                element: <ManageProperties />,
            },
            {
                path: "manageUsers",
                element: <ManageUsers />,
            },
            {
                path: "manageReviews",
                element: <ManageReviews />,
            },
        ]
    }
])

export default Router;