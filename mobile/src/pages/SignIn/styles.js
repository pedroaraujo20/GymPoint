import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  padding: 13px 15px;
  height: 45px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
