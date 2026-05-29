import { BackButton } from "@/src/components/backButton";
import { Menu } from "@/src/components/menu";
import { NextLessonButton } from "@/src/components/nextLessonButton";
import { QuizClient } from "@/src/components/quizClient";
import { QuizClientCompleted } from "@/src/components/quizClientCompleted";

interface IExamCompleted{
  params: {
    courseId: string;
  };
}


const examCompletedExemple = {
  id: 1,
  title: "Prova Final",
  questions: [
    {
      id: 1,
      question: "Qual é o comando para iniciar um repositório Git?",
      options: [
        { id: 1, text: "git start", alternative: "a" },
        { id: 2, text: "git init", alternative: "b" },
        { id: 3, text: "git begin", alternative: "c" }
      ]
    },
    {
      id: 2,
      question: "Qual pasta armazena o histórico de commits de um repositório Git?",
      options: [
        { id: 1, text: ".git/config", alternative: "a" },
        { id: 2, text: ".gitignore", alternative: "b" },
        { id: 3, text: ".git", alternative: "c" }
      ]
    },
    {
      id: 3,
      question: "Imagine que você está trabalhando em um projeto com uma equipe de várias pessoas desenvolvedoras, e todas estão colaborando usando Git e GitHub. Qual comando você deve utilizar para garantir que sua cópia local do projeto esteja atualizada com a versão mais recente que está no repositório remoto, antes de iniciar uma nova funcionalidade?",
      options: [
        { id: 1, text: "git pull", alternative: "a" },
        { id: 2, text: "git update", alternative: "b" },
        { id: 3, text: "git merge", alternative: "c" }
      ]
    },
    {
      id: 4,
      question: "Qual comando usamos para verificar o estado atual do repositório?",
      options: [
        { id: 1, text: "git status", alternative: "a" },
        { id: 2, text: "git check", alternative: "b" },
        { id: 3, text: "git log", alternative: "c" }
      ]
    },
    {
      id: 5,
      question: "Qual desses arquivos é usado para ignorar arquivos no Git?",
      options: [
        { id: 1, text: ".gitignore", alternative: "a" },
        { id: 2, text: ".gitconfig", alternative: "b" },
        { id: 3, text: ".ignore", alternative: "c" }
      ]
    }
  ],
  nextLesson: {
    id: 102,
    type: 4,
    title: "Instalando o Git"
  }
}


const examCompleted = async ({ params } : IExamCompleted) => {
    const { courseId } = params;

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex gap-8 items-center w-full p-1">
                    <BackButton/>
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">{examCompletedExemple.title}</h1>
                </div>

                {/* Details */}
                <QuizClientCompleted quizId={1}></QuizClientCompleted>

            </div>
        </>
    )
}

export default examCompleted;