import { FC } from "react"
import { Link, NavLink } from "react-router-dom";
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'

export const Header: FC = () => {

    const auth = true;

    return <header className=" flex items-center p-4 shadow-sm backdrop-blur-sm">
        <Link to={'/'}>
            <FaBtc size={40} />
        </Link>
        {
            auth && (
                <nav className="ml-auto mr-10">
                    <ul className="flex items-center gap-5">
                        <li>
                            <NavLink to={'/'} className={({ isActive }) => isActive ? "text-white" : 'text-white/50'}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/transactions'} className={({ isActive }) => isActive ? "text-white" : 'text-white/50'}>Transactions</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/categories'} className={({ isActive }) => isActive ? "text-white" : 'text-white/50'}>Categories</NavLink>
                        </li>
                    </ul>
                </nav>
            )
        }
        {
            auth ? (
                <button className="btn btn-red">
                    <span>LogOut</span>
                    <FaSignOutAlt />
                </button>
            ) : <Link to={'/auth'} className=" py-2 text-white/50 hover:text-white">
                Log in / Sign in
            </Link>
        }
    </header>
}