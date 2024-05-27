// antigo

import axios from "axios"
import { useEffect, useState } from "react"

import edit from "../../assets/edit.png";
import remove from "../../assets/remove.png";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

type Aluno = {
    id: number;
    nome: string;
   // datanascimento: string;
    matricula: string;
    senha: string;
    idCurso: number;
    curso: string;
};

type EditAlunoDTO = {
    id: number;
    nome: string;
    matricula: string;
    senha: string;
    cursoId: number;
};

type Curso = {
    id: number;
    nome: string;
};

export default function List() {

    const uri = "/ativos";
    const url = "http://localhost:3333/alunos";
    const urlCursos = "http://localhost:3333/cursos";


    const [ open, setOpen ] = useState(false);

    const [ alunos, setAlunos ] = useState<Aluno[]>([]);
    const [ alunoEditing, setAlunoEditing ] = useState<any>();
 
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [curso, setCurso] = useState(0);

    const [cursos, setCursos] = useState<Curso[]>([]);

    // Edit aluno
    const [openEditModal, setEditModal] = useState(false);
    
    const [alunoIdSelected, setAlunoIdSelected] = useState(0);

    const [alunoEdit, setAlunoEdit] = useState<EditAlunoDTO>({
        id: 0,
        nome: "",
        matricula: "",
        senha: "",
        cursoId: 0
    });




    //Cabeçario da tabela
    const theader = [
        {id: 1, title: 'Id'},
        {id: 2, title: 'Nome'},
        {id: 3, title: 'Senha'},
        {id: 4, title: 'Matrícula'},
        {id: 5, title: 'Curso'},
        {id: 6, title: 'Ação'}
    ]

    //Função p/ abrir o modal
    const handleOpenModal = () => {
        setOpen(!open);
    }

    const handleRemove = async (id:number) => {
        try {
            await axios.delete(`${url}/${id}`);
            setAlunos(alunos.filter(aluno => aluno.id !== id));
        } catch (error) {
            console.error("Erro ao remover aluno: " + error);
        }
    };

    //Requisitando dados da api da tabela alunos
    useEffect(() => {
        axios.get<Aluno[]>(`${url}${uri}`)
            .then((resp) => {
                setAlunos(resp.data);
                console.log(JSON.stringify(resp.data))
            })
            .catch((err) => console.error("Erro ao requisitar dados " + err));
    }, []);

     // Requisitando dados da tabela cursos
     useEffect(() => {
        axios.get<Curso[]>(urlCursos)
            .then((resp) => {
                console.log(resp);
                setCursos(resp.data);
            })
            .catch((err: string) => {
                console.error("Erro ao requisitar dados da tabela curso " + err);
            });

    }, []);

    const handleNewStudent = async (event: React.FormEvent) => {

        event.preventDefault();
        
        const newStudent = {
            nome,
            matricula,
            senha,
            idCurso: curso
        };

        try {
            const resp = await axios.post(url, newStudent);
            setAlunos([...alunos, resp.data]);
            setOpen(false);


            // Limpar os campos após o cadastro
            setNome('');
            setMatricula('');
            setSenha('');
            setCurso(0);
        } catch (err) {
            console.error("Erro ao cadastrar aluno " + err);
        }
    }


    // Editando aluno 
    const handleEditAluno = async (event: React.FormEvent) => {

        alunoEdit.id = alunoIdSelected;
    
        event.preventDefault();
    
        try {
    
            console.log("data edited: " + JSON.stringify(alunoEdit));

            console.log("curso escolhido id: " + curso);
    
            await axios.patch(`${url}/${alunoEdit.id}`, {
                id: alunoEdit.id,
                nome: alunoEdit.nome,
                matricula: alunoEdit.matricula,
                senha: alunoEdit.senha,
                idCurso: curso
            });
    
            setEditModal(false)
            setAlunoEdit({ id: 0, nome: "", matricula: "", senha: "", cursoId: 0});
    
        } catch (err) {
            console.error("Erro ao atualizar dados do aluno " + err);
        }
    
    };

    const handleGetAluno = async (id: number) => {

        axios.get<Aluno[]>(`${url}/${id}`)
            .then((resp) => {
                console.log(resp.data);
                setAlunoEditing(resp.data);
            })
            .catch((err) => console.error("Erro ao requisitar dados " + err));
    }


    return(

        <div className="h-auto">

            <Header />

            <div className="p-10 flex items-center justify-around">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-500">Alunos Cadastrados</h2>
                <button>
                <img onClick={handleOpenModal} className="hover:scale-110" width="60" height="50" src="https://img.icons8.com/ios-filled/100/000630/add--v1.png" alt="add--v1"/>
                </button>
            </div>

            <div className="overflow-auto">

                <table className="bg-slate-600 m-auto overflow-auto text-center w-[60vw]">

                    <thead className="bg-slate-950 text-slate-100/50">

                        <tr>
                            {
                                theader.map((item, index) => (
                                    <th className="p-3" key={index}>{item.title}</th>
                                ))
                            }
                        </tr>
                        
                    </thead>

                    <tbody className="text-slate-300/80 divide-y">
                        {
                            alunos.map((aluno, index) => (
                                <tr key={index}>
                                    <td className="p-2">#{aluno.id}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.senha}</td>
                                    <td>{aluno.matricula}</td>
                                    <td>{aluno.curso}</td>
                                    <td>
                                        <div className="flex justify-evenly items-center">
                                        <button type="submit" title="Aperte para remover" onClick={() => { setEditModal(true); setAlunoIdSelected(aluno.id); handleGetAluno(aluno.id) } }>
                                                <img src={edit} alt="Editar" className="h-5 hover:scale-110 cursor-pointer" />
                                            </button>
                                            <button type="submit" title="Aperte para remover">
                                                <img onClick={() => handleRemove(aluno.id)} src={remove} alt="Editar" className="h-5 hover:scale-110 cursor-pointer" />
                                            </button>
                                        </div>    
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

            {
                open &&
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg">
                        <form className="bg-slate-950 flex gap-5 flex-col items-center w-[50vw] m-auto rounded-xl">

                            <div className="flex gap-32 md:gap-64 justify-around  items-center">
                                <h2 className="pt-5 text-4xl font-extrabold text-slate-100/70">Cadastro</h2>
                                <h1 onClick={() => setOpen(false)} className="text-slate-100/70 text-4xl font-extrabold">X</h1>
                            </div>
                            
                            <div className="flex items-center gap-10">
                                <label htmlFor="nome" className="text-slate-400/50 text-xl">Nome <br />
                                    <input 
                                        id="nome" 
                                        type="text"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder="Digite o nome..." title="Digite o nome do aluno" className="p-2 md:p-1 pl-5 w-fit bg-slate-500/50 rounded-lg"
                                        />
                                </label>

                                <label htmlFor="cursos" className="text-slate-400/50 text-xl">Curso <br />
                                    <select 
                                        name="cursos" 
                                        id="cursos" 
                                        value={curso}
                                        onChange={(e) => setCurso(Number(e.target.value))}
                                        title="Selecione uma opção" className="p-2 md:p-1 pl-5 w-[66vw] md:w-[17vw] bg-slate-500/50 rounded-lg">
                                        {cursos.map((item, index) => (
                                            <option key={index} value={item.id}>{item.nome}</option>
                                        ))}

                                    </select>
                                </label>

                            </div>

                            <div className="flex items-center gap-10">
                                <label htmlFor="matricula" className="text-slate-400/50 text-xl">Matrícula <br />
                                    <input 
                                        id="matricula" 
                                        type="text" 
                                        value={matricula}
                                        onChange={(e) => setMatricula(e.target.value)}
                                        placeholder="Digite a matrícula..." title="Digite a matrícula do aluno" className="p-2 md:p-1 pl-5 w-fit bg-slate-500/50 rounded-lg"
                                        />
                                </label>

                                <label htmlFor="senha" className="text-slate-400/50 text-xl">Senha <br />
                                    <input 
                                        id="senha" 
                                        type="text" 
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder="Digite a senha..." title="Digite a senha do aluno" className="p-2 md:p-1 pl-5 w-fit bg-slate-500/50 rounded-lg"/>
                                </label>
                            </div>

                            <div className="p-5 pb-10">
                                <button className="bg-slate-600 p-2 w-[30vw] md:w-[10vw] text-lg rounded-xl hover:scale-110 text-slate-200/50" onClick={handleNewStudent}>Cadastrar</button>
                            </div>

                        </form>
                    </div>
            }

            
            { openEditModal &&
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg">
                    <form className="bg-slate-950 flex gap-5 flex-col items-center w-[50vw] m-auto rounded-xl" onSubmit={handleNewStudent}>
                        <div className="flex gap-32 md:gap-64 justify-around items-center">
                            <h2 className="pt-5 text-4xl font-extrabold text-slate-100/70">Edição</h2>
                            <h1 onClick={() => setEditModal(false)} className="text-slate-100/70 text-4xl font-extrabold">X</h1>
                        </div>

                        <div className="flex items-center gap-10">
                            <label htmlFor="nome" className="text-slate-400/50 text-xl">Nome <br />
                                <input
                                    id="nome"
                                    type="text"
                                    onChange={(e) => setAlunoEdit({ ...alunoEdit, nome: e.target.value })}
                                    placeholder={ alunoEditing && alunoEditing.nome } title="Digite o nome do aluno" className="p-2 md:p-1 pl-5 w-fit bg-slate-500/50 rounded-lg"
                                />
                            </label>

                            <label htmlFor="curso" className="text-slate-400/50 text-xl">Curso <br />
                                <select
                                    name="curso"
                                    id="curso"
                                    value={curso} 
                                    onChange={(e) => setCurso(Number(e.target.value))}
                                    title="Selecione uma opção" className="p-2 md:p-1 pl-5 w-[66vw] md:w-[17vw] bg-slate-500/50 rounded-lg">
                                    <option key={0} value={1} selected>{alunoEditing && alunoEditing.curso}</option>
                                    {cursos.map((item, index) => (
                                        <option key={index} value={item.id}>{item.nome}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="flex items-center gap-10">
                            <label htmlFor="matricula" className="text-slate-400/50 text-xl">Matrícula <br />
                                <input
                                    id="matricula"
                                    type="text"
                                    onChange={(e) => setAlunoEdit({...alunoEdit, matricula: e.target.value})}
                                    placeholder={ alunoEditing && alunoEditing.matricula } title="Digite a matrícula do aluno" className="p-2 md:p-1 pl-5 w-fit bg-slate-500/50 rounded-lg"
                                />
                            </label>

                            <label htmlFor="senha" className="text-slate-400/50 text-xl">Senha <br />
                                <input
                                    id="senha"
                                    type="text"
                                    onChange={(e) => setAlunoEdit({...alunoEdit, senha: e.target.value})}
                                    placeholder={ alunoEditing && alunoEditing.senha } title="Digite a senha do aluno" className="p-2 md:p-1 pl-5 w-fit bg-slate-500/50 rounded-lg" />
                            </label>
                        </div>

                        <div className="p-5 pb-10">
                            <button className="bg-slate-600 p-2 w-[30vw] md:w-[10vw] text-lg rounded-xl hover:scale-110 text-slate-200/50" type="submit" onClick={(e) => handleEditAluno(e)}>Concluir Edição</button>
                        </div>
                    </form>
                </div>
            }


            <Footer />

        </div>

    )
}