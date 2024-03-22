import { FC } from "react"
import { Link } from "react-router-dom"

export const ErrorPage: FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="container">
                <h1 className="text-red-600 text-center text-8xl">ErrorPage</h1>
                <div className="text-center mt-10">
                    <Link className="text-white  text-3xl rounded-md bg-sky-400 p-2 hover:bg-sky-600" to={'/'}>Home</Link>
                </div>
                
            </div>
            
        </div>
       
    )
}