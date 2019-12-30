import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';
import CheckinList from '~/components/CheckinList';

import { Container, CheckIn } from './styles';

function CheckIns({ isFocused }) {
  const [checkins, setCheckins] = useState([]);
  const id = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  function logout() {
    dispatch(signOut());
  }

  async function loadCheckIns() {
    const response = await api.get(`students/${id}/checkins`);

    setCheckins(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckIns();
    }
  }, [isFocused]); //eslint-disable-line

  async function newCheckIn() {
    try {
      await api.post(`students/${id}/checkins`);

      loadCheckIns();
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  }

  return (
    <Background>
      <Container>
        <Button onPress={newCheckIn}>Novo check-in</Button>
        <CheckIn
          data={checkins}
          keyExtractor={item => String(item._id)}
          renderItem={({ item, index }) => (
            <CheckinList index={index} data={item} />
          )}
        />
        <Button style={{ marginBottom: 20 }} onPress={logout}>
          Sair
        </Button>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(CheckIns);
