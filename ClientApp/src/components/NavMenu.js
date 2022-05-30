import React, { Component } from 'react';
import { Container, Navbar, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import image from '../Images/northwindLogoUnico.png';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import authService from './api-authorization/AuthorizeService';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true, isUserValid: false, isUserConnected: false,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidMount() {
    authService.getUser().then(
      (u) => {
        if(u != null)
          this.setState({ isUserConnected: true });
        else
          this.setState({ isUserConnected: false});
      }
    );
  }

  render() {
    return (
<header>
        <Navbar dark expand="md" full="true" className='bg-faded px-3 navbar-dark bg-black'>
          <Container fluid justif>
            <a href='/' className='navbar-brand w-50'>
              <img src={image} width='75rem' height='60em' className='me-1' /></a>


            <div className='navbar-collapse collapse w-100' id='collapsingNavbar3'>
              <ul className='navbar-nav w-100 '>
                    <li class="nav-item "><a class="nav-link" href="#caract">Caracteristicas</a></li>
                    <li class="nav-item"><a class="nav-link" href="#pp">Planes y precios</a></li>
                    <li class="nav-item"><a class="nav-link" href="#txt-S">Soporte</a></li>
                    <li class="nav-item"><a class="nav-link" href="#foot">Sobre Nosotros</a></li>
                    <li class="nav-item"><a class="nav-link" href="formContact.html">Contáctanos</a></li>
                   
                {
                  this.state.isUserConnected && <NavItem>
                    <NavLink tag={Link} className="" to="/suppliers">Inventario</NavLink>
                  </NavItem>
                }
              </ul>
              <ul className='nav navbar-nav ms-auto w-100 justify-content-end'>
                <LoginMenu>
                </LoginMenu>
              </ul>
            </div>
          </Container>
        </Navbar>
</header>
    );
  }
}
