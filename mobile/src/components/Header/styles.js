import styled from 'styled-components/native';

import logo from '~/assets/logo.png';

export const Container = styled.SafeAreaView`
  background: #fff;
  justify-content: center;
  align-items: center;
  padding: 13px 0;
  height: 100%;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})``;
