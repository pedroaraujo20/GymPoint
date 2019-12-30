import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 30px;
  width: 450px;

  div {
    display: flex;
    justify-content: space-between;

    span {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #444444;
    }
  }

  p {
    margin-top: 8px;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 26px;
    color: #666666;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #444444;
    }

    textarea {
      margin-top: 8px;
      margin-bottom: 21px;
      background: #ffffff;
      font-size: 16px;
      line-height: 19px;
      padding: 10px;
      border-radius: 4px;
      height: 150px;

      &::placeholder {
        font-size: 16px;
        line-height: 19px;
        color: #999999;
      }
    }

    button {
      display: flex;
      border: 0;
      height: 45px;
      width: 390px;
      justify-content: center;
      align-items: center;
      background: #ee4d64;
      border-radius: 4px;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
    }
  }
`;
