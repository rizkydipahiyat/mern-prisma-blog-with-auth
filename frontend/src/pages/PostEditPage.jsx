import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../actions/postActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PostEditPage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [message, setMessage] = useState("");

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const postCreate = useSelector((state) => state.postCreate);

	const { loading, error } = postCreate;

	const userLogin = useSelector((state) => state.userLogin);

	const { userData } = userLogin;

	useEffect(() => {
		if (!userData) {
			navigate("/login");
		}
	}, [userData, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (!title || !content) {
			setMessage("The fields is required");
		} else {
			dispatch(createPost(title, content));
			setTitle("");
			setContent("");
		}
		navigate("/create");
	};
	return (
		<>
			<FormContainer>
				<h3 className="text-center mt-5">Create Post</h3>
				<hr />
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter name"
						/>
					</Form.Group>
					<Form.Group controlId="content">
						<Form.Label>Content</Form.Label>
						<Form.Control
							as="textarea"
							type="text"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Enter name"
						/>
					</Form.Group>
					<Button type="submit" variant="dark" className="w-100 mt-2">
						Submit
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default PostEditPage;
