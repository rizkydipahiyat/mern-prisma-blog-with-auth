import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { deletePost, listMyPosts } from "../actions/postActions";
import { getUserDetail, updateUserProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstant";

const ProfilePage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const userDetail = useSelector((state) => state.userDetail);

	const { loading, error, user } = userDetail;

	const userLogin = useSelector((state) => state.userLogin);

	const { userData } = userLogin;

	const postListMy = useSelector((state) => state.postListMy);

	const { loading: loadingPosts, error: errorPosts, posts } = postListMy;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

	const { success } = userUpdateProfile;

	const postDelete = useSelector((state) => state.postDelete);

	const { success: successDelete } = postDelete;

	useEffect(() => {
		if (!userData) {
			navigate("/login");
		} else {
			if (!user || !user.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserDetail("profile"));
				dispatch(listMyPosts());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [userData, navigate, success, user, dispatch, successDelete]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUserProfile({ id: user.id, name, email, password }));
	};
	const deleteHandler = (id) => {
		if (window.confirm("Anda Yakin Ingin Menghapus Post Ini?")) {
			dispatch(deletePost(id));
		}
	};
	return (
		<Row>
			<Col md={3} className="mb-3">
				<h3>User Profile</h3>
				<hr />
				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader />}
				{success && <Message variant="success">Profile Updated</Message>}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name" className="mb-3">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="email" className="mb-3">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="password" className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type="submit" variant="dark" className="w-100">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h3>Our Post</h3>
				<hr />
				<Button
					onClick={() => window.location.reload()}
					variant="dark"
					className="mb-3 "
				>
					Refresh{" "}
				</Button>
				{loadingPosts ? (
					<Loader />
				) : errorPosts ? (
					<Message variant="danger">{errorPosts}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>Id</th>
								<th>Title</th>
								<th>Content</th>
								<th>Published</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{posts.map((post, i) => (
								<tr key={i}>
									<td>{i + 1}</td>
									<td>
										<a
											href={`/post/${post.id}`}
											style={{ textDecoration: "none", color: "#000" }}
										>
											{post.title.substring(0, 25)}
										</a>
									</td>
									<td>{post.content.substring(0, 15)}...</td>
									<td>{post.published ? "Yes" : "No"}</td>
									<td>
										<LinkContainer
											to={`/post/${post.id}/edit`}
											className="mr-2"
										>
											<Button className="btn-sm" variant="warning">
												Edit
											</Button>
										</LinkContainer>{" "}
										<Button
											className="btn-sm"
											variant="danger"
											onClick={() => deleteHandler(post.id)}
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfilePage;
