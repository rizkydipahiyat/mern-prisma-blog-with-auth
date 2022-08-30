import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);

	const { loading, error, userData } = userLogin;
	console.log(userData);

	useEffect(() => {
		if (userData) {
			navigate("/");
		}
	}, [userData, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<>
			<FormContainer>
				<h3 className="text-center mt-5">Login</h3>
				<hr />
				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="email" className="mb-2">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter email"
						/>
					</Form.Group>
					<Form.Group className="mb-2">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter password"
						/>
					</Form.Group>
					<Button type="submit" variant="dark" className="w-100 mt-3">
						Submit
					</Button>
				</Form>
				<Row className="py-3">
					<Col>
						New Member? {""}
						<Link to="/register" className="text-dark">
							Register Here
						</Link>
					</Col>
				</Row>
			</FormContainer>
		</>
	);
};

export default LoginPage;
