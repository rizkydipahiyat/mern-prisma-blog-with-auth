import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Content = ({ post }) => {
	return (
		<>
			{post.published ? (
				<Card className="my-3 p-3">
					<Link
						to={`/post/${post.id}`}
						style={{ textDecoration: "none", color: "black" }}
					>
						<Card.Body>
							<Card.Subtitle>{post.title}</Card.Subtitle>
							<Card.Text>{post.content}</Card.Text>
						</Card.Body>
					</Link>
				</Card>
			) : null}
		</>
	);
};

export default Content;
