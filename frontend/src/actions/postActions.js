import axios from "axios";
import {
	POST_CREATE_FAIL,
	POST_CREATE_REQUEST,
	POST_CREATE_SUCCESS,
	POST_DETAIL_FAIL,
	POST_DETAIL_REQUEST,
	POST_DETAIL_SUCCESS,
	POST_LIST_FAIL,
	POST_LIST_MY_FAIL,
	POST_LIST_MY_REQUEST,
	POST_LIST_MY_SUCCESS,
	POST_LIST_REQUEST,
	POST_LIST_SUCCESS,
} from "../constants/postConstant";

export const listPosts = () => async (dispatch) => {
	try {
		dispatch({ type: POST_LIST_REQUEST });

		const { data } = await axios.get("/posts");

		dispatch({
			type: POST_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: POST_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const detailPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: POST_DETAIL_REQUEST });

		const { data } = await axios.get(`/post/${id}`);
		dispatch({
			type: POST_DETAIL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: POST_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createPost = (title, content) => async (dispatch, getState) => {
	try {
		dispatch({ type: POST_CREATE_REQUEST });

		const {
			userLogin: { userData },
		} = getState();

		const access_token = userData.token;
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `access_token=${access_token}`,
			},
		};

		const { data } = await axios.post("/create", { title, content }, config);
		console.log(data);

		dispatch({
			type: POST_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: POST_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listMyPosts = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: POST_LIST_MY_REQUEST,
		});

		// destructuring { userLogin } dari store
		const {
			userLogin: { userData },
		} = getState();

		const access_token = userData.token;
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `access_token=${access_token}`,
			},
		};

		const { data } = await axios.get(`/mypost`, config);

		dispatch({
			type: POST_LIST_MY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: POST_LIST_MY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
