import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Table } from '~/components/Table/styles';
import { Title, Button } from '~/components/Title/styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  async function loadStudents() {
    try {
      const response = await api.get('students');

      setStudents(response.data);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleDeleteStudent(id) {
    try {
      await api.delete(`students/${id}`);

      const newStudentList = students.filter(student => student.id !== id);

      toast.success('Estudante excluído com sucesso!');

      setStudents(newStudentList);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  }

  async function handleSearch(e) {
    const searchName = e.target.value;
    setSearch(searchName);
    const response = await api.get('students');
    if (searchName === '') {
      setStudents(response.data);
    } else {
      const filtered = response.data.filter(
        student =>
          student.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
      setStudents(filtered);
    }
  }

  return (
    <>
      <Title maxWidth="1200px">
        <h1>Gerenciando alunos</h1>
        <div>
          <Button
            type="button"
            color="#EE4D64"
            onClick={() => history.push('/students/add')}
          >
            <div>
              <MdAdd size={20} color="#FFF" />
            </div>

            <span>CADASTRAR</span>
          </Button>
          <input
            type="text"
            placeholder="Buscar aluno"
            onChange={handleSearch}
          />
        </div>
      </Title>
      <Table maxWidth="1200px">
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>
                <span>{student.name}</span>
              </td>
              <td>
                <span>{student.email}</span>
              </td>
              <td>
                <span>{student.age}</span>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => history.push(`/students/edit/${student.id}`)}
                >
                  editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteStudent(student.id)}
                >
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
