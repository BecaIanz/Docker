"use client";

import { Menu } from "@/src/components/menu";
import { CuteButton } from "@/src/components/cuteButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BusinessIcon from '@mui/icons-material/Business';

import { CardCompany } from "@/src/components/cardCompany";
import { useEffect, useState } from 'react';
import { NotifyModal } from "@/src/components/notifyModal";
import { TextField, Button, DialogActions, DialogContent, Box, FormControlLabel, Checkbox } from '@mui/material';
import { api } from "@/src/constants/api";
import { PermIdentity } from "@mui/icons-material";

interface Company {
  id: number;
  name: string;
}

const HomeAdmin = () => {
    const token = sessionStorage.getItem("Token");
    const [companies, setCompanies] = useState<Company[]>([]);
    const [specifyCompanyId, setSpecifyCompanyId] = useState<string | undefined>();
    // Estado para o modal e formulário
    const [openAddModal, setOpenAddModal] = useState(false);
    const [newCompanyName, setNewCompanyName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [newCollaborator, setNewCollaborator] = useState({
        identity: '',
        name: '',
        email: ''
    });

    // Fetch inicial
  useEffect(() => {
    const fetchCompanies = async () => {
        try {
            const response = await api.get("/admin/companies",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            setCompanies(response.data);
        } catch (error) {
            console.error("Erro ao buscar empresas:", error);
        }
    };

    fetchCompanies();
  }, []);

    // Funções do modal
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setNewCompanyName('');
    };

    const handleAddCompany = async () => {
        if (!newCompanyName.trim()) {
            alert('Por favor, insira um nome para a empresa');
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simulando uma chamada API
            const response = await api.post(
                "/admin/companies", 
                { Name: newCompanyName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );


            // Adiciona a nova empresa ao estado (simulando resposta da API)
            setCompanies([...companies, response.data]);
            
            // Fecha o modal e limpa o formulário
            handleCloseAddModal();
            
            // Aqui você poderia adicionar a lógica para abrir outro modal
            // para adicionar o gestor responsável, se necessário
            // Ex: setShowAddManagerModal(true); setSelectedCompany(newCompany.id);
            handleOpenModal(response.data.id);
            

            
    
        } catch (error) {
            console.error('Erro ao adicionar empresa:', error);
            alert('Ocorreu um erro ao adicionar a empresa');
        } finally {
            setIsSubmitting(false);
        }
    };

        // Funções do modal
    const handleOpenModal = (companyId : string) => {
        setSpecifyCompanyId(companyId)
        setOpenModal(true)
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
        setNewCollaborator({
        identity: '',
        name: '',
        email: ''
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setNewCollaborator(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        if (!newCollaborator.identity || !newCollaborator.name || !newCollaborator.email) {
            alert("Preencha todos os campos obrigatórios");
            return;
        }

        const response = await api.post (
                "/users", 
                { 
                    Name: newCollaborator.name,
                    Identity: newCollaborator.identity,
                    Email: newCollaborator.email,
                    Password: newCollaborator.identity,
                    CompanyId: specifyCompanyId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

        handleCloseModal();
    };

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} admin />
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">Bem vindo(a), Admin!</h1>
                    <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Gerencie as empresas cadastradas no sistema</p>
                </div>

                {/* Stats Card */}
                <div className="flex bg-(--card) border border-(--stroke) flex-col p-5 rounded-2xl gap-4 shadow-(--shadow)">
                    <h1 className="text-xl font-bold text-(--text)">Visão Geral</h1>
                    <div className="flex justify-between gap-3 md:flex-row flex-col">
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
                            <div className="flex items-center justify-center p-1 bg-(--blueOpacity) rounded-full">
                                <BusinessIcon sx={{ color: "var(--blue)" }}/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="font-bold text-(--text)">{companies.length}</h1>
                                <p className="text-(--gray)">Empresas cadastradas</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Companies List */}
                <div className="flex flex-col gap-4">
                    <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
                        <h1 className="md:text-2xl text-xl font-bold text-(--text)">Empresas</h1>
                        <CuteButton 
                            text="Adicionar empresa" 
                            icon={ArrowForwardIcon} 
                            onClick={handleOpenAddModal}
                        />
                    </div>
                    <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 gap-4">
                        {companies.map((company) => (
                            <CardCompany 
                                key={company.id}
                                id={company.id}
                                name={company.name}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal para adicionar nova empresa */}
            <NotifyModal 
                title="Adicionar Nova Empresa" 
                open={openAddModal} 
                onClose={handleCloseAddModal}
            >
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '20px 0' }}>
                        <TextField
                            label="Nome da Empresa"
                            variant="outlined"
                            fullWidth
                            value={newCompanyName}
                            onChange={(e) => setNewCompanyName(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCloseAddModal} 
                        color="primary"
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={handleAddCompany} 
                        color="primary"
                        variant="contained"
                        disabled={!newCompanyName.trim() || isSubmitting}
                    >
                        {isSubmitting ? 'Adicionando...' : 'Adicionar'}
                    </Button>
                </DialogActions>
            </NotifyModal>

            {/* Modal de cadastro */}
            <NotifyModal title="Cadastrar Gestor da Empresa" open={openModal} onClose={handleCloseModal}>
                <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '20px 0' }}>
                    <TextField
                        name="identity"
                        label="Código do Funcionário *"
                        variant="outlined"
                        fullWidth
                        value={newCollaborator.identity}
                        onChange={handleInputChange}
                        // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    <TextField
                        name="name"
                        label="Nome Completo *"
                        variant="outlined"
                        fullWidth
                        value={newCollaborator.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="email"
                        label="Email Corporativo *"
                        variant="outlined"
                        fullWidth
                        value={newCollaborator.email}
                        onChange={handleInputChange}
                        type="email"
                    />
                    {/* <FormControlLabel
                    control={
                        <Checkbox
                        name="isManager"
                        checked={newCollaborator.isManager}
                        onChange={handleInputChange}
                        color="primary"
                        />
                    }
                    label="É gestor?"
                    /> */}
                    <small style={{ color: 'gray' }}>* Campos obrigatórios</small>
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                    Cancelar
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    color="primary"
                    variant="contained"
                    disabled={!newCollaborator.identity || !newCollaborator.name || !newCollaborator.email}
                >
                    Cadastrar
                </Button>
                </DialogActions>
            </NotifyModal>
            
        </>
    )
}

export default HomeAdmin;