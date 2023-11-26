import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginChecked() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [buttonColor, setButtonColor] = useState("");
	const [hasVoted, setHasVoted] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		setButtonColor(username && password ? "#2449EE" : "#B0B0B0");
	}, [username, password]);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleLoginClick();
		}
	};

	localStorage.setItem("isUser", 'true');
	localStorage.removeItem("user_id");
	localStorage.removeItem("isAdmin");
	localStorage.removeItem("isUser");
	localStorage.removeItem("user_id");
	localStorage.removeItem("category_id");
	localStorage.removeItem("isUsername");
	localStorage.removeItem("hasVoted");
	localStorage.removeItem(
		"hasVotedTerkiller"
	);
	localStorage.removeItem(
		"hasVotedTerinspiratif"
	);

	// Inside the useEffect block or where you check the user's authentication status

	useEffect(() => {
		// Redirect to login if user tries to navigate to '/'
		const handleRedirect = () => {
			const currentPath = window.location.pathname;

			if (currentPath === "/" || currentPath === "") {
				navigate("/login");
			}
		};

		handleRedirect();

		// Check if user is registered
		const isRegistered = localStorage.getItem("isRegister") === "true";

		// Check the user's role directly from localStorage
		const isUser = localStorage.getItem("isUser") === "true";
		const isAdmin = localStorage.getItem("isAdmin") === "true";

		// Redirect to appropriate page based on registration status and user role
		if (isRegistered) {
			if (isAdmin) {
				navigate("/dashboard-admin");
			} else if (isUser) {
				navigate("/dashboard");
			}
		}
	}, [navigate]);

	const handleLoginClick = async () => {
		try {
			const response = await axios.post(process.env.REACT_APP_API_LOGIN, {
				username,
				password,
			});

			const responseData = response.data;
			localStorage.setItem("token", responseData.authorization.token);
			localStorage.setItem("user_id", responseData.user.id);
			localStorage.setItem("isUsername", responseData.user.username);
			localStorage.setItem("isAdmin", responseData.user.role === "0");
			localStorage.setItem("isUser", responseData.user.role === "1");
			localStorage.setItem("hasVoted", responseData.user.hasVoted);
			localStorage.setItem(
				"hasVotedTerkiller",
				responseData.user.hasVotedTerkiller,
			);
			localStorage.setItem(
				"hasVotedTerinspiratif",
				responseData.user.hasVotedTerinspiratif,
			);

			if (responseData.authorization && responseData.authorization.token) {
				if (responseData.user.role === "0") {
					navigate("/dashboard-admin");
				} else {
					navigate("/dashboard");
				}

				alert("Login berhasil!");
			}
		} catch (error) {
			console.error("Login Failed!", error);
			alert("Username dan Passwordmu salah!");
		}
	};

	return (
		<section className="gradient-form h-screen flex justify-center items-center bg-neutral-200 dark:bg-neutral-700">
			<img
				className="object-cover h-screen w-full"
				src="https://wallpaperaccess.com/full/1799660.jpg"
				alt="logo"
			/>
			{/* Left column container*/}
			<div className="absolute rounded-xl bg-neutral-800 text-white px-4 max-[640px]:px-10 max-[640px]:pt-5 max-[768px]:pb-10 sm:px-20 sm:pt-10 md:pt-0 md:px-10 lg:w-6/12">
				<div className="md:mx-6 md:p-12">
					{/* Logo */}
					<div className="text-center">
						<img
							className="mx-auto rounded-full max-[640px]:w-28 max-[640px]:w-28 md:w-40 sm:w-32 mb-4"
							src="../../assets/logo.png"
							alt="logo"
						/>
						<h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">SIGN UP</h4>
					</div>

					<form>
						<p className="mb-4">Please login to your account</p>
						{/* Username input */}
						<div className="relative mb-4" data-te-input-wrapper-init>
							<input
								type="text"
								className="peer block min-h-[auto] w-full rounded border border-inherit bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 focus:border-blue-500 focus:ring focus:ring-blue-500"
								id="exampleFormControlInput1"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</div>

						{/* Password input */}
						<div className="relative mb-4" data-te-input-wrapper-init>
							<input
								type="password"
								className="peer block min-h-[auto] w-full rounded border border-inherit bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200  focus:border-blue-500 focus:ring focus:ring-blue-500"
								id="exampleFormControlInput11"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</div>

						{/* Submit button */}
						<div className="mb- pb-1 pt-1 text-center">
							<Link to={handleLoginClick}>
								<button
									onClick={handleLoginClick}
									className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
									type="button"
									data-te-ripple-init
									data-te-ripple-color="light"
									style={{
										background: buttonColor,
									}}>
									Log in
								</button>
							</Link>
						</div>

						{/* Register button */}
					</form>
				</div>
			</div>
		</section>
	);
}
