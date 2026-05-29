import { BackButton } from "@/src/components/backButton";
import { Menu } from "@/src/components/menu";
import { NextLessonButton } from "@/src/components/nextLessonButton";

interface IVideoLesson{
  params: {
    courseId: string;
  };
}

const videoLessonExemple = {
    id: 101,
    type: 1,
    title: "Introduction to Git",
    courseId: 5,
    moduleId: 1,
    completed: true,
    content: {
        type: 2,
        value: "https://www.youtube.com/embed/6xHZJVnKkSs?si=XxyOkZBkKXVdRA11"
    },
    nextLesson: {
        id: 102,
        type: 3,
        title: "Installing Git"
    }
}

const nextLessonHref = () => {
    const nextLesson = videoLessonExemple.nextLesson;
    
    switch(nextLesson.type) {
      case 1:
        return `/textLesson/${nextLesson.id}`;
      case 2:
        return `/videoLesson/${nextLesson.id}`;
      case 3:
        return `/quiz/${nextLesson.id}`;
      case 4:
        return `/project/${nextLesson.id}`;
      case 5:
        return `/exam/${nextLesson.id}`;
      default:
        return '/';

    }
}


const videoLesson = async ({ params } : IVideoLesson) => {
    const { courseId } = params;

    const projectExemple = {
        id: 1,
        title: "Prova Final",
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
                <div className="flex gap-8 items-center w-full p-1">
                    <BackButton/>
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">{videoLessonExemple.title}</h1>
                </div>

                {/* Details */}
                <div className="flex flex-col md:p-10 p-3 bg-(--card) shadow-(--shadow) rounded-2xl gap-10 items-center">
                    <div className="relative w-full pb-[56.25%]">
                        <iframe
                            src={`${videoLessonExemple.content.value}`}
                            title="YouTube video player"
                            className="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="self-center">
                        <NextLessonButton href={nextLessonHref()}></NextLessonButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default videoLesson;