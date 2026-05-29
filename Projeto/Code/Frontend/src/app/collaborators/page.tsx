"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  InputAdornment, 
  DialogContent, 
  Box, 
  DialogActions,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { 
  InfoOutlined,
  SearchOutlined,
  ArrowUpward,
  ArrowDownward,
  DownloadOutlined,
  PersonAddAlt1Outlined
} from '@mui/icons-material';
import { Menu } from "@/src/components/menu";
import { CuteButton } from "@/src/components/cuteButton";
import { NotifyModal } from "@/src/components/notifyModal";
import { ROUTES } from "@/src/constants/routes";
import { api } from "@/src/constants/api";

  interface Collaborator {
    id: number;
    identity: string;
    name: string;
    email: string;
    isManager: boolean;
    coursesCount: number;
    coursesInProgress: number;
    averageScore: number;
    topCategory: string;
  }

  const Collaborators = () => {
    const token = sessionStorage.getItem("Token");
    const router = useRouter();
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [sortConfig, setSortConfig] = useState<{ 
      key: keyof Collaborator; 
      direction: 'ascending' | 'descending' 
    } | null>(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [newCollaborator, setNewCollaborator] = useState({
      id: '',
      name: '',
      email: '',
      isManager: false
    });

    useEffect(() => {

      const fetchCollaborators = async () => {
          try {
            const response = await api.get("/team",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              }
            );
            const data = Array.isArray(response.data.team) ? response.data.team : [];
            setCollaborators(data);
          } catch (error) {
            console.error("Erro ao buscar colaboradores:", error);
            setCollaborators([]);
          }
        };

        fetchCollaborators();
        
    }, []);
  

  // Funções do modal
  const handleOpenModal = () => setOpenModal(true);
  
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewCollaborator({
      id: '',
      name: '',
      email: '',
      isManager: false
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
    if (!newCollaborator.id || !newCollaborator.name || !newCollaborator.email) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      const response = await api.post(
        "/users", 
        { 
          Name: newCollaborator.name,
          Identity: newCollaborator.id,
          Email: newCollaborator.email,
          Password: newCollaborator.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      handleCloseModal();
      
      // Recarregar a lista de colaboradores
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar colaborador:", error);
      alert("Erro ao criar colaborador. Tente novamente.");
    }
  };

  // Funções de ordenação
  const requestSort = (key: keyof Collaborator) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Collaborator) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' 
      ? <ArrowUpward fontSize="small" /> 
      : <ArrowDownward fontSize="small" />;
  };

  // Função de filtro
  const filteredCollaborators = Array.isArray(collaborators) 
    ? collaborators.filter(collaborator => {
        const searchLower = searchTerm.toLowerCase();
        return (
          collaborator.name.toLowerCase().includes(searchLower) ||
          collaborator.email.toLowerCase().includes(searchLower)
          // collaborator.topCategory.toLowerCase().includes(searchLower)
        );
      })
    : [];

  // Aplicar ordenação
  const sortedCollaborators = [...filteredCollaborators];
  if (sortConfig) {
    sortedCollaborators.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const downloadReport = () => {
    // Implementar lógica de download
  };

  return (
    <>
      <Menu op1="Dashboard" op2="Cursos" op3="Calendário" op4="Perfil" manager />
      
      <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
        {/* Cabeçalho */}
        <div className="flex flex-row justify-between items-center p-1 md:items-start">
          <div className="flex-col gap-1">
            <h1 className="md:text-2xl text-xl font-bold text-(--text)">Colaboradores</h1>
            <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">
              Acompanhe o desenvolvimento dos seus colaboradores!
            </p>
          </div>
          <div className="flex gap-2">
            <CuteButton 
              text="Cadastrar funcionário" 
              icon={PersonAddAlt1Outlined}
              onClick={handleOpenModal}
            />
            <CuteButton 
              text="Exporte o relatório" 
              icon={DownloadOutlined}
              onClick={downloadReport}
            />
          </div>
        </div>

        {/* Modal de cadastro */}
        <NotifyModal title="Cadastrar Novo Colaborador" open={openModal} onClose={handleCloseModal}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '20px 0' }}>
              <TextField
                name="id"
                label="ID do Funcionário *"
                variant="outlined"
                fullWidth
                value={newCollaborator.id}
                onChange={handleInputChange}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
              disabled={!newCollaborator.id || !newCollaborator.name || !newCollaborator.email}
            >
              Cadastrar
            </Button>
          </DialogActions>
        </NotifyModal>

        {/* Barra de pesquisa */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Pesquisar por nome, email ou categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: 'var(--gray)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--primary)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--primary)',
              },
            },
          }}
        />

        {/* Tabela */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {['id', 'name', 'email', 'coursesCompleted', 'coursesInProgress', 'averageScore', 'topCategory'].map((key) => (
                  <TableCell 
                    key={key} 
                    align="center" 
                    onClick={() => requestSort(key as keyof Collaborator)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {{
                        id: 'ID',
                        name: 'Nome',
                        email: 'Email',
                        coursesCompleted: 'Cursos Completos',
                        coursesInProgress: 'Cursos em Andamento',
                        averageScore: 'Score Médio',
                        topCategory: 'Categoria Destaque'
                      }[key]}
                      {getSortIcon(key as keyof Collaborator)}
                    </div>
                  </TableCell>
                ))}
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCollaborators.map((row) => (
                <TableRow 
                  key={row.id} 
                  className="hover:bg-(--hoverWhite) transition duration-150" 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.identity}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.coursesCount ?? 0}</TableCell>
                  <TableCell align="center">{row.coursesInProgress ?? 0}</TableCell>
                  {/* <TableCell align="center">{row.averageScore.toFixed(1)}</TableCell> ARRUMAR DEPOIS */}
                  <TableCell align="center">{row.topCategory}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => router.push(`/collaborators/${row.id}`)}>
                      <InfoOutlined />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Collaborators;