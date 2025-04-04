import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.jsx";
import Grid from "./components/Grid.jsx";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

const getUsers = async () =>{
    try{
      const res = await axios.get("http://localhost:8800/api/users");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1: -1)))
    }
    catch(error){
      toast.error(error)
    }
  }

// Verificação de conexão com o backend (opcional)
const checkBackend = async () => {
  try {
    const res = await axios.get('http://localhost:8800/api/health');
    console.log('Conexão com o backend:', res.data);
  } catch (error) {
    console.error('Não foi possível conectar ao backend:', error);
  }
};

// Chame no useEffect ou quando necessário
useEffect(() => {
  checkBackend();
  getUsers();
}, []);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
      </Container>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
      <ToastContainer 
        autoClose={3000} 
        position="bottom-left"
      />
      <GlobalStyle />
    </>
  );
}

export default App;