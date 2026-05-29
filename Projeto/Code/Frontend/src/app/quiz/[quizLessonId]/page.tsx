"use client"

import { BackButton } from "@/src/components/backButton";
import { Menu } from "@/src/components/menu";
import { QuizClient } from "@/src/components/quizClient";
import { api } from "@/src/constants/api";
import { use, useEffect, useState } from "react";

interface IQuiz{
  params: {
    courseId: string;
  };
}

const quizLessonExemple = {
  id: "",
  title: "",
  questions: [
    {
      id: "",
      Description: "",
      alternatives: [
        { id: "", description: "", isCorrect: false },
      ]
    }
  ]
}


const quiz = ({ params } : { params: Promise<{ quizLessonId: string }> }) => {
    const token = sessionStorage.getItem("Token");
    const { quizLessonId } = use(params);

    const [exercise, setExercise] = useState(quizLessonExemple);

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await api.get(`/exercises/${quizLessonId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setExercise(response.data);
            } catch (error) {
                console.error("Erro ao buscar Lesson:", error);
            }
        };
        

    
        fetchExercise();
        }, []);

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex gap-8 items-center w-full p-1">
                    <BackButton/>
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">{exercise.title}</h1>
                </div>

                {/* Details */}
                <QuizClient quizId={quizLessonId} isExam></QuizClient>

            </div>
        </>
    )
}

export default quiz;