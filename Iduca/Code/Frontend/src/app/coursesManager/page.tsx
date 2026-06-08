"use client";

import { Menu } from "@/src/components/menu";
import { 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Pagination, 
  Select, 
  TextField, 
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import imageLideranca from "../../../public/image/lideranca.jpg";
import { CardCourse } from "@/src/components/cardCourse";
import { CuteButton } from "@/src/components/cuteButton";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { NotifyModal } from "@/src/components/notifyModal";
import { api } from "@/src/constants/api";

const LEVELS = ["iniciante", "intermediario", "avancado"];

const CoursesManager = () => {
    const token = sessionStorage.getItem("Token");

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [collaboratorInfo, setCollaboratorInfo] = useState({
        Identity: "",
        courseName: ""
    });

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        // Limpa os campos ao fechar
        setCollaboratorInfo({
            Identity: "",
            courseName: ""
        });
    };



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/categories",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setCategories(response.data);
            } catch (error) {
                console.error("Erro ao buscar empresas:", error);
            }
        };


    
        fetchCategories();
        }, []);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get(`/courses?${`page=${1}&`}${level != '' ? `difficulty=${level}&` : ''}${title != '' ? `search=${title}&` : ''}${category != '' ? `category=${category}&` : ''}${`maxItems=${10}`}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setCourses(response.data.courses)
            } catch (error) {
                console.error("Erro ao buscar empresas:", error);
            }
        };
        fetchCourses();
        }, [title,category,level]);
    




    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCollaboratorInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {

        try {
            const response = await api.post("/manager/enroll",
                {
                    Identity: collaboratorInfo.Identity,
                    CourseName: collaboratorInfo.courseName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
        }       


        // Fecha o modal após o envio
        handleCloseModal();
    };

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} manager></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex flex-row justify-between items-center p-1 md:items-start">
                    <div className="flex-col gap-1">
                        <h1 className="md:text-2xl text-xl font-bold text-(--text)">Catálogo de Cursos</h1>
                        <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Explore todos os treinamentos disponíveis!</p>
                    </div>
                    <CuteButton 
                        text="Inscrever Colaborador" 
                        icon={PersonAddAlt1OutlinedIcon}
                        onClick={handleOpenModal}
                    ></CuteButton>
                </div>

                {/* Modal para inscrever colaborador */}
                <NotifyModal title="Inscrever Colaborador em Curso" open={openModal} onClose={handleCloseModal}>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '20px 0' }}>
                            <TextField
                                name="Identity"
                                label="ID do Colaborador"
                                variant="outlined"
                                fullWidth
                                value={collaboratorInfo.Identity}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="courseName"
                                label="Nome do Curso"
                                variant="outlined"
                                fullWidth
                                value={collaboratorInfo.courseName}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Cancelar
                        </Button>
                        <Button 
                            onClick={handleSubmit} 
                            color="primary"
                            variant="contained"
                            disabled={!collaboratorInfo.Identity || !collaboratorInfo.courseName}
                        >
                            Inscrever
                        </Button>
                    </DialogActions>
                </NotifyModal>

                {/* Search */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                    <TextField
                        onChange={(e) => setTitle(e.target.value)}
                        label="Título"
                        variant="outlined"
                        sx={{ backgroundColor: "var(--card)" }}
                        className="md:col-span-2"
                    />
                    <FormControl fullWidth sx={{ backgroundColor: "var(--card)" }}>
                        <InputLabel>Categoria</InputLabel>
                        <Select value={category} label="Categoria" onChange={(e) => setCategory(e.target.value)} >
                            <MenuItem key={0} value={0}>
                                Todos
                            </MenuItem>
                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ backgroundColor: "var(--card)" }}>
                        <InputLabel>Nível</InputLabel>
                        <Select value={level} label="Nível" onChange={(e) => setLevel(e.target.value)} >
                            <MenuItem key={0} value={0}>
                                Todos
                            </MenuItem>
                            {LEVELS.map((lvl,i) => (
                                <MenuItem key={i} value={i+1}>
                                    {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <div className="flex flex-col gap-10 items-center">
                        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 gap-4">
                            {courses.map((c) => (
                                <CardCourse 
                                    key={c.id}
                                    id={c.id} 
                                    image={c.image} 
                                    title={c.name} 
                                    description={c.description} 
                                    progress={0} 
                                    rating={4.7} 
                                    participants={128} 
                                    difficulty={c.difficulty}
                                >

                                </CardCourse>
                            ))}
                        </div>
                        <Pagination count={10} color="primary" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoursesManager;