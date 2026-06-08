"use client";

import { Menu } from "@/src/components/menu";
import { CuteButton } from "@/src/components/cuteButton";
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/src/constants/routes";
import { useEffect, useState } from 'react';
import { NotifyModal } from "@/src/components/notifyModal";
import { TextField, Button, DialogActions, DialogContent, Box, Select, MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { api } from "@/src/constants/api";

const CATEGORIES = [""];

const AddCourse = () => {
    const token = sessionStorage.getItem("Token");
    const router = useRouter();
    const [openModuleModal, setOpenModuleModal] = useState(false);
    const [openContentModal, setOpenContentModal] = useState(false);
    const [openExamModal, setOpenExamModal] = useState(false);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [categories, setCategories] = useState([{id: '', name: ''}]);
    
    // Estados para atividade escrita
    const [textContent, setTextContent] = useState("");
    const [textContentBlocks, setTextContentBlocks] = useState<Array<{
        id: number;
        type: 'text' | 'image';
        content: string;
    }>>([]);

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
    
    // Estados para atividade múltipla escolha
    const [activityQuestions, setActivityQuestions] = useState<Array<{
        id: number;
        question: string;
        options: Array<{ id: string; text: string }>;
        correctAnswer: string;
    }>>([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentOptions, setCurrentOptions] = useState<Array<{ id: string; text: string }>>([
        { id: "a", text: "" },
        { id: "b", text: "" },
        { id: "c", text: "" }
    ]);
    const [correctAnswer, setCorrectAnswer] = useState(""); // Adicione esta linha
    
    // Estados para atividade PDF
    const [pdfDescription, setPdfDescription] = useState("");
    
    // Estados para a prova do curso
    const [examData, setExamData] = useState({
        title: "",
        description: "",
        questions: [] as Array<{
            id: number;
            question: string;
            options: Array<{ id: string; text: string }>;
            correctAnswer: string;
        }>
    });
    const [currentExamQuestion, setCurrentExamQuestion] = useState("");
    const [currentExamOptions, setCurrentExamOptions] = useState<Array<{ id: string; text: string }>>([
        { id: "a", text: "" },
        { id: "b", text: "" },
        { id: "c", text: "" },
        { id: "d", text: "" }
    ]);
    const [correctExamAnswer, setCorrectExamAnswer] = useState("");

    // Dados do curso
    const [courseData, setCourseData] = useState({
        title: "",
        image: "",
        description: "",
        difficulty: 1,
        category: "",
        duration: "00:00:00",
        haveExam: false,
        exam: null as any,
        modules: [] as Array<{
            title: string;
            description: string;
            content: Array<any>;
        }>
    });

    // Dados temporários para novo módulo/conteúdo
    const [newModule, setNewModule] = useState({
        title: "",
        description: "",
    });

    const [newContent, setNewContent] = useState({
        type: 1,
        title: "",
        content: [] as Array<any>,
        description: ""
    });

    // Manipuladores de curso
    const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>) => {
        const { name, value } = e.target;
        
        // A lógica para checkbox é um pouco diferente, então podemos tratar separadamente
        // ou manter o tratamento genérico se o `value` do checkbox for o que você precisa.
        // O seu tratamento atual já é bom.
        if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
            setCourseData(prev => ({
                ...prev,
                [name]: e.target.name
            }));
        } else {
            setCourseData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Manipuladores de módulo
    const handleAddModule = () => {
        if (!newModule.title.trim()) return;
        
        setCourseData(prev => ({
            ...prev,
            modules: [...prev.modules, {
                ...newModule,
                content: []
            }]
        }));
        
        setNewModule({ title: "", description: "" });
        setOpenModuleModal(false);
    };

    const handleRemoveModule = (index: number) => {
        setCourseData(prev => ({
            ...prev,
            modules: prev.modules.filter((_, i) => i !== index)
        }));
    };

    // Manipuladores de conteúdo
    const handleAddContent = () => {
        if (!newContent.title.trim()) return;
        
        let contentToAdd = {...newContent};
        
        // Tratamento específico para cada tipo de conteúdo
        switch(contentToAdd.type) {
            case 1: // Aula escrita
                contentToAdd.content = [...textContentBlocks];
                break;
            case 3: // Atividade múltipla escolha
                contentToAdd.content = [...activityQuestions];
                break;
            case 4: // Atividade PDF
                contentToAdd.description = pdfDescription;
                break;
        }
        
        const updatedModules = [...courseData.modules];
        updatedModules[currentModuleIndex].content.push(contentToAdd);
        
        setCourseData(prev => ({
            ...prev,
            modules: updatedModules
        }));
        
        // Resetar estados
        setNewContent({ type: 1, title: "", content: [], description: "" });
        setTextContentBlocks([]);
        setActivityQuestions([]);
        setPdfDescription("");
        setOpenContentModal(false);
    };

    const handleRemoveContent = (moduleIndex: number, contentIndex: number) => {
        const updatedModules = [...courseData.modules];
        updatedModules[moduleIndex].content = updatedModules[moduleIndex].content.filter((_, i) => i !== contentIndex);
        
        setCourseData(prev => ({
            ...prev,
            modules: updatedModules
        }));
    };

    // Manipuladores para atividades de múltipla escolha
    const handleAddQuestion = () => {
        if (!currentQuestion.trim() || !correctAnswer) return;
        
        const newQuestion = {
            id: activityQuestions.length + 1,
            question: currentQuestion,
            options: currentOptions.filter(opt => opt.text.trim() !== ""),
            correctAnswer: correctAnswer
        };
        
        setActivityQuestions([...activityQuestions, newQuestion]);
        setCurrentQuestion("");
        setCurrentOptions([
            { id: "a", text: "" },
            { id: "b", text: "" },
            { id: "c", text: "" }
        ]);
        setCorrectAnswer("");
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...currentOptions];
        updatedOptions[index].text = value;
        setCurrentOptions(updatedOptions);
    };

    // Manipuladores para blocos de texto/imagem
    const handleAddTextBlock = (type: 'text' | 'image') => {
        if (type === 'text' && !textContent.trim()) return;
        
        const newBlock = {
            id: textContentBlocks.length + 1,
            type,
            content: textContent
        };
        
        setTextContentBlocks([...textContentBlocks, newBlock]);
        setTextContent("");
    };

    const handleRemoveTextBlock = (id: number) => {
        setTextContentBlocks(textContentBlocks.filter(block => block.id !== id));
    };

    // Manipuladores para a prova do curso
    const handleAddExamQuestion = () => {
        if (!currentExamQuestion.trim() || !correctExamAnswer) return;
        
        const newQuestion = {
            id: examData.questions.length + 1,
            question: currentExamQuestion,
            options: currentExamOptions.filter(opt => opt.text.trim() !== ""),
            correctAnswer: correctExamAnswer
        };
        
        setExamData({
            ...examData,
            questions: [...examData.questions, newQuestion]
        });
        
        // Resetar campos
        setCurrentExamQuestion("");
        setCurrentExamOptions([
            { id: "a", text: "" },
            { id: "b", text: "" },
            { id: "c", text: "" },
            { id: "d", text: "" }
        ]);
        setCorrectExamAnswer("");
    };

    const handleExamOptionChange = (index: number, value: string) => {
        const updatedOptions = [...currentExamOptions];
        updatedOptions[index].text = value;
        setCurrentExamOptions(updatedOptions);
    };

    const handleSaveExam = () => {
        if (!examData.title.trim() || examData.questions.length === 0) {
            alert("Adicione um título e pelo menos uma questão para a prova");
            return;
        }
        
        setCourseData(prev => ({
            ...prev,
            exam: examData
        }));
        
        setOpenExamModal(false);
    };

    // Envio do formulário
    const handleSubmit = async () => {
        // Validação básica
        if (!courseData.title.trim() || !courseData.category || courseData.modules.length === 0) {
            alert("Preencha todos os campos obrigatórios e adicione pelo menos um módulo");
            return;
        }

        // Validação da prova se o curso tiver prova
        if (courseData.haveExam && !courseData.exam) {
            alert("Este curso requer uma prova. Por favor, adicione a prova antes de enviar.");
            return;
        }

        try {
            const p = 
                {
                    Title:          courseData.title,
                    Image:          courseData.image,
                    Categories:     [courseData.category],
                    Description:    courseData.description,
                    Difficulty:     courseData.difficulty,
                    Duration:       courseData.duration,
                    
                    Exam:           courseData.exam != null || courseData.exam != undefined ? {
                        Title:          courseData.exam.title,
                        Description:    courseData.exam.description,
                        Questions:      courseData.exam.questions.map((question) => {
                            return{
                                Description: question.question,
                                Alternatives: question.options.map((alternative) => {
                                    return{
                                        Description: alternative.text,
                                        IsCorrect:   alternative.id == question.correctAnswer
                                    }
                                })
                            };
                        })
                    } : null,

                    Modules:        courseData.modules.map((module) => {
                        return{
                            Name:           module.title,
                            Description:    module.description,

                            Lessons:        module.content.filter((content) => content.type == 1).map((contentLesosn) => {
                                return {
                                    Name:           contentLesosn.title,
                                    Description:    contentLesosn.description,
                                    Contents:       contentLesosn.content.map((content) => {
                                        return {
                                            Title:          "",
                                            Description:    content.type == "text" ? content.content : null,
                                            Image:          content.type == "image" ? content.content : null
                                        }
                                    })
                                }
                            }),

                            Exercises:      module.content.filter((content) => content.type == 3).map((exercise) => {
                                return {
                                    Title:          exercise.title,
                                    Description:    exercise.description,
                                    Date: exercise.date ?? new Date().toISOString(),
                                    
                                    Questions:      exercise.content.map((question) => {
                                        return {
                                            Description:    question.question,
                                            Alternatives:   question.options.map((alternative) => {
                                                return {
                                                    Description: alternative.text,
                                                    IsCorrect:   alternative.id == question.correctAnswer
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            
                console.log(p)


            // Aqui você faria a chamada API para criar o curso
            const response = await api.post('/admin/course', p,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            
            const modules = courseData.modules.map((m,i) => {
                return {
                    name : m.title,
                    description : m.description,
                    index : i
                }
            })

            
            // Simulando resposta da API
            alert("Curso criado com sucesso!");
            router.push(ROUTES.coursesAdmin);
            
        } catch (error) {
            console.error("Erro ao criar curso:", error);
            alert("Ocorreu um erro ao criar o curso");
        }
    };


    // Renderizar o formulário apropriado para o tipo de conteúdo selecionado
    const renderContentForm = () => {
        switch (newContent.type) {
            case 1: // Aula Escrita
                return (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Conteúdo do Texto"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        
                        <div className="flex gap-2 mb-4">
                            <Button 
                                variant="outlined" 
                                onClick={() => handleAddTextBlock('text')}
                                disabled={!textContent.trim()}
                            >
                                Adicionar Parágrafo
                            </Button>
                            <Button 
                                variant="outlined" 
                                onClick={() => handleAddTextBlock('image')}
                                disabled={!textContent.trim()}
                            >
                                Adicionar Imagem (URL)
                            </Button>
                        </div>
                        
                        {textContentBlocks.length > 0 && (
                            <Box sx={{ borderTop: '1px solid #ddd', pt: 2 }}>
                                <h5 className="font-bold text-(--text) mb-2">Blocos de Conteúdo</h5>
                                <div className="flex flex-col gap-3">
                                    {textContentBlocks.map((block) => (
                                        <div key={block.id} className="border border-(--stroke) rounded p-3 relative">
                                            {block.type === 'text' ? (
                                                <p>{block.content}</p>
                                            ) : (
                                                <div>
                                                    <p className="text-sm text-gray-500">Imagem:</p>
                                                    <img src={block.content} alt="Imagem do conteúdo" className="max-w-full h-auto" />
                                                </div>
                                            )}
                                            <Button
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleRemoveTextBlock(block.id)}
                                                color="error"
                                                sx={{ position: 'absolute', top: 8, right: 8 }}
                                            >
                                                Remover
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </Box>
                        )}
                    </Box>
                );
            
            case 3: // Atividade múltipla escolha
                return (
                    <Box sx={{ mt: 2 }}>
                        <h4 className="font-bold text-(--text) mb-2">Perguntas da Atividade</h4>
                        
                        <TextField
                            label="Pergunta *"
                            variant="outlined"
                            fullWidth
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        
                        <h5 className="font-bold text-(--text) mb-2">Opções de Resposta</h5>
                        {currentOptions.map((option, index) => (
                            <div key={option.id} className="flex items-center gap-2 mb-2">
                                <TextField
                                    label={`Opção ${option.id.toUpperCase()}`}
                                    variant="outlined"
                                    fullWidth
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={correctAnswer === option.id}
                                            onChange={() => setCorrectAnswer(option.id)}
                                            color="primary"
                                        />
                                    }
                                    label="Correta"
                                />
                            </div>
                        ))}
                        
                        <Button 
                            onClick={handleAddQuestion}
                            variant="outlined"
                            disabled={!currentQuestion.trim() || !correctAnswer || 
                                    currentOptions.every(opt => !opt.text.trim())}
                            sx={{ mb: 2 }}
                        >
                            Adicionar Pergunta
                        </Button>
                        
                        {activityQuestions.length > 0 && (
                            <Box sx={{ borderTop: '1px solid #ddd', pt: 2 }}>
                                <h5 className="font-bold text-(--text) mb-2">Perguntas Adicionadas</h5>
                                <ul>
                                    {activityQuestions.map((q, idx) => (
                                        <li key={idx} className="mb-2 border border-gray-200 rounded p-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <strong>{q.question}</strong>
                                                    <ul className="list-disc ml-5 mt-1">
                                                        {q.options.map(opt => (
                                                            <li key={opt.id} className={q.correctAnswer === opt.id ? "font-bold text-green-600" : ""}>
                                                                {opt.text} {q.correctAnswer === opt.id && "(Resposta Correta)"}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <Button
                                                    size="small"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => setActivityQuestions(activityQuestions.filter((_, i) => i !== idx))}
                                                    color="error"
                                                >
                                                    Remover
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                    </Box>
                );
            
            case 4: // Atividade PDF
                return (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Descrição da Atividade *"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={pdfDescription}
                            onChange={(e) => setPdfDescription(e.target.value)}
                        />
                    </Box>
                );
            
            default:
                return null;
        }
    };

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} admin />
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Cabeçalho */}
                <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">Criar Novo Curso</h1>
                    <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">
                        Preencha os detalhes do curso e adicione os módulos e conteúdos
                    </p>
                </div>

                {/* Formulário do Curso */}
                <div className="flex flex-col gap-6 bg-(--card) border border-(--stroke) p-6 rounded-2xl shadow-(--shadow)">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField
                            name="title"
                            label="Título do Curso *"
                            variant="outlined"
                            fullWidth
                            value={courseData.title}
                            onChange={handleCourseChange}
                        />
                        <TextField
                            name="image"
                            label="URL da Imagem"
                            variant="outlined"
                            fullWidth
                            value={courseData.image}
                            onChange={handleCourseChange}
                        />
                    </div>

                    <TextField
                        name="description"
                        label="Descrição do Curso *"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={courseData.description}
                        onChange={handleCourseChange}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormControl fullWidth>
                            <InputLabel>Dificuldade *</InputLabel>
                            <Select
                                name="difficulty"
                                value={courseData.difficulty}
                                // 👇 Use a forma funcional para garantir que está usando o estado mais recente
                                onChange={handleCourseChange}
                                label="Dificuldade *"
                            >
                                <MenuItem value={1}>Fácil</MenuItem>
                                <MenuItem value={2}>Médio</MenuItem>
                                <MenuItem value={3}>Difícil</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Categoria *</InputLabel>
                            <Select
                                name="category"
                                value={courseData.category}
                                // 👇 Use a forma funcional aqui também
                                onChange={handleCourseChange}
                                label="Categoria *"
                            >
                                {categories.map(cat => (
                                    <MenuItem key={cat.name} value={cat.id}>{cat.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            name="duration"
                            label="Duração (HH:MM:SS) *"
                            variant="outlined"
                            fullWidth
                            value={courseData.duration}
                            onChange={handleCourseChange}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="haveExam"
                                    checked={courseData.haveExam}
                                    onChange={handleCourseChange}
                                    color="primary"
                                />
                            }
                            label="Este curso tem prova final?"
                            className="text-(--text)"
                        />

                        {courseData.haveExam && (
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-(--text)">
                                        {courseData.exam 
                                            ? `Prova configurada (${courseData.exam.questions.length} questões)`
                                            : "Nenhuma prova configurada ainda"}
                                    </p>
                                </div>
                                <Button
                                    variant="outlined"
                                    onClick={() => setOpenExamModal(true)}
                                >
                                    {courseData.exam ? "Editar Prova" : "Adicionar Prova"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Seção de Módulos */}
                <div className="flex flex-col gap-4 bg-(--card) border border-(--stroke) p-6 rounded-2xl shadow-(--shadow)">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-(--text)">Módulos do Curso</h2>
                        <CuteButton 
                            text="Adicionar Módulo" 
                            icon={AddIcon}
                            onClick={() => setOpenModuleModal(true)}
                        />
                    </div>

                    {courseData.modules.length === 0 ? (
                        <p className="text-(--gray)">Nenhum módulo adicionado ainda</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {courseData.modules.map((module, moduleIndex) => (
                                <div key={moduleIndex} className="border border-(--stroke) rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-bold text-lg text-(--text)">{module.title}</h3>
                                        <Button 
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleRemoveModule(moduleIndex)}
                                            color="error"
                                        >
                                            Remover
                                        </Button>
                                    </div>
                                    <p className="text-(--gray) mb-4">{module.description}</p>

                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-(--text)">Conteúdo do Módulo</h4>
                                        <Button
                                            startIcon={<AddIcon />}
                                            onClick={() => {
                                                setCurrentModuleIndex(moduleIndex);
                                                setOpenContentModal(true);
                                            }}
                                        >
                                            Adicionar Conteúdo
                                        </Button>
                                    </div>

                                    {module.content.length === 0 ? (
                                        <p className="text-(--gray)">Nenhum conteúdo adicionado ainda</p>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            {module.content.map((content, contentIndex) => (
                                                <div key={contentIndex} className="border border-(--stroke) rounded p-3">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <span className="font-bold text-(--text)">
                                                                {content.title} ({getContentTypeName(content.type)})
                                                            </span>
                                                            {content.type === 1 && content.content.length > 0 && (
                                                                <p className="text-sm text-(--gray)">{content.content.length} bloco(s) de conteúdo</p>
                                                            )}
                                                            {content.type === 3 && content.content.length > 0 && (
                                                                <p className="text-sm text-(--gray)">{content.content.length} pergunta(s)</p>
                                                            )}
                                                            {content.type === 4 && content.description && (
                                                                <p className="text-sm text-(--gray)">{content.description}</p>
                                                            )}
                                                        </div>
                                                        <Button
                                                            size="small"
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => handleRemoveContent(moduleIndex, contentIndex)}
                                                            color="error"
                                                        >
                                                            Remover
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Botão de Envio */}
                <div className="flex justify-end">
                    <CuteButton
                        text="Criar Curso"
                        onClick={handleSubmit}
                        disabled={!courseData.title || !courseData.category || courseData.modules.length === 0 || 
                                 (courseData.haveExam && !courseData.exam)}
                    />
                </div>
            </div>

            {/* Modal para Adicionar Módulo */}
            <NotifyModal 
                title="Adicionar Novo Módulo" 
                open={openModuleModal} 
                onClose={() => setOpenModuleModal(false)}
            >
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '20px 0' }}>
                        <TextField
                            label="Título do Módulo *"
                            variant="outlined"
                            fullWidth
                            value={newModule.title}
                            onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                        />
                        <TextField
                            label="Descrição do Módulo"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={newModule.description}
                            onChange={(e) => setNewModule({...newModule, description: e.target.value})}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModuleModal(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button 
                        onClick={handleAddModule} 
                        color="primary"
                        variant="contained"
                        disabled={!newModule.title.trim()}
                    >
                        Adicionar
                    </Button>
                </DialogActions>
            </NotifyModal>

            {/* Modal para Adicionar Conteúdo */}
            <NotifyModal 
                title="Adicionar Conteúdo ao Módulo" 
                open={openContentModal} 
                onClose={() => {
                    setOpenContentModal(false);
                    setTextContentBlocks([]);
                    setActivityQuestions([]);
                    setPdfDescription("");
                }}
            >
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '20px 0' }}>
                        <FormControl fullWidth>
                            <InputLabel>Tipo de Conteúdo *</InputLabel>
                            <Select
                                value={newContent.type}
                                onChange={(e) => {
                                    setNewContent({
                                        ...newContent,
                                        type: e.target.value as number,
                                        content: [],
                                        description: ""
                                    });
                                }}
                                label="Tipo de Conteúdo *"
                            >
                                <MenuItem value={1}>Aula Escrita</MenuItem>
                                <MenuItem value={2}>Aula em Vídeo</MenuItem>
                                <MenuItem value={3}>Atividade Múltipla Escolha</MenuItem>
                                <MenuItem value={4}>Atividade PDF</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Título do Conteúdo *"
                            variant="outlined"
                            fullWidth
                            value={newContent.title}
                            onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                        />

                        {renderContentForm()}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => {
                            setOpenContentModal(false);
                            setTextContentBlocks([]);
                            setActivityQuestions([]);
                            setPdfDescription("");
                        }} 
                        color="primary"
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={handleAddContent} 
                        color="primary"
                        variant="contained"
                        disabled={
                            !newContent.title.trim() || 
                            (newContent.type === 1 && textContentBlocks.length === 0) ||
                            (newContent.type === 3 && activityQuestions.length === 0) ||
                            (newContent.type === 4 && !pdfDescription.trim())
                        }
                    >
                        Adicionar
                    </Button>
                </DialogActions>
            </NotifyModal>

            {/* Modal para Adicionar/Editar Prova */}
            <NotifyModal 
                title={courseData.exam ? "Editar Prova do Curso" : "Adicionar Prova ao Curso"} 
                open={openExamModal} 
                onClose={() => setOpenExamModal(false)}
            >
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '20px 0' }}>
                        <TextField
                            label="Título da Prova *"
                            variant="outlined"
                            fullWidth
                            value={examData.title}
                            onChange={(e) => setExamData({...examData, title: e.target.value})}
                        />
                        
                        <TextField
                            label="Descrição da Prova"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={examData.description}
                            onChange={(e) => setExamData({...examData, description: e.target.value})}
                        />
                        
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <h4 className="font-bold text-lg text-(--text) mb-4">Questões da Prova</h4>
                            
                            <TextField
                                label="Nova Questão *"
                                variant="outlined"
                                fullWidth
                                value={currentExamQuestion}
                                onChange={(e) => setCurrentExamQuestion(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            
                            <h5 className="font-bold text-(--text) mb-2">Opções de Resposta</h5>
                            {currentExamOptions.map((option, index) => (
                                <div key={option.id} className="flex items-center gap-2 mb-2">
                                    <TextField
                                        label={`Opção ${option.id.toUpperCase()}`}
                                        variant="outlined"
                                        fullWidth
                                        value={option.text}
                                        onChange={(e) => handleExamOptionChange(index, e.target.value)}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={correctExamAnswer === option.id}
                                                onChange={() => setCorrectExamAnswer(option.id)}
                                                color="primary"
                                            />
                                        }
                                        label="Correta"
                                    />
                                </div>
                            ))}
                            
                            <Button 
                                onClick={handleAddExamQuestion}
                                variant="outlined"
                                disabled={!currentExamQuestion.trim() || !correctExamAnswer || 
                                         currentExamOptions.every(opt => !opt.text.trim())}
                                sx={{ mb: 4 }}
                            >
                                Adicionar Questão
                            </Button>
                            
                            {examData.questions.length > 0 && (
                                <Box sx={{ borderTop: '1px solid #ddd', pt: 2 }}>
                                    <h5 className="font-bold text-(--text) mb-2">Questões Adicionadas</h5>
                                    <ul className="space-y-4">
                                        {examData.questions.map((q, idx) => (
                                            <li key={idx} className="border border-gray-200 rounded p-3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <strong>{q.question}</strong>
                                                        <ul className="list-disc ml-5 mt-1">
                                                            {q.options.map(opt => (
                                                                <li key={opt.id} className={q.correctAnswer === opt.id ? "font-bold text-green-600" : ""}>
                                                                    {opt.text} {q.correctAnswer === opt.id && "(Resposta Correta)"}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <Button
                                                        size="small"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => setExamData({
                                                            ...examData,
                                                            questions: examData.questions.filter((_, i) => i !== idx)
                                                        })}
                                                        color="error"
                                                    >
                                                        Remover
                                                    </Button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
                            )}
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenExamModal(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button 
                        onClick={handleSaveExam} 
                        color="primary"
                        variant="contained"
                        disabled={!examData.title.trim() || examData.questions.length === 0}
                    >
                        Salvar Prova
                    </Button>


                </DialogActions>
            </NotifyModal>
        </>
    );
};

// Função auxiliar para mostrar o nome do tipo de conteúdo
function getContentTypeName(type: number): string {
    switch(type) {
        case 1: return "Aula Escrita";
        case 2: return "Aula em Vídeo";
        case 3: return "Atividade Múltipla Escolha";
        case 4: return "Atividade PDF";
        default: return "Desconhecido";
    }
}

export default AddCourse;