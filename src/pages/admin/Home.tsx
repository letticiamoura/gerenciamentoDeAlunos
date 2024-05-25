import { useState } from "react"

import edit from "../../assets/edit.png";
import remove from "../../assets/remove.png";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

type Student = {
    id: number;
    name: string;
    cpf: string;
    dataNasc: string;
    matricula: string;
    curso: string;
}

export default function Home() {

    const [ open, setOpen ] = useState(false)

    const theader = [
        {id: 1, title: 'Id'},
        {id: 2, title: 'Nome'},
        {id: 3, title: 'CPF'},
        {id: 4, title: 'Data de Nascimento'},
        {id: 5, title: 'Matrícula'},
        {id: 6, title: 'Curso'},
        {id: 7, title: 'Ação'}
    ]

    const [students, setStudents] = useState<Student[]>([
        {id: 1, name: 'Leticia Moura', cpf: '123.456.789.96', dataNasc: '29/11/2004', matricula: '12345', curso: 'Negócios'},
        {id: 2, name: 'Matheus Bezerra', cpf: '123.456.789.96', dataNasc: '21/06/2004', matricula: '14725', curso: 'ADS'}
    ]);

    const [newStudent, setNewStudent] = useState<Student>({id: 0, name: '', cpf: '', dataNasc: '', matricula: '', curso: ''});
    
    const [isEditing, setIsEditing] = useState<null | Student>(null);

    const handleOpenModal = () => {
        setOpen(!open);
        setIsEditing(null);
    } 
    
    const handleEdit = (student: Student) => {
        setIsEditing(student);
        setNewStudent(student);
        setOpen(true);
    }

    const handleRemove = (id: number) => {
        setStudents(students.filter(student => student.id !== id));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setNewStudent(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            setStudents(students.map(student => student.id === newStudent.id ? newStudent : student));
        } else {
            const newId = students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 1;
            setNewStudent(prevState => ({ ...prevState, id: newId }));
            setStudents([...students, { ...newStudent, id: newId }]);
        }
        setOpen(false);
        setNewStudent({id: 0, name: '', cpf: '', dataNasc: '', matricula: '', curso: ''});
    }

    return(

        <div>

        <Header />
           
           <div className="p-5 flex justify-between">

                <h2 className="p-5 text-3xl md:text-4xl font-extrabold text-slate-950/50">Alunos Cadastrados</h2>

                <button onClick={handleOpenModal}>
                <img className="hover:scale-110" width="60" height="50" src="https://img.icons8.com/ios-filled/100/000630/add--v1.png" alt="add--v1"/>
                </button>

                <div className="absolute w-[90vw] left-[5vw] z-40 top-[17vh] md:left-[10vw]">

                    {open &&
                        <form className="pt-10 flex flex-col m-auto items-center border w-full md:w-[50vw] overflow-x-auto bg-slate-950 rounded-lg" onSubmit={handleSubmit}>

                            <div className="flex justify-between items-center gap-[30vw]">
                                <h2 className="text-4xl font-extrabold text-slate-200">Cadastro</h2>
                                <button onClick={() => setOpen(false)} className="text-4xl text-slate-400 font-extrabold">X</button>
                            </div>

                            <label htmlFor="name" className="text-lg font-semibold text-slate-500/50">Nome <br />
                                <input value={newStudent.name} onChange={handleInputChange} className="bg-slate-600 text-slate-900 rounded-xl pl-5 w-full md:w-[25vw] text-lg outline-none p-2 md:p-1" id="name" type="text" placeholder="Ex: Alex Silva" title="Digite o nome do aluno"/>
                            </label>

                            <label htmlFor="matricula" className="text-lg font-semibold text-slate-500/50">Matrícula <br />
                                <input value={newStudent.matricula} onChange={handleInputChange} className="bg-slate-600 rounded-xl pl-5 w-full md:w-[25vw] text-lg outline-none p-2 md:p-1" id="matricula" type="text" placeholder="Ex: 1234..." title="Digite a matrícula..."/>
                            </label>

                            <label htmlFor="cpf" className="text-lg font-semibold text-slate-500/50">CPF <br />
                                <input value={newStudent.cpf} onChange={handleInputChange} className="bg-slate-600 rounded-xl pl-5 w-full md:w-[25vw] text-lg outline-none p-2 md:p-1" id="cpf" type="text" placeholder="XXX.XXX.XXX-XX" title="Digite o cpf..."/>
                            </label>

                            <label htmlFor="date" className="text-lg font-semibold text-slate-500/50">Data de nascimento <br /> 
                                <input value={newStudent.dataNasc} onChange={handleInputChange} className="bg-slate-600 rounded-xl pl-5 w-[57vw] md:w-[25vw] text-lg outline-none p-2 md:p-1" type="date" name="date" id="date" title="Digite a data de nascimento" />
                            </label>

                            <label htmlFor="curso" className="text-lg font-semibold text-slate-500/50">Curso <br /> 
                                <select value={newStudent.curso} onChange={handleInputChange} className="bg-slate-600 rounded-xl pl-5 w-[57vw] md:w-[25vw] text-lg outline-none p-2 md:p-1" name="curso" id="curso">
                                    <option value="x" className="w-[20vw] text-slate-200">Selecione uma opção</option>
                                    <option value="Administração">Administração</option>
                                    <option value="ADS">Análise e Desenvolvimento de Sistemas</option>
                                    <option value="economia">Ciências Econômicas</option>
                                    <option value="Negócios">Negócios</option>
                                </select>
                            </label>

                            <div className="p-5">
                                <button className="w-[30vw] md:w-[10vw] p-2 rounded-xl bg-slate-400 hover:scale-110">Cadastrar</button>
                            </div>

                        </form>
                    }

                </div>

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
                    {students.map((aluno) => (
                         <tr key={aluno.id} className="border-b">
                            <td>{aluno.id}</td>
                            <td>{aluno.name}</td>
                            <td>{aluno.cpf}</td>
                            <td>{aluno.dataNasc}</td>
                            <td>{aluno.matricula}</td>
                            <td>{aluno.curso}</td>
                            <td>
                                <div className="flex flex-col gap-2 items-center">
                                    <button onClick={() => handleEdit(aluno)} className="text-slate-200 w-10 m-auto" title="Aperte para editar">
                                        <img src={edit} alt="Editar" className="h-5 m-auto"/>
                                    </button>
                                    <button onClick={() => handleRemove(aluno.id)} className=" text-slate-200 w-10 m-auto" title="Aperte para Apagar">
                                        <img src={remove} alt="Remover" className="h-5 m-auto"/>
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
