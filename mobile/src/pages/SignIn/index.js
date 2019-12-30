import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';

import logo from '~/assets/logosign.png';
import { singInRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(singInRequest(id));
  }

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          keyboardType="numeric"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          value={id}
          onChangeText={setId}
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
