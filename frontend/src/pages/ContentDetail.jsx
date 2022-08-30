import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Container, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { detailPost } from "../actions/postActions";
import { useLocation } from "react-router-dom";

const ContentDetail = () => {
	const location = useLocation();

	// contoh: post[0] /[1] id[2]
	const id = location.pathname.split("/")[2];
	const dispatch = useDispatch();

	const postDetail = useSelector((state) => state.postDetail);
	const { loading, error, post } = postDetail;

	useEffect(() => {
		dispatch(detailPost(id));
	}, [dispatch, id]);
	return (
		<>
			<Container>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Row>
						<Col>
							<Card className="p-3">
								<Card.Subtitle as="h4">{post.title}</Card.Subtitle>
								<Card.Text>{post.content}</Card.Text>
							</Card>
						</Col>
					</Row>
				)}
			</Container>
		</>
	);
};

export default ContentDetail;
