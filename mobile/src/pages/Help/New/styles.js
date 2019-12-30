import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-top: 20px;
  padding: 0 20px;
`;

export const QuestionInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  padding: 20px 20px;
  max-height: 335px;
  height: 100%;
  margin-bottom: 20px;
`;
