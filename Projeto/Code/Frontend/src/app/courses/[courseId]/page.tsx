"use client"

import { Menu } from "@/src/components/menu";
import imagem from "../../../../public/image/lideranca.jpg";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { api } from "@/src/constants/api";
import { useEffect, useState } from "react";
import { use } from 'react';


interface ISelectCourse {
  params: {
    courseId: string;
  };
}


const selectCourse = ({ params }: { params: Promise<{ courseId: string }> }) => {
    const token = sessionStorage.getItem("Token");
    const { courseId } = use(params);



    
    const [course, setCourse] = useState(
        {
            image: "",
            title: "",
            description: "",
            progress: "",
            rating: "",
            participants: "",
            difficulty: 0,
            duration: "",
            category: 0,
            haveExam: "",
            id: "",
            modules: []
        }
    );


    useEffect(() => {
            const fetchCourse = async () => {
                try {
                    const response = await api.get(`/courses/${courseId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
                    );
                    setCourse(response.data);
                    console.log(response.data)
                } catch (error) {
                    console.error("Erro ao buscar empresas:", error);
                }
            };
            
    
        
            fetchCourse();
          }, []);

    const testExemple = {
        id: 1,
        title: "Prova Final",
        courseId: 5,
        completed: false,
        questions: [
            {
                id: 1,
                question: "What is the command to initialize a Git repository?",
                options: [
                    { id: 1, text: "git start", alternative: "a" },
                    { id: 2, text: "git init", alternative: "b" },
                    { id: 3, text: "git begin", alternative: "c" }
                ]
            },
            {
                id: 2,
                question: "What file tracks your commits?",
                options: [
                    { id: 1, text: ".git/config", alternative: "a" },
                    { id: 2, text: ".gitignore", alternative: "b" },
                    { id: 3, text: ".git", alternative: "c" }
                ]
            }
        ]
    }

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">

                {/* Title */}
                <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">{course.title}</h1>
                    <div className="flex gap-2">
                        <span className={`${course.difficulty == 1 ? "bg-(--green)" : course.difficulty == 2 ? "bg-(--blue)" : "bg-(--purple)"} text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-lg`}>
                            {course.difficulty == 1 ? "Iniciante" : course.difficulty == 2 ? "Intermediário" : "Avançado"}
                        </span>
                        <div className="flex items-center gap-1">
                            <AccessTimeOutlinedIcon sx={{ color: "var(--gray)" }}/>
                            <p className="text-(--gray) text-sm text-center md:text-start">{course.duration} horas</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <PeopleAltOutlinedIcon sx={{ color: "var(--gray)" }}/>
                            <p className="text-(--gray) text-sm text-center md:text-start">{course.participants} participantes</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <StarOutlinedIcon sx={{ color: "var(--yellow)" }}/>
                            <p className="text-(--gray) text-sm text-center md:text-start">{course.rating}</p>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 p-1">
                    <div className="flex flex-col gap-5 justify-around">
                        <p className="text-(--text)">
                            {course.description}
                        </p>
                        <div className="flex flex-col gap-2">
                            <div>
                                <div className="flex w-full justify-between">
                                    <h2 className="text-(--text)">Progresso geral</h2>
                                    <h2 className="text-(--text)">{course.progress}%</h2>
                                </div>
                                <LinearProgress variant="determinate" value={course.progress} />
                            </div>
                            <Link href={`/project/1`} className="w-3/6 self-start">
                                <div className="bg-(--normalBlue) flex items-center justify-center w-full rounded-2xl hover:bg-(--normalBlueHover) text-white">
                                    <Button className="w-full" disableElevation variant="contained" sx={{boxShadow: 'var(--shadow)', backgroundColor: "inherit", color: "inherit", height: "45px"}}>{course.progress > 0 ? "Continuar Curso" : "Iniciar Curso"}</Button>
                                </div>
                            </Link>

                        </div>
                        
                    </div>
                    <Image className="object-cover w-full md:w-auto rounded-2xl justify-self-center" src={course.image} alt={`${course.title}.png`} width={500} height={500} priority />
                </div>

                <Divider sx={{ borderColor: 'var(--gray)' }} />


                <div>
                    {course.modules.map((module, index) => 
                        <Accordion key={module.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <h1 className="text-(--blue) font-bold mr-2">Módulo {index + 1} -</h1>
                                <p className="text-(--text)">{module.title}</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                {module.content.map((content, index) =>
                                    <div key={`${module.id}-${content.id}`}>
                                    {content.completed ? 
                                        <>
                                            {content.type == 1 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/textLesson/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--blueOpacity) transition-colors duration-100">
                                                        <div className="bg-(--blue) w-1 min-h-10"></div>
                                                        <FeedOutlinedIcon sx={{ color: "var(--blue)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                        <CheckCircleOutlineOutlinedIcon sx={{ color: "var(--green)"}}/>
                                                    </div>
                                                </Link>
                                            : content.type == 2 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/videoLesson/${z}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--redOpacity) transition-colors duration-100">
                                                        <div className="bg-(--red) w-1 min-h-10"></div>
                                                        <VideocamOutlinedIcon sx={{ color: "var(--red)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                        <CheckCircleOutlineOutlinedIcon sx={{ color: "var(--green)"}}/>
                                                    </div>
                                                </Link>
                                            : content.type == 3 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/quizCompleted/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--yellowOpacity) transition-colors duration-100">
                                                        <div className="bg-(--yellow) w-1 min-h-10"></div>
                                                        <FeedOutlinedIcon sx={{ color: "var(--yellow)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                        <CheckCircleOutlineOutlinedIcon sx={{ color: "var(--green)"}}/>
                                                    </div>
                                                </Link>
                                            : content.type == 4 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/projectCompleted/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--greenOpacity) transition-colors duration-100">
                                                        <div className="bg-(--green) w-1 min-h-10"></div>
                                                        <FilePresentOutlinedIcon sx={{ color: "var(--green)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                        <CheckCircleOutlineOutlinedIcon sx={{ color: "var(--green)"}}/>
                                                    </div>
                                                </Link>
                                            : 
                                                <Link key={`${module.id}-${content.id}`} href={`/exam/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--purpleOpacity) transition-colors duration-100">
                                                        <div className="bg-(--purple) w-1 min-h-10"></div>
                                                        <ContentPasteOutlinedIcon sx={{ color: "var(--purple)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                        <CheckCircleOutlineOutlinedIcon sx={{ color: "var(--green)"}}/>
                                                    </div>
                                                </Link>
                                            }
                                        </>
                                    :
                                        <>
                                            {content.type == 1 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/textLesson/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--blueOpacity) transition-colors duration-100">
                                                        <div className="bg-(--blue) w-1 min-h-10"></div>
                                                        <FeedOutlinedIcon sx={{ color: "var(--blue)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : content.type == 2 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/videoLesson/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--redOpacity) transition-colors duration-100">
                                                        <div className="bg-(--red) w-1 min-h-10"></div>
                                                        <VideocamOutlinedIcon sx={{ color: "var(--red)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : content.type == 3 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/quiz/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--yellowOpacity) transition-colors duration-100">
                                                        <div className="bg-(--yellow) w-1 min-h-10"></div>
                                                        <FeedOutlinedIcon sx={{ color: "var(--yellow)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : content.type == 4 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/project/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--greenOpacity) transition-colors duration-100">
                                                        <div className="bg-(--green) w-1 min-h-10"></div>
                                                        <FilePresentOutlinedIcon sx={{ color: "var(--green)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : 
                                                <Link key={`${module.id}-${content.id}`} href={`/exam/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--purpleOpacity) transition-colors duration-100">
                                                        <div className="bg-(--purple) w-1 min-h-10"></div>
                                                        <ContentPasteOutlinedIcon sx={{ color: "var(--purple)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            }
                                        </>
                                    }
                                    </div>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    )}
                    {course.haveExam && !testExemple.completed ? (

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <h1 className="text-(--blue) font-bold mr-2">Módulo {course.modules.length + 1} -</h1>
                                <p className="text-(--text)">Prova Final</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Link href={`/exam/${testExemple.id}`}>
                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--purpleOpacity) transition-colors duration-100">
                                        <div className="bg-(--purple) w-1 min-h-10"></div>
                                        <ContentPasteOutlinedIcon sx={{ color: "var(--purple)"}}/>
                                        <h1 className="text-(--text)">{testExemple.title}</h1>
                                    </div>
                                </Link>
                            </AccordionDetails>
                        </Accordion>
                    ) : course.haveExam && testExemple.completed ? (
                        <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <h1 className="text-(--blue) font-bold mr-2">Módulo {course.modules.length + 1} -</h1>
                            <p className="text-(--text)">Prova Final</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Link href={`/examCompleted/${testExemple.id}`}>
                                <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--purpleOpacity) transition-colors duration-100">
                                    <div className="bg-(--purple) w-1 min-h-10"></div>
                                    <ContentPasteOutlinedIcon sx={{ color: "var(--purple)"}}/>
                                    <h1 className="text-(--text)">{testExemple.title}</h1>
                                </div>
                            </Link>
                        </AccordionDetails>
                    </Accordion>
                    ) : (
                        <>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default selectCourse;