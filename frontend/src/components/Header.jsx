import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);

	const { userData } = userLogin;

	const logoutHandler = () => {
		window.location.href = "/";
		dispatch(logout());
		localStorage.clear();
	};
	return (
		<header>
			<Navbar collapseOnSelect expand="lg" bg="white" variant="white">
				<Container>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<LinkContainer to="/">
								<Navbar.Brand>Medium</Navbar.Brand>
							</LinkContainer>
						</Nav>
						<Nav>
							{userData && userData ? (
								<NavDropdown title={userData.name} id="collasible-nav-dropdown">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/create">
										<NavDropdown.Item>Create Post</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>Sign In</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<hr />
		</header>
	);
};

export default Header;
