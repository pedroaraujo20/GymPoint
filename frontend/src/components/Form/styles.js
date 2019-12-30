import styled from 'styled-components';

export const Form = styled.div`
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 100%;
  max-width: ${props => props.maxWidth};

  span {
    display: block;
    color: #ee4d64;
    align-self: flex-start;
    font-weight: bold;
    margin-top: -15px;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #444444;
  }

  select {
    margin-top: 8px;
    margin-bottom: 20px;
    display: block;
    width: 100%;
    height: 45px;
    background: #fff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 13px 15px;
    font-size: 16px;
    line-height: 19px;

    &::placeholder {
      font-size: 16px;
      line-height: 19px;
      color: #999999;
    }
  }

  input {
    margin-top: 8px;
    margin-bottom: 20px;
    display: block;
    width: 100%;
    background: #fff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 13px 15px;
    font-size: 16px;
    line-height: 19px;

    &::placeholder {
      font-size: 16px;
      line-height: 19px;
      color: #999999;
    }
  }

  div.inputs {
    margin-top: 10px;
    display: flex;
    margin-bottom: -10px;
    justify-content: space-between;
    align-items: baseline;

    div.inputs-labels {
      display: flex;
      flex-direction: column;
    }
  }
`;
