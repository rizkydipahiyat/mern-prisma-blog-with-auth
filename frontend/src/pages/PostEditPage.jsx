import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { detailPost, updatePost } from "../actions/postActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { POST_UPDATE_RESET } from "../constants/postConstant";

const PostEditPage = () => {
	const { id } = useParams();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [published, setPublished] = useState(false);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const postDetail = useSelector((state) => state.postDetail);
	// eslint-disable-next-line
	const { loading, error, post } = postDetail;

	const postUpdate = useSelector((state) => state.postUpdate);

	const { success: successUpdate } = postUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: POST_UPDATE_RESET });
			navigate("/profile");
		} else {
			if (!post.title || post.id !== id) {
				dispatch(detailPost(id));
			}
			setTitle(post.title);
			setContent(post.content);
			setPublished(post.published);
		}
		// eslint-disable-next-line
	}, [dispatch, id, navigate, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updatePost({
				id: id,
				title,
				content,
				published,
			})
		);
		window.reload();
		navigate("/profile");
	};
	return (
		<>
			<FormContainer>
				<h3 className="text-center mt-5">Edit Post</h3>
				<hr />
				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader />}
				{successUpdate && <Message variant="success">Post Updated</Message>}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="title" className="mb-2">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter name"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="content" className="mb-2">
						<Form.Label>Content</Form.Label>
						<Form.Control
							type="text"
							as="textarea"
							placeholder="Enter content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="published" className="mb-2">
						<Form.Check
							type="checkbox"
							label="Published"
							checked={published}
							onChange={(e) => setPublished(e.target.checked)}
						></Form.Check>
					</Form.Group>
					<Button type="submit" variant="dark" className="w-100">
						Update
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default PostEditPage;
