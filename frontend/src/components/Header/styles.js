import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid #dddddd;
    }

    a {
      font-weight: bold;
      font-size: 15px;
      line-height: 18px;
      color: #999999;
      margin-right: 20px;

      &:hover {
        color: #444444;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;

    strong {
      display: block;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #666666;
    }

    button {
      background: none;
      border: 0;
      margin-top: 4px;
      font-size: 14px;
      line-height: 16px;
      color: #de3b3b;
      transition: background 0.2s;

      &:hover {
        color: ${lighten(0.1, '#de3b3b')};
      }
    }
  }
`;
