import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (user === 'admin' && password === '123') {
            navigate('/gerenciamentoDeAlunos');
        } else {
            alert('Usuário ou senha incorretos');
        }
    };

    return (
        <div className="pt-24 h-screen bg-slate-800">
            <form onSubmit={handleLogin} className="flex pt-10 items-center flex-col h-[70vh] w-[50vw] m-auto bg-slate-500 rounded-xl">
                <h1 className="text-5xl font-extrabold text-slate-100">Faça seu Login</h1>
                <label htmlFor="user" className="pt-10 text-xl text-slate-300 font-medium">
                    Matrícula <br />
                    <input 
                        id="user" 
                        type="text" 
                        placeholder="Ex: 14788" 
                        title="Digite sua matrícula" 
                        className="p-1 w-[30vw] rounded-lg pl-3 outline-none bg-slate-600/50 text-slate-400"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </label>
                <label htmlFor="password" className="pt-5 text-xl text-slate-300 font-medium">
                    Senha <br />
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="********" 
                        title="Digite sua senha" 
                        className="p-1 w-[30vw] rounded-lg pl-3 outline-none bg-slate-600/50 text-slate-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div className="pt-10">
                    <button type="submit" className="p-1 w-[8vw] rounded-lg bg-slate-950 hover:bg-slate-900/50 text-slate-300 text-xl">Entrar</button>
                </div>
            </form>
        </div>
    );
}
