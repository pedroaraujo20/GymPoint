import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';
import HelpList from '~/components/HelpList';

import { Container, Help } from './styles';

function List({ navigation, isFocused }) {
  const id = useSelector(state => state.auth.token);
  const [helps, setHelps] = useState([]);

  async function loadHelps() {
    try {
      const response = await api.get(`students/${id}/assists`);

      setHelps(response.data);
    } catch (err) {
      Alert.alert(err.respons.data.error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadHelps();
    }
  }, [isFocused]); //eslint-disable-line

  function handleNavigate() {
    navigation.navigate('New');
  }

  function showMoreDetails(help) {
    navigation.navigate('Details', { help });
  }

  return (
    <Background>
      <Container>
        <Button onPress={handleNavigate}>Novo pedido de auxílio</Button>
        <Help
          data={helps}
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => (
            <HelpList data={item} moreDetails={() => showMoreDetails(item)} />
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(List);
