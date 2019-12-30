import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px 20px;
  margin-bottom: 10px;
`;

export const Item = styled.TouchableOpacity``;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Answered = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Status = styled.Text`
  margin-left: 8px;
  font-weight: bold;
  font-size: 14px;
`;

export const Time = styled.View``;

export const Info = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  margin-top: 16px;
  font-size: 14px;
  line-height: 26px;
  color: #666666;
`;
