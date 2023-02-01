import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import Logo from '../Logo';
import SuperHeader from '../SuperHeader';

const Header = () => {
  // Our site features two visual headers, but they should be
  // grouped semantically as a single header.
  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <Logo />
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
      </MainHeader>
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-around;
  padding: 18px 32px 17px;
  border-bottom: 1px solid ${COLORS.gray[300]};
  // Tried this first and it worked but found a cleaner way
  // One big issue that's bothering me: logo is not clickable with width of 0
  // &:after {
  //   content: '';
  //   display: flex;
  //   flex: 1;
  // }
`;

const Nav = styled.nav`
  // flex: 3;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};
  margin-left: 1.5rem;
  margin-right: 1.5rem;

  &:first-of-type {
    color: ${COLORS.secondary};
  }
`;

export default Header;
