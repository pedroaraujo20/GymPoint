import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-top: 20px;
  padding: 0 20px;
`;

export const CheckIn = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
  margin-top: 20px;
  margin-bottom: 20px;
`;
