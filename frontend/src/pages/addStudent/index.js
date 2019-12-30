import React from 'react';
import { toast } from 'react-toastify';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';

import { Title, Button } from '~/components/Title/styles';
import { Form as FormStyled } from '~/components/Form/styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .positive('Idade inválida')
    .typeError('A idade é obrigatória')
    .required('A idade é obrigatória'),
  weight: Yup.number()
    .positive('Peso inválido')
    .typeError('O peso é obrigatório')
    .required('O peso é obrigatório'),
  height: Yup.number()
    .positive('Altura inválida')
    .typeError('A altura é obrigatória')
    .required('A altura é obrigatória'),
});

export default function AddStudent() {
  async function handleSubmit(data) {
    try {
      await api.post('students', data);
      toast.success('Aluno cadastrado com sucesso!');
      history.push('/students');
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <>
      <Title maxWidth="900px">
        <h1>Cadastro de aluno</h1>
        <div>
          <Button
            onClick={() => history.push('/students')}
            type="button"
            color="#DDDDDD"
          >
            <div>
              <MdKeyboardArrowLeft size={20} color="#FFF" />
            </div>

            <span>VOLTAR</span>
          </Button>
          <Button type="submit" form="student-form" color="#EE4D64">
            <div>
              <MdDone size={20} color="#FFF" />
            </div>

            <span>SALVAR</span>
          </Button>
        </div>
      </Title>
      <FormStyled maxWidth="900px">
        <Form id="student-form" onSubmit={handleSubmit} schema={schema}>
          <label htmlFor="name">NOME COMPLETO</label>
          <Input name="name" placeholder="John Doe" />

          <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
          <Input type="email" name="email" placeholder="exemplo@email.com" />

          <div className="inputs">
            <div className="inputs-labels">
              <label htmlFor="age">IDADE</label>
              <Input name="age" />
            </div>

            <div className="inputs-labels">
              <label htmlFor="weight">PESO (em kg)</label>
              <Input name="weight" />
            </div>

            <div className="inputs-labels">
              <label htmlFor="height">ALTURA</label>
              <Input name="height" />
            </div>
          </div>
        </Form>
      </FormStyled>
    </>
  );
}
