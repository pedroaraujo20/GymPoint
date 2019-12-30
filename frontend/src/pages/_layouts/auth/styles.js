import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 50px 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #444444;
      margin-bottom: 8px;
      align-self: flex-start;
    }

    input {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      font-size: 16px;
      line-height: 19px;
      padding: 13px 15px;
      margin: 0 0 20px;

      &::placeholder {
        color: #999999;
      }
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      font-weight: bold;
      margin-top: -15px;
      margin-bottom: 20px;
    }

    button {
      background: #ee4d64;
      height: 45px;
      border: 0;
      border-radius: 4px;
      display: flex;
      color: #fff;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      transition: background 0.2s;

      &:hover {
        background: ${lighten(0.05, '#ee4d64')};
      }
    }
  }
`;
