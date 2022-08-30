import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);

	const { loading, error, userData } = userRegister;

	const navigate = useNavigate();

	useEffect(() => {
		if (userData) {
			navigate("/");
		}
	}, [userData, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (!password || !email || !password) {
			setMessage("The fields is required!");
		} else {
			dispatch(register(name, email, password));
		}
	};
	return (
		<>
			<FormContainer>
				<h3 className="text-center mt-5">Register</h3>
				<hr />
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-2" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter name"
						/>
					</Form.Group>
					<Form.Group className="mb-2" controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter email"
						/>
					</Form.Group>
					<Form.Group className="mb-2" controlId="password">
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
						Have an account? {""}
						<Link to="/login" className="text-dark">
							Login Here
						</Link>
					</Col>
				</Row>
			</FormContainer>
		</>
	);
};

export default RegisterPage;
