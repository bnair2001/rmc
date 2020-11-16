import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

const NavbarRMC = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Rate My Course</NavbarBrand>
          <Nav className="mr-auto" navbar></Nav>
          <Nav className="mr-right" navbar>
            <NavItem>
              <NavLink href="/rate"><Button outline color="dark">Rate a Course</Button></NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarRMC;