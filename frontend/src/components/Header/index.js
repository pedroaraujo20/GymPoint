import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logoHeader.svg';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <NavLink activeClassName="selected" to="/students">
            ALUNOS
          </NavLink>
          <NavLink activeClassName="selected" to="/plans">
            PLANOS
          </NavLink>
          <NavLink activeClassName="selected" to="/registrations">
            MATRÍCULAS
          </NavLink>
          <NavLink activeClassName="selected" to="/assistances">
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
