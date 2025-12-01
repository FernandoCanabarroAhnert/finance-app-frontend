import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./routes/private.route";
import Test from "./pages/test.page";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><Test/></PrivateRoute>
    }
]);