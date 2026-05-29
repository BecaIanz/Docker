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
import imageLideranca from "../../../../public/image/lideranca.jpg";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts";
import * as React from 'react';

interface Competency {
  category: string;
  competenceLevel: number;
}

interface Course {
  title: string;
  category: string;
  difficulty: number;
  score?: number;
  progress?: number;
}

interface CollaboratorData {
  employeeId: number;
  name: string;
  email: string;
  competencies: Competency[];
  courses: {
    completed: Course[];
    inProgress: Course[];
    notStarted: Course[];
  };
  averageScore: number;
  totalCourses: number;
  coursesCompleted: number;
}

const Collaborator = () => {
  const router = useRouter();

  // Dados mockados do colaborador
  const collaboratorData: CollaboratorData = {
    employeeId: 21,
    name: "Ana Costa",
    email: "ana@empresa.com",
    competencies: [
      { category: "Programação", competenceLevel: 85 },
      { category: "UX/UI", competenceLevel: 60 },
      { category: "Gestão", competenceLevel: 45 }
    ],
    courses: {
      completed: [
        {
          title: "Banco de Dados",
          category: "Programação",
          difficulty: 2,
          score: 92
        }
      ],
      inProgress: [
        {
          title: "Gestão de Projetos",
          category: "Gestão",
          difficulty: 2,
          progress: 40
        }
      ],
      notStarted: [
        {
          title: "Introdução ao Figma",
          category: "UX/UI",
          difficulty: 1
        }
      ]
    },
    averageScore: 87,
    totalCourses: 7,
    coursesCompleted: 4
  };

  // Preparar dados para os gráficos
  const competencyData = collaboratorData.competencies.map(item => ({
    label: item.category,
    value: item.competenceLevel
  }));

  const courseStatusData = [
    {
      label: "Concluídos",
      value: collaboratorData.courses.completed.length
    },
    {
      label: "Em andamento",
      value: collaboratorData.courses.inProgress.length
    },
    {
      label: "Não iniciados",
      value: collaboratorData.courses.notStarted.length
    }
  ];

  return (
    <>
      <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} manager />
      <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
        {/* Header */}
        <div className="flex flex-col gap-1 items-center p-1 md:items-start">
          <h1 className="md:text-2xl text-xl font-bold text-(--text)">{collaboratorData.name}</h1>
          <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">
            Detalhes do desempenho e progresso
          </p>
        </div>

        {/* Info Cards */}
        <div className="flex bg-(--card) border border-(--stroke) flex-col p-5 rounded-2xl gap-4 shadow-(--shadow)">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
              <div className="flex flex-col gap-0.5">
                <p className="text-(--gray)">ID do Funcionário</p>
                <h1 className="font-bold text-(--text)">{collaboratorData.employeeId}</h1>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
              <div className="flex flex-col gap-0.5">
                <p className="text-(--gray)">Email</p>
                <h1 className="font-bold text-(--text)">{collaboratorData.email}</h1>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
              <div className="flex flex-col gap-0.5">
                <p className="text-(--gray)">Score Médio</p>
                <h1 className="font-bold text-(--text)">{collaboratorData.averageScore}</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Competencies Section */}
        <div className="flex flex-col gap-4">
          <h1 className="md:text-2xl text-xl font-bold text-(--text)">Competências</h1>
          <div className="flex gap-3 flex-col w-full bg-(--card) border border-(--stroke) p-4 rounded-2xl shadow-(--shadow)">
            <BarChart
              xAxis={[{ 
                data: competencyData.map(item => item.label),
                scaleType: 'band' 
              }]}
              series={[{ 
                data: competencyData.map(item => item.value),
                color: 'var(--aquamarine)' 
              }]}
              height={300}
            />
          </div>
        </div>

        {/* Courses Section */}
        <div className="flex flex-col gap-4">
          <h1 className="md:text-2xl text-xl font-bold text-(--text)">Cursos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Course Status */}
            <div className="flex gap-3 flex-col w-full bg-(--card) border border-(--stroke) p-4 rounded-2xl shadow-(--shadow)">
              <h2 className="text-lg font-bold text-(--text)">Status dos Cursos</h2>
              <PieChart
                series={[{
                  data: courseStatusData.map((item, index) => ({
                    id: index,
                    value: item.value,
                    label: item.label
                  }))
                }]}
                height={300}
              />
            </div>

            {/* Course Progress */}
            <div className="flex gap-3 flex-col w-full bg-(--card) border border-(--stroke) p-4 rounded-2xl shadow-(--shadow)">
              <h2 className="text-lg font-bold text-(--text)">Progresso nos Cursos</h2>
              {collaboratorData.courses.inProgress.map((course, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-(--text)">{course.title}</span>
                    <span className="text-(--text)">{course.progress}%</span>
                  </div>
                  <LinearProgress 
                    variant="determinate" 
                    value={course.progress} 
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'var(--lightGray)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'var(--aquamarine)'
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Lists */}
        <div className="flex flex-col gap-8">
          {/* Completed Courses */}
          <div className="flex flex-col gap-4">
            <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
              <h1 className="md:text-2xl text-xl font-bold text-(--text) flex items-center gap-2">
                <CheckCircleOutlineOutlinedIcon /> Cursos Concluídos
              </h1>
              {collaboratorData.courses.completed.length > 0 && (
                <CuteButton 
                  text="Ver todos" 
                  icon={ArrowForwardIcon} 
                  onClick={() => router.push(ROUTES.courses)}
                />
              )}
            </div>
            <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 gap-4">
              {collaboratorData.courses.completed.length > 0 ? (
                collaboratorData.courses.completed.map((course, index) => (
                  <CardCourse
                    key={index}
                    id={index}
                    image={imageLideranca}
                    title={course.title}
                    description={`Nota: ${course.score} | ${course.category}`}
                    progress={100}
                    rating={4.7}
                    participants={128}
                    difficulty={course.difficulty}
                  />
                ))
              ) : (
                <p className="text-(--gray) col-span-full">Nenhum curso concluído</p>
              )}
            </div>
          </div>

          {/* In Progress Courses */}
          <div className="flex flex-col gap-4">
            <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
              <h1 className="md:text-2xl text-xl font-bold text-(--text) flex items-center gap-2">
                <ClassOutlinedIcon /> Cursos em Andamento
              </h1>
              {collaboratorData.courses.inProgress.length > 0 && (
                <CuteButton 
                  text="Ver todos" 
                  icon={ArrowForwardIcon} 
                  onClick={() => router.push(ROUTES.courses)}
                />
              )}
            </div>
            <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 gap-4">
              {collaboratorData.courses.inProgress.length > 0 ? (
                collaboratorData.courses.inProgress.map((course, index) => (
                  <CardCourse
                    key={index}
                    id={index}
                    image={imageLideranca}
                    title={course.title}
                    description={`Progresso: ${course.progress}% | ${course.category}`}
                    progress={course.progress || 0}
                    rating={4.7}
                    participants={128}
                    difficulty={course.difficulty}
                  />
                ))
              ) : (
                <p className="text-(--gray) col-span-full">Nenhum curso em andamento</p>
              )}
            </div>
          </div>

          {/* Not Started Courses */}
          <div className="flex flex-col gap-4">
            <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
              <h1 className="md:text-2xl text-xl font-bold text-(--text) flex items-center gap-2">
                <ClassOutlinedIcon /> Cursos Não Iniciados
              </h1>
              {collaboratorData.courses.notStarted.length > 0 && (
                <CuteButton 
                  text="Ver todos" 
                  icon={ArrowForwardIcon} 
                  onClick={() => router.push(ROUTES.courses)}
                />
              )}
            </div>
            <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 gap-4">
              {collaboratorData.courses.notStarted.length > 0 ? (
                collaboratorData.courses.notStarted.map((course, index) => (
                  <CardCourse
                    key={index}
                    id={index}
                    image={imageLideranca}
                    title={course.title}
                    description={course.category}
                    progress={0}
                    rating={4.7}
                    participants={128}
                    difficulty={course.difficulty}
                  />
                ))
              ) : (
                <p className="text-(--gray) col-span-full">Nenhum curso não iniciado</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collaborator;