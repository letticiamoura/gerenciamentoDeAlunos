import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [ user, setUser ] = useState();
    const [ password, setPassword ] = useState();
    const navigate = useNavigate();

    const handleLogin = () => {
        if(user === 'admin' && password === '123') {
            navigate('/gerenciamentoDeAlunos');
        } else {
        }
    }

    return(

        <div className="pt-24 h-screen bg-slate-800">

            <form className="flex pt-10 items-center flex-col h-[70vh] w-[50vw] m-auto bg-slate-500 rounded-xl">

                <h1 className="text-5xl font-extrabold text-slate-100">Faça seu Login</h1>

                <label htmlFor="user" className="pt-10 text-xl text-slate-300 font-medium">Matrícula <br />
                    <input id="user" type="text" placeholder="Ex: 14788" title="Digite sua matrícula" className="p-1 w-[30vw] rounded-lg pl-3 outline-none bg-slate-600/50 text-slate-400"/>
                </label>

                <label htmlFor="senha" className="pt-5 text-xl text-slate-300 font-medium">Senha <br />
                    <input id="user" type="password" placeholder="********" title="Digite sua senha" className="p-1 w-[30vw] rounded-lg pl-3 outline-none bg-slate-600/50 text-slate-400"/>
                </label>

                <div className="pt-10">
                    <button onClick={handleLogin} className="p-1 w-[8vw] rounded-lg bg-slate-950 hover:bg-slate-900/50 text-slate-300 text-xl">Entrar</button>
                </div>

            </form>

        </div>

    )
}