import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { MdClose } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('A mensagem é obrigatória'),
});

export default function Modal({ helpId, isVisible, hide, handleChange }) {
  const [question, setQuestion] = useState('');

  useEffect(() => {
    async function getSelectedAssist() {
      if (isVisible) {
        try {
          const response = await api.get(`assists/${helpId}`);
          setQuestion(response.data.question);
        } catch (err) {
          toast.error(err.response.data.error);
        }
      }
    }
    getSelectedAssist();
  }, [helpId, isVisible]);

  async function handleSubmit({ answer }) {
    try {
      await api.post(`assists/${helpId}/answer`, {
        answer,
      });
      setQuestion('');
      handleChange(helpId);
      hide();
      toast.success('Resposta enviada com sucesso!');
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  }

  return (
    <Container visible={isVisible}>
      <Content>
        <div>
          <span>PERGUNTA DO ALUNO</span>
          <MdClose size={25} color="#111" onClick={() => hide()} />
        </div>
        <p>{question}</p>
        <Form onSubmit={handleSubmit} schema={schema}>
          <span>SUA RESPOSTA</span>
          <Input
            name="answer"
            placeholder="Digite a resposta aqui"
            multiline
            type="text"
          />
          <button type="submit">Responder aluno</button>
        </Form>
      </Content>
    </Container>
  );
}
