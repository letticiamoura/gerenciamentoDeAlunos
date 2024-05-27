import { useState, useEffect } from "react";
import axios from "axios";

import edit from "../../assets/edit.png";
import remove from "../../assets/remove.png";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

type Student = {
    id: number;
    nome: string;
    cpf: string;
    datanascimento: string;
    matricula: string;
    senha: string;
    id_curso: number;
}

export default function HomeT() {
    const [open, setOpen] = useState(false);
    const [alunos, setAlunos] = useState<Student[]>([]);
    const [newStudent, setNewStudent] = useState<Student>({
        id: 0,
        nome: '',
        cpf: '',
        datanascimento: '',
        matricula: '',
        senha: '',
        id_curso: 0
    });
    const [isEditing, setIsEditing] = useState<null | Student>(null);

    const theader = [
        {id: 1, title: 'Id'},
        {id: 2, title: 'Nome'},
        {id: 3, title: 'CPF'},
        {id: 4, title: 'Data de Nascimento'},
        {id: 5, title: 'Matrícula'},
        {id: 6, title: 'Curso'},
        {id: 7, title: 'Ação'}
    ];

    useEffect(() => {
        fetchAlunos();
    }, []);

    const fetchAlunos = async () => {
        try {
            const response = await axios.get('http://localhost:3333/alunos');
            setAlunos(response.data);
        } catch (error) {
            console.error("Erro ao requisitar dados: " + error);
        }
    };

    const handleOpenModal = () => {
        setOpen(!open);
        setIsEditing(null);
        setNewStudent({
            id: 0,
            nome: '',
            cpf: '',
            datanascimento: '',
            matricula: '',
            senha: '',
            id_curso: 0
        });
    };

    const handleEdit = (student: Student) => {
        setIsEditing(student);
        setNewStudent(student);
        setOpen(true);
    };

    const handleRemove = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3333/alunos/${id}`);
            setAlunos(alunos.filter(student => student.id !== id));
        } catch (error) {
            console.error("Erro ao remover aluno: " + error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setNewStudent(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            try {
                await axios.put(`http://localhost:3333/alunos/${newStudent.id}`, newStudent);
                setAlunos(alunos.map(student => student.id === newStudent.id ? newStudent : student));
            } catch (error) {
                console.error("Erro ao atualizar aluno: " + error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:3333/alunos', newStudent);
                setAlunos([...alunos, response.data]);
            } catch (error) {
                console.error("Erro ao adicionar aluno: " + error);
            }
        }
        setOpen(false);
    };

    return (
        <div>
            <Header />

            <div className="p-5 flex justify-between">
                <h2 className="p-5 text-3xl md:text-4xl font-extrabold text-slate-950/50">Alunos Cadastrados</h2>
                <button onClick={handleOpenModal}>
                    <img className="hover:scale-110" width="60" height="50" src="https://img.icons8.com/ios-filled/100/000630/add--v1.png" alt="add--v1"/>
                </button>
            </div>

            <div className="absolute w-[90vw] left-[5vw] z-40 top-[17vh] md:left-[10vw]">
                {open &&
                    <form className="pt-10 flex flex-col m-auto items-center border w-full md:w-[50vw] overflow-x-auto bg-slate-950 rounded-lg" onSubmit={handleSubmit}>
                        <div className="flex justify-between items-center gap-[30vw]">
                            <h2 className="text-4xl font-extrabold text-slate-200">Cadastro</h2>
                            <button onClick={() => setOpen(false)} className="text-4xl text-slate-400 font-extrabold">X</button>
                        </div>

                        <label htmlFor="nome" className="text-lg font-semibold text-slate-500/50">Nome <br />
                            <input value={newStudent.nome} onChange={handleInputChange} className="bg-slate-600 text-slate-900 rounded-xl pl-5 w-full md:w-[25vw] text-lg outline-none p-2 md:p-1" id="nome" type="text" placeholder="Ex: Alex Silva" title="Digite o nome do aluno"/>
                        </label>

                        <label htmlFor="matricula" className="text-lg font-semibold text-slate-500/50">Matrícula <br />
                            <input value={newStudent.matricula} onChange={handleInputChange} className="bg-slate-600 rounded-xl pl-5 w-full md:w-[25vw] text-lg outline-none p-2 md:p-1" id="matricula" type="text" placeholder="Ex: 1234..." title="Digite a matrícula..."/>
                        </label>

                        <label htmlFor="cpf" className="text-lg font-semibold text-slate-500/50">CPF <br />
                            <input value={newStudent.cpf} onChange={handleInputChange} className="bg-slate-600 rounded-xl pl-5 w-full md:w-[25vw] text-lg outline-none p-2 md:p-1" id="cpf" type="text" placeholder="XXX.XXX.XXX-XX" title="Digite o cpf..."/>
                        </label>

                        <label htmlFor="datanascimento" className="text-lg font-semibold text-slate-500/50">Data de nascimento <br /> 
                            <input value={newStudent.datanascimento} onChange={handleInputChange} className="bg-slate-600 rounded-xl pl-5 w-[57vw] md:w-[25vw] text-lg outline-none p-2 md:p-1" type="date" name="datanascimento" id="datanascimento" title="Digite a data de nascimento" />
                        </label>

                        <label htmlFor="id_curso" className="text-lg font-semibold text-slate-500/50">Curso <br /> 
                            <select value={newStudent.id_curso} onChange={handleInputChange} className="bg-slate-600 rounded-xl pl-5 w-[57vw] md:w-[25vw] text-lg outline-none p-2 md:p-1" name="id_curso" id="id_curso">
                                <option value="" className="w-[20vw] text-slate-200">Selecione uma opção</option>
                                {/* Adicione opções aqui de acordo com os cursos disponíveis */}
                                <option value={1}>Curso 1</option>
                                <option value={2}>Curso 2</option>
                                {/* ... */}
                            </select>
                        </label>

                        <div className="p-5">
                            <button className="w-[30vw] md:w-[10vw] p-2 rounded-xl bg-slate-400 hover:scale-110">Cadastrar</button>
                        </div>
                    </form>
                }
            </div>

            <div className="overflow-x-auto">
                <table className="border m-auto w-[60vw] bg-slate-600/50">
                    <thead className="h-[7vh] text-slate-200 bg-slate-950">
                        <tr>
                            {theader.map((items) => (
                                <th key={items.id}>{items.title}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {alunos.map((aluno) => (
                            <tr key={aluno.id} className="border-b">
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.cpf}</td>
                                <td>{aluno.datanascimento}</td>
                                <td>{aluno.matricula}</td>
                                <td>{aluno.id_curso}</td>
                                <td>
                                    <div className="flex flex-row items-center justify-center">
                                        <button onClick={() => handleEdit(aluno)}>
                                            <img className="hover:scale-110" width="25" height="25" src={edit} alt="edit"/>
                                        </button>

                                        <button onClick={() => handleRemove(aluno.id)}>
                                            <img className="hover:scale-110" width="25" height="25" src={remove} alt="remove"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Footer />
        </div>
    )
}
