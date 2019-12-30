import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Item,
  Header,
  Answered,
  Status,
  Time,
  Info,
  Question,
} from './styles';

export default function HelpList({ data, moreDetails }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Item onPress={moreDetails}>
        <Header>
          <Answered>
            <Icon
              name="check-circle"
              size={16}
              color={data.answer ? '#42CB59' : '#999999'}
            />
            <Status>{data.answer ? 'Respondido' : 'Sem Resposta'}</Status>
          </Answered>
          <Time>
            <Info>{dateParsed}</Info>
          </Time>
        </Header>
        <Question>{data.question}</Question>
      </Item>
    </Container>
  );
}
