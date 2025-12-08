import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home.page";
import Layout from "./components/layout.component";
import Test from "./pages/test.page";
import PrivateRoute from "./routes/private.route";
import Wallets from "./pages/wallets.page";
import Categories from "./pages/categories.page";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/finances',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <Navigate to="dashboard" replace />
            },
            {
                path: 'dashboard',
                element: <PrivateRoute><Test/></PrivateRoute>
            },
            {
                path: 'wallets',
                element: <PrivateRoute><Wallets/></PrivateRoute>
            },
            {
                path: 'categories',
                element: <PrivateRoute><Categories/></PrivateRoute>
            }
        ]
    }
]);