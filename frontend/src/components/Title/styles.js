import styled from 'styled-components';
import { darken } from 'polished';

export const Title = styled.header`
  display: flex;
  width: 100%;
  max-width: ${props => props.maxWidth};
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-top: 34px;

  h1 {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #444444;
  }

  div {
    display: flex;

    input {
      width: 237px;
      margin-left: 16px;
      border-radius: 4px;
      background: #fff;
      border: 1px solid #dddddd;
      padding: 0 30px 0 12px;

      &::placeholder {
        font-size: 14px;
        line-height: 16px;
        color: #999999;
      }
    }
  }
`;

export const SubmitButton = styled.label`
  background: ${props => props.color};
  height: 36px;
  width: 100%;
  max-width: 142px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  border-radius: 4px;
  margin-left: 16px;
  transition: background 0.2s;

  div {
    margin-right: 5px;
  }

  span {
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
  }

  &:hover {
    background: ${props => darken(0.1, props.color)};
  }
`;

export const Button = styled.button`
  background: ${props => props.color};
  height: 36px;
  width: 100%;
  max-width: 142px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  border-radius: 4px;
  margin-left: 16px;
  transition: background 0.2s;

  div {
    margin-right: 5px;
  }

  span {
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
  }

  &:hover {
    background: ${props => darken(0.1, props.color)};
  }
`;
