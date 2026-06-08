"use client";

import { Menu } from "@/src/components/menu";
import { FormControl, InputLabel, MenuItem, Pagination, Select, TextField, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import imageLideranca from "../../../public/image/lideranca.jpg";
import { CardCourse } from "@/src/components/cardCourse";
import { api } from "@/src/constants/api";


const LEVELS = ["iniciante", "intermediario", "avancado"];

const Courses = () => {
    const token = sessionStorage.getItem("Token");

    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");



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




    return (
        <>

                <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
                <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                    {/* Title */}
                    <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                        <h1 className="md:text-2xl text-xl font-bold text-(--text)">Catálogo de Cursos</h1>
                        <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Explore todos os treinamentos disponíveis!</p>
                    </div>

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

export default Courses;