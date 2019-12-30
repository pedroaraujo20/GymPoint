import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addMonths, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import ReactDatePicker from 'react-datepicker';
import { formatPrice } from '~/util/format';
import ReactSelect from '~/components/AsyncSelector';
import api from '~/services/api';
import history from '~/services/history';

import { Title, Button } from '~/components/Title/styles';
import { Form as FormStyled } from '~/components/Form/styles';

export default function EditRegistration() {
  const [registration, setRegistration] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [student, setStudent] = useState(null);
  const [planId, setPlanId] = useState(0);
  const [planSelected, setPlanSelected] = useState([]);
  const [plan, setPlan] = useState([]);
  const [planDuration, setPlanDuration] = useState(0);
  const [planPrice, setPlanPrice] = useState(0);
  const [initialDate, setInitialDate] = useState(new Date());

  const { id } = useParams();

  const finalDate = useMemo(() => addMonths(initialDate, planDuration), [
    initialDate,
    planDuration,
  ]);

  const totalPrice = useMemo(() => formatPrice(planDuration * planPrice), [
    planDuration,
    planPrice,
  ]);

  async function loadPlans() {
    const response = await api.get('plans');
    setPlan(response.data);
  }

  async function getRegistration() {
    try {
      const response = await api.get(`registrations/${id}`);
      console.log(response.data);
      setRegistration(response.data);

      setStudent(response.data.student);
      setInitialDate(parseISO(response.data.start_date));

      setPlanId(response.data.plan_id);
      setPlanSelected(response.data.plan);
      setPlanDuration(response.data.plan.duration);
      setPlanPrice(response.data.plan.price);
    } catch (err) {
      toast.error(err.getPlan.data.error);
    }
  }

  useEffect(() => {
    getRegistration();
    loadPlans();
  }, []); //eslint-disable-line

  async function handleSubmit() {
    try {
      await api.put(`registrations/${id}`, {
        student_id: student.id,
        start_date: initialDate,
        end_date: finalDate,
        plan_id: planId,
        price: totalPrice,
      });
      toast.success('Matrícula atualizada com sucesso!');
      history.push('/registrations');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  const customStyles = {
    control: styles => ({
      ...styles,
      width: 200,
      marginTop: 5,
      marginRight: 10,
    }),
  };

  async function loadStudents() {
    const response = await api.get(`students?q=${studentName}`);

    return response.data;
  }

  return (
    <>
      <Title maxWidth="1000px">
        <h1>Edição de matrícula</h1>
        <div>
          <Button
            onClick={() => history.goBack()}
            type="button"
            color="#DDDDDD"
          >
            <div>
              <MdKeyboardArrowLeft size={20} color="#FFF" />
            </div>

            <span>VOLTAR</span>
          </Button>
          <Button type="submit" form="reg-form" color="#EE4D64">
            <div>
              <MdDone size={20} color="#FFF" />
            </div>

            <span>SALVAR</span>
          </Button>
        </div>
      </Title>
      <FormStyled maxWidth="1000px">
        <Form id="reg-form" onSubmit={handleSubmit}>
          <label htmlFor="student">ALUNO</label>
          <AsyncSelect
            value={student}
            onInputChange={v => setStudentName(v)}
            loadOptions={loadStudents}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onChange={s => setStudent(s)}
            name="student_id"
          />

          <div className="inputs">
            <div className="inputs-labels">
              <label htmlFor="plans">PLANO</label>
              <Select
                name="plans"
                value={planSelected}
                styles={customStyles}
                options={plan}
                placeholder="Plano"
                getOptionValue={option => option.id}
                getOptionLabel={option => option.title}
                onChange={option => {
                  setPlanId(option.id);
                  setPlanDuration(option.duration);
                  setPlanPrice(option.price);
                }}
              />
            </div>

            <div className="inputs-labels">
              <label htmlFor="start_date">DATA DE INICIO</label>
              <ReactDatePicker
                name="start_date"
                selected={initialDate}
                dateFormat="dd/MM/yyyy"
                onChange={d => setInitialDate(d)}
              />
            </div>

            <div className="inputs-labels">
              <label htmlFor="end_date">DATA DE TÉRMINO</label>
              <ReactDatePicker
                selected={finalDate}
                dateFormat="dd/MM/yyyy"
                readOnly
              />
            </div>

            <div className="inputs-labels">
              <label htmlFor="price">VALOR FINAL</label>
              <input
                name="price"
                disabled
                value={totalPrice}
                style={{ backgroundColor: '#DDDDDD' }}
              />
            </div>
          </div>
        </Form>
      </FormStyled>
    </>
  );
}
