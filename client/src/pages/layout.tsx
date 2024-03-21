import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"

export const Layout: FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 pb-20 font-roboto text-white">
            <div className="container">
                <Header />
                <div>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}