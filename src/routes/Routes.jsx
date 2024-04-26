import { createBrowserRouter } from "react-router-dom";
import Login from "../components/loginPage/login";
import RegisterUser from "../components/register-user/RegisterUser";
import Home from "../pages/home/Home";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <RegisterUser
         />,
    },
]);

export default router;
