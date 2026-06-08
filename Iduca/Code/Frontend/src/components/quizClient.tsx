"use client";

import { useEffect, useState } from "react";
import { NextLessonButton } from "./nextLessonButton";
import { CuteButton } from "./cuteButton";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/src/constants/routes";
import { api } from "@/src/constants/api";

interface IQuizClient {
  quizId: string;
  isExam?: boolean;
}





const quizLessonExemple = {
  id: "",
  title: "",
  questions: [
    {
      id: "",
      description: "",
      alternatives: [
        { id: "", description: "", isCorrect: false },
      ]
    }
  ]
}
export const QuizClient = ({ quizId, isExam }: IQuizClient) => {
  const router = useRouter();

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };


  const token = sessionStorage.getItem("Token");

    const [exercise, setExercise] = useState(quizLessonExemple);

    useEffect(() => {
      const fetchExercise = async () => {
          try {
              const response = await api.get(`/exercises/${quizId}`,
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      }
                  }
              );
              console.log(response.data)
              setExercise(response.data);
          } catch (error) {
              console.error("Erro ao buscar Lesson:", error);
          }
      };
      

  
      fetchExercise();
      }, []);

  return (
    <div className="flex flex-col md:p-10 p-3 rounded-2xl gap-10 items-center">
        {/* Questões */}
        <div className="flex flex-col w-full gap-6">
            {exercise.questions.map((q, index) => (
            <div key={q.id} className="bg-(--card) shadow-(--shadow) rounded-xl p-6">
                <p className="text-lg mb-4 text-(--text)">{index + 1}. {q.description}</p>
                <ul className="flex flex-col gap-2">
                {q.alternatives.map((alternative, index) => {
                    const isSelected = answers[q.id] === alternative.id;
                    return (
                    <li
                        key={alternative.id}
                        onClick={() => handleSelect(q.id, alternative.id)}
                        className={`
                        flex px-4 py-2 rounded-md cursor-pointer transition duration-300
                        ${isSelected ? "bg-(--hoverWhite)" : "bg-(--lightGray)"}
                        hover:bg-(--hoverWhite)
                        `}
                    >
                        <span className="font-bold mr-2 text-(--text)">{String.fromCharCode(index+65).toUpperCase()}.</span>
                        <p className="text-(--text)">{alternative.description}</p>
                    </li>
                    );
                })}
                </ul>
            </div>
            ))}
        </div>

        {/* Só pra eu testar se tava pegando as respostas mesmo,ta funfando */}
        {/* <pre className="bg-(--lightGray) p-4 rounded text-(--text) w-full max-w-2xl overflow-x-auto">
            {JSON.stringify(answers, null, 2)}
        </pre> */}

        {/* Botão de próxima aula */}
        {/* {!isExam ? 
          <div className="self-center">
              <CuteButton text="Encerrar Prova" icon={CheckCircleOutlineIcon} onClick={() => (router.push(`/courses/${projectExemple.courseId}`))}/>
          </div>
        :
          <div className="self-center">
              <NextLessonButton href={nextLessonHref()} />
          </div>
        } */}
    </div>
  );
};
