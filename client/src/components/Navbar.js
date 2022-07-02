import React, {Component, Fragment} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import LoginForm from './auth/LoginForm';
import Logout from './auth/Logout';
import RegisterForm from './auth/RegisterForm';

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                 <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks =(
            <Fragment>
                 <NavItem>
                    <RegisterForm/>
                </NavItem>
                <NavItem>
                    <LoginForm/>
                </NavItem>
            </Fragment>
        )

        return(
            <div>
            <Navbar  dark expand="md" className="mb-5 nav">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? authLinks : guestLinks }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
  
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, null) (AppNavbar);