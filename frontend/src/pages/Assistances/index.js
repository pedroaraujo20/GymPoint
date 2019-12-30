import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import { Table } from '~/components/Table/styles';
import { Title } from '~/components/Title/styles';

import Modal from '~/components/Modal';

export default function Assistances() {
  const [assists, setAssists] = useState([]);
  const [assistId, setAssistId] = useState('');
  const [modal, setModal] = useState(false);

  async function loadAssists() {
    const response = await api.get('assists');

    setAssists(response.data);
  }

  useEffect(() => {
    loadAssists();
  }, []); // eslint-disable-line

  function handleAssistChange(id) {
    const updatedAssists = assists.filter(assist => assist._id !== id);
    setAssists(updatedAssists);
  }

  function selectAssist(id) {
    setAssistId(id);
    setModal(true);
  }

  return (
    <>
      <Title maxWidth="700px">
        <h1>Pedidos de auxílio</h1>
        <div />
      </Title>
      <Table maxWidth="700px">
        <thead>
          <tr>
            <th>PERGUNTA</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {assists.map(assist => (
            <tr key={assist._id}>
              <td>
                <span>{assist.question}</span>
              </td>
              <td>
                <button type="button" onClick={() => selectAssist(assist._id)}>
                  responder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        isVisible={modal}
        helpId={assistId}
        hide={() => setModal(false)}
        handleChange={handleAssistChange}
      />
    </>
  );
}
