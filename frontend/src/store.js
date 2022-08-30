import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
	postCreateReducer,
	postDetailReducer,
	postListMyReducer,
	postListReducer,
} from "./reducers/postReducer";
import {
	userDetailReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
	postList: postListReducer,
	postDetail: postDetailReducer,
	postCreate: postCreateReducer,
	postListMy: postListMyReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetail: userDetailReducer,
	userUpdateProfile: userUpdateProfileReducer,
});

const userDataFromStorage = localStorage.getItem("userData")
	? JSON.parse(localStorage.getItem("userData"))
	: null;

const initialState = {
	userLogin: { userData: userDataFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
