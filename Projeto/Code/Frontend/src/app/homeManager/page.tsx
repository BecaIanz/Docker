"use client";

import { Menu } from "@/src/components/menu";
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import LinearProgress from "@mui/material/LinearProgress";
import { CuteButton } from "@/src/components/cuteButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/src/constants/routes";
import { CardCourse } from "@/src/components/cardCourse";
import imageLideranca from "../../../public/image/lideranca.jpg";
import { CalendarComp } from "@/src/components/calendar";
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { api } from "@/src/constants/api";

interface ICardCourse {
    image: string;
    title: string;
    description: string;
    progress: number;
    rating: number;
    participants: number;
    difficulty: number;
}



const HomeManager = () => {
    const token = sessionStorage.getItem("Token");

    const [username, setUsername] = useState();
    useEffect(() => {
        const fetchHome = async () => {
            try {
                const response = await api.get("/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setUsername(response.data.name);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        };
        fetchHome();
        }, []);

    const router = useRouter();

    const data = [
        {
            label: "Programação",
            value: 48
        },
        {
            label: "Marketing",
            value: 95
        },
        {
            label: "Saúde",
            value: 80
        },
        {
            label: "Design",
            value: 91
        },
        {
            label: "Mecânica",
            value: 52
        },
        {
            label: "Gestão",
            value: 64
        },
        {
            label: "Comunicação",
            value: 43
        },
        {
            label: "Eletrônica",
            value: 18
        },
    ]

    const data2 = [
        {
            label: "Concluído",
            value: 15
        },
        {
            label: "Em andamento",
            value: 40
        },
        {
            label: "Não iniciado",
            value: 5
        }
    ]

    const labels = data.map((item) => item.label);
    const values = data.map((item) => item.value);


    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} manager></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">Bem vindo(a), {username}</h1>
                    <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Acompanhe o progresso geral dos seus colaboradores!</p>
                </div>

                {/* Card progress */}
                <div className="flex bg-(--card) border border-(--stroke) flex-col p-5 rounded-2xl gap-4 shadow-(--shadow)">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-bold text-(--text)">Progresso Geral</h1>
                        <CuteButton text="Ver todos" icon={ArrowForwardIcon} onClick={() => router.push(ROUTES.collaborators)}></CuteButton>
                    </div>
                    <div className="flex justify-between gap-3 md:flex-row flex-col">
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-(--gray)">Total de colaboradores</p>
                                <h1 className="font-bold text-(--text)">4</h1>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-(--gray)">Total de cursos</p>
                                <h1 className="font-bold text-(--text)">4</h1>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-(--gray)">Total de Inscrições</p>
                                <h1 className="font-bold text-(--text)">4</h1>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-(--gray)">Taxa de Conclusão</p>
                                <h1 className="font-bold text-(--text)">36%</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course */}
                <div className="flex flex-col gap-4">
                    <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
                        <h1 className="md:text-2xl text-xl font-bold text-(--text)">Desempenho em Cursos</h1>
                        <CuteButton text="Ver todos" icon={ArrowForwardIcon} onClick={() => router.push(ROUTES.coursesManager)}></CuteButton>
                    </div>
                    <div className="grid grid-cols-1 place-items-center lg:grid-cols-2 lg:gap-6 gap-4">
                        <div className="flex gap-3 flex-col w-full h-full bg-(--card) min-h-96 border border-(--stroke) p-4 rounded-2xl shadow-(--shadow)">
                            <h1 className="text-xl font-bold text-(--text)">Desempenho por categoria</h1>
                            <BarChart
                                xAxis={[{ data: labels }]}
                                series={[{ data: values, color: 'var(--aquamarine)' }]}
                                sx={{ width: "100%" }}
                                height={330}
                            />
                        </div>
                        <div className="flex gap-3 flex-col w-full h-full bg-(--card) min-h-96 border border-(--stroke) p-4 rounded-2xl shadow-(--shadow)">
                            <h1 className="text-xl font-bold text-(--text)">Taxa de Conclusão de Curso</h1>
                                <PieChart
                                    series={[
                                        {
                                        data: data2.map((item, index) => ({
                                            id: index,
                                            value: item.value,
                                            label: item.label
                                        }))
                                        }
                                    ]}
                                    height={330}
                                />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomeManager;