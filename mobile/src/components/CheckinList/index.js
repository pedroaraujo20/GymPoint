import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Left, CheckIn, Right, Time } from './styles';

export default function CheckinList({ data, index }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Left>
        <CheckIn>Check-in #{index + 1}</CheckIn>
      </Left>
      <Right>
        <Time>{dateParsed}</Time>
      </Right>
    </Container>
  );
}
