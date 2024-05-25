import { Link } from "react-router-dom";

export default function Header() {

    return(

        <nav className="flex justify-evenly align-middle items-center bg-slate-950 h-24">

            <h1 className="text-4xl font-extrabold text-slate-500">Admin +</h1>

            <ul className="flex justify-around text-2xl gap-20 text-slate-500">

                <li className="decoration-none">
                    <Link to="/gerenciamentoDeAlunos" className="hover:text-slate-600 font-medium decoration-none">Inicio</Link>
                </li>

                <li className="decoration-none">
                    <Link to="/login" className="hover:text-slate-600 font-medium decoration-none">Logout</Link>                
                </li>

            </ul>
        
        </nav>
    )
}