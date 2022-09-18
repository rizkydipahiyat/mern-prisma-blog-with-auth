import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ContentDetail from "./pages/ContentDetail";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostEditPage from "./pages/PostEditPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
	return (
		<Router>
			<Header />
			<main className="container mt-2">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/post/:id" element={<ContentDetail />} />
					<Route path="/edit/post/:id" element={<PostEditPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/create" element={<PostPage />} />
					<Route path="/profile" element={<ProfilePage />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
