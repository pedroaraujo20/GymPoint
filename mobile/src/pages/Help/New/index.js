import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';

import { Container, QuestionInput } from './styles';

export default function New({ navigation }) {
  const id = useSelector(state => state.auth.token);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  async function createNewHelp() {
    try {
      if (question === '') {
        Alert.alert('Favor preencher com uma pergunta!');
        return;
      }

      setLoading(true);
      await api.post(`students/${id}/assists`, {
        question,
      });
      Alert.alert('Nova pergunta criada. Responderemos em breve!');
      navigation.navigate('List');
      setLoading(false);
    } catch (err) {
      Alert.alert(err);
    }
  }

  return (
    <Background>
      <Container>
        <QuestionInput
          textAlignVertical="top"
          autoCorrect={false}
          multiline
          placeholder="Insira seu pedido de auxilio"
          returnKeyType="send"
          value={question}
          onChangeText={setQuestion}
        />
        <Button loading={loading} onPress={createNewHelp}>
          Enviar pedido
        </Button>
      </Container>
    </Background>
  );
}
