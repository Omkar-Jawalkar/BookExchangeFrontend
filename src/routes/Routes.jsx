import { createBrowserRouter } from "react-router-dom";
import Login from "../components/loginPage/login";
import RegisterUser from "../components/register-user/RegisterUser";
import AddBook from "../pages/addbook/AddBook";
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
        element: <RegisterUser />,
    },
    {
        path: "/book/add",
        element: <AddBook />,
    },
]);

export default router;
