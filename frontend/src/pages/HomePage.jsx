import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../actions/postActions";
import Content from "../components/Content";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomePage = () => {
	const dispatch = useDispatch();

	const postList = useSelector((state) => state.postList);
	const { loading, error, posts } = postList;

	useEffect(() => {
		dispatch(listPosts());
	}, [dispatch]);
	return (
		<>
			<Container>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<>
						{posts.map((post, i) => (
							<div key={i}>
								<Content post={post} />
							</div>
						))}
					</>
				)}
			</Container>
		</>
	);
};

export default HomePage;
