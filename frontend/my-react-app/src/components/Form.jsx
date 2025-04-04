import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

// Componentes estilizados com props transitórias para evitar warnings
const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1a5a9a;
    }
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;
            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        // Validação dos campos
        if (!user.nome.value || !user.email.value || !user.fone.value || !user.data_nascimento.value) {
            return toast.warn("Preencha todos os campos!");
        }

        try {
            const userData = {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value
            };

            // Correção das rotas da API
            if (onEdit) {
                await axios.put(`http://localhost:8800/api/users/${onEdit.id}`, userData);
                toast.success("Usuário atualizado com sucesso!");
            } else {
                await axios.post("http://localhost:8800/api/users", userData); // Alterado para POST para criação
                toast.success("Usuário criado com sucesso!");
            }

            // Reset do formulário
            user.nome.value = "";
            user.email.value = "";
            user.fone.value = "";
            user.data_nascimento.value = "";

            setOnEdit(null);
            getUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || "Erro ao processar a requisição");
        }
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone" />
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type="date" />
            </InputArea>

            <Button type="submit">Salvar</Button>
        </FormContainer>
    );
};

export default Form;