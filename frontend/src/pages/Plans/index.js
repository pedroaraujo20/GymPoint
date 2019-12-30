import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

import { Table } from '~/components/Table/styles';
import { Title, Button } from '~/components/Title/styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  async function loadPlans() {
    try {
      const response = await api.get('/plans');

      const data = response.data.map(plan => ({
        ...plan,
        priceFormatted: formatPrice(plan.price),
      }));

      setPlans(data);
    } catch (err) {
      toast.error(err);
    }
  }

  useEffect(() => {
    loadPlans();
  }, []); // eslint-disable-line

  async function handleDeletePlan(id) {
    try {
      await api.delete(`plans/${id}`);

      const newPlanList = plans.filter(plan => plan.id !== id);

      toast.success('Plano excluído com sucesso!');

      setPlans(newPlanList);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  }

  return (
    <>
      <Title maxWidth="900px">
        <h1>Gerenciando planos</h1>
        <Button
          onClick={() => history.push('/plans/add')}
          type="button"
          color="#EE4D64"
        >
          <div>
            <MdAdd size={20} color="#FFF" />
          </div>

          <span>CADASTRAR</span>
        </Button>
      </Title>
      <Table maxWidth="900px">
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR p/ MÊS</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>
                <span>{plan.title}</span>
              </td>
              <td>
                <span>
                  {plan.duration > 1
                    ? `${plan.duration} mêses`
                    : `${plan.duration} mês`}
                </span>
              </td>
              <td>
                <span>{plan.priceFormatted}</span>
              </td>
              <td>
                <button
                  onClick={() => history.push(`/plans/edit/${plan.id}`)}
                  type="button"
                >
                  editar
                </button>
                <button onClick={() => handleDeletePlan(plan.id)} type="button">
                  apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
