import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-top: 22px;
  padding: 0 20px;
`;

export const HelpDetails = styled.View`
  background: #fff;
  padding: 20px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Question = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Info = styled.Text`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  line-height: 26px;
`;

export const Answer = styled.Text`
  margin-top: 20px;
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;
