import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home.page";
import Layout from "./components/layout.component";
import PrivateRoute from "./routes/private.route";
import Wallets from "./pages/wallets.page";
import Categories from "./pages/categories.page";
import Transactions from "./pages/transactions.page";
import Dashboard from "./pages/dashboard.page";

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
                element: <PrivateRoute><Dashboard/></PrivateRoute>
            },
            {
                path: 'wallets',
                element: <PrivateRoute><Wallets/></PrivateRoute>
            },
            {
                path: 'categories',
                element: <PrivateRoute><Categories/></PrivateRoute>
            },
            {
                path: 'transactions',
                element: <PrivateRoute><Transactions/></PrivateRoute>
            }
        ]
    }
]);