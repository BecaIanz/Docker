import { BackButton } from "@/src/components/backButton";
import { Menu } from "@/src/components/menu";
import { PdfUploader } from "@/src/components/pdfUploarder";

interface IProject{
  params: {
    courseId: string;
  };
}


const project = async ({ params } : IProject) => {
    const { courseId } = params;

    const projectExemple = {
        id: 108,
        type: 3,
        title: "Projeto usando github",
        courseId: 5,
        moduleId: 1,
        activityType: 4,
        completed: false,
        description: "Nesta atividade prática, os alunos deverão utilizar o Git para realizar o versionamento de um projeto simples. O objetivo é aplicar os principais comandos do Git em um fluxo de trabalho real, compreendendo como funciona a criação de repositórios locais e remotos, gerenciamento de branches, realização de commits, merge, resolução de conflitos e envio de alterações para o GitHub. O aluno deverá iniciar criando uma pasta local chamada 'atividade-git' e dentro dela, adicionar um arquivo README.md com uma breve descrição do projeto. Em seguida, será necessário inicializar o repositório Git com o comando git init, realizar o primeiro commit com o README.md e criar um novo branch chamado 'nova-funcionalidade', onde deverá ser criado um arquivo adicional explicando uma funcionalidade fictícia do sistema. O aluno deve realizar pelo menos dois commits nesse branch. Depois disso, deve retornar para a branch principal (main) e modificar o README.md, de forma proposital, para gerar um possível conflito no momento do merge. Com isso feito, o aluno deverá tentar realizar o merge do branch 'nova-funcionalidade' com o main, resolvendo manualmente qualquer conflito que ocorra e finalizando com um commit da resolução. Após essa parte, será necessário criar um repositório privado no GitHub com o mesmo nome ('atividade-git'), conectá-lo ao repositório local por meio do comando git remote add origin e fazer o envio (push) das branches main e nova-funcionalidade para o repositório remoto. Para comprovar a realização da atividade, o aluno deverá elaborar um relatório em formato PDF contendo imagens (prints de tela) dos comandos executados, explicações breves sobre o que foi feito em cada etapa, o link do repositório no GitHub, além de um pequeno parágrafo sobre eventuais dificuldades encontradas durante a execução e como foram resolvidas. O arquivo PDF deve ser nomeado como 'atividade-git-nome-sobrenome.pdf' e enviado na plataforma dentro do prazo estipulado. É importante ressaltar que não serão aceitos repositórios públicos, arquivos sem imagens ou explicações incompletas. Trabalhos copiados ou que não apresentem o processo corretamente poderão ser desconsiderados. O foco é garantir que cada aluno tenha a experiência prática completa com o Git, entendendo não só os comandos, mas também a lógica por trás de cada etapa do versionamento."
    }

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex gap-8 items-center w-full p-1">
                    <BackButton/>
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">{projectExemple.title}</h1>
                </div>
                <div className="flex w-full flex-col gap-5">
                    <p className="text-(--text) self-center">{projectExemple.description}</p>
                    <h1 className="text-xl font-bold text-(--text) self-center">Envie seu PDF</h1>
                    <PdfUploader pdfId={1}/>
                </div>


            </div>
        </>
    )
}

export default project;