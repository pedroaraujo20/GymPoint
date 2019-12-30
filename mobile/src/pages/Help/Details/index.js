import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';

import {
  Container,
  HelpDetails,
  Header,
  Question,
  Time,
  Info,
  Answer,
} from './styles';

export default function Details({ navigation }) {
  const details = navigation.getParam('help');
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(details.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [details.createdAt]);

  return (
    <Background>
      <Container>
        <HelpDetails>
          <Header>
            <Question>PERGUNTA</Question>
            <Time>{dateParsed}</Time>
          </Header>
          <Info>{details.question}</Info>
          <Answer>RESPOSTA</Answer>
          <Info>{details.answer ? details.answer : ''}</Info>
        </HelpDetails>
      </Container>
    </Background>
  );
}
