import React, { Component, Fragment } from 'react';
import { NavItem, NavLink, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import ProfilePic from '../../Images/1653504606800.jpg';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        return (<Fragment>
            <UncontrolledDropdown>
                <DropdownToggle caret nav className="text-muted">
                    <img src={ProfilePic} alt="" className="rounded-circle avatar me-2" /> {userName}
                </DropdownToggle>
                <DropdownMenu className="text-dark" right>
                    <DropdownItem><NavLink tag={Link} className="text-dark" to={profilePath}>Mi Perfil</NavLink></DropdownItem>
                    <DropdownItem><NavLink className='text-dark'>Configuración</NavLink></DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem><NavLink tag={Link} className="text-dark" to={logoutPath}>Cerrar sesión</NavLink></DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            {/*<NavItem>
                <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
        </NavItem>*/}
        </Fragment>);

    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={registerPath}><Button color='secondary' className='me-md-2 mb-1 mb-lg-0' outline>Registrate</Button></NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={loginPath}><Button color='' className='btn-secondary'>Inicia sesión</Button></NavLink>
            </NavItem>
        </Fragment>);
    }
}
