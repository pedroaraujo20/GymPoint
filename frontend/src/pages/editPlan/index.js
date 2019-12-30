import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';

import { Title, Button } from '~/components/Title/styles';
import { Form as FormStyled } from '~/components/Form/styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .integer()
    .positive('Valor negativo')
    .typeError('Campo obrigatorio')
    .required('Campo obritatório'),
  price: Yup.number()
    .positive('Valor negativo')
    .typeError('Campo obrigatorio')
    .required('Campo obrigatório'),
});

export default function EditPlan() {
  const [plan, setPlan] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`plans/${id}`);
      setPlan(response.data);
    }
    loadPlan();
  }, [id]);

  async function handleSubmit(data) {
    try {
      await api.put(`plans/${id}`, data);
      toast.success('Plano atualizado com sucesso!');
      history.push('/plans');
    } catch (err) {
      toast.error(err);
    }
  }

  const total = useMemo(() => plan.price * plan.duration, [
    plan.price,
    plan.duration,
  ]);

  return (
    <>
      <Title maxWidth="900px">
        <h1>Edição de plano</h1>
        <div>
          <Button
            onClick={() => history.push('/plans')}
            type="button"
            color="#DDDDDD"
          >
            <div>
              <MdKeyboardArrowLeft size={20} color="#FFF" />
            </div>

            <span>VOLTAR</span>
          </Button>
          <Button type="submit" form="plan-form" color="#EE4D64">
            <div>
              <MdDone size={20} color="#FFF" />
            </div>

            <span>SALVAR</span>
          </Button>
        </div>
      </Title>
      <FormStyled maxWidth="900px">
        <Form
          initialData={plan}
          id="plan-form"
          onSubmit={handleSubmit}
          schema={schema}
        >
          <label htmlFor="title">TÍTULO DO PLANO</label>
          <Input name="title" />

          <div className="inputs">
            <div className="inputs-labels">
              <label htmlFor="duration">DURAÇÃO (em meses)</label>
              <Input name="duration" />
            </div>

            <div className="inputs-labels">
              <label htmlFor="price">PREÇO MENSAL</label>
              <Input name="price" />
            </div>

            <div className="inputs-labels">
              <label htmlFor="total">PREÇO TOTAL</label>
              <input
                value={total}
                disabled
                style={{ backgroundColor: '#DDDDDD' }}
              />
            </div>
          </div>
        </Form>
      </FormStyled>
    </>
  );
}
