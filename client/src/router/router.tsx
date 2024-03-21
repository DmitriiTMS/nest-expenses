import { createBrowserRouter } from "react-router-dom";
import { Layout} from "../pages/layout";
import { ErrorPage } from "../pages/error-page";
import { HomePage } from "../pages/home-page";
import { TransactionsPage } from "../pages/transactions-page";
import { CategoriesPage } from "../pages/catergories-page";
import { AuthPage } from "../pages/auth-page";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'transactions',
                element: <TransactionsPage/>
            },
            {
                path: 'categories',
                element: <CategoriesPage/>
            },
            {
                path: 'auth',
                element: <AuthPage/>
            }
        ]
    }
])