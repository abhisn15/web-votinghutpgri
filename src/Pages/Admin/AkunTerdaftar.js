import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import {
	AccountCircleOutlined,
	ChevronLeft,
	ChevronRight,
	Dashboard as DashboardIcon,
	Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Dashboard from "./DashboardAdmin";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const drawerWidth = 240;

// Use theme.spacing instead of hardcoding values
const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));
export const EditUser = ({ selectedUser, handleCancel }) => {
	const [editedUsername, setEditedUsername] = React.useState(
		selectedUser?.username || "",
	);
	const [editedPassword, setEditedPassword] = React.useState("");

	const handleUsernameChange = (e) => {
		setEditedUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setEditedPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.put(
				`http://192.168.1.7:8000/api/user/${selectedUser.id}`,
				{
					username: editedUsername,
					password: editedPassword,
				},
			);
			console.log(response)

			// Assuming the response contains the updated user data
			const updatedUser = response.data.user;

			// Call the handleEdit function with the updated user data
			handleEdit(updatedUser);
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	};

	const handleEdit = (updatedUser) => {
		// Handle the updated user data, e.g., update state or trigger a callback
		console.log("User updated:", updatedUser);
		// You can add more logic based on your requirements
	};

	return (
		<div>
			<h2>Edit User</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Username:
					<input
						type="text"
						className="border ml-2 rounded-md border-black mr-2"
						value={editedUsername}
						onChange={handleUsernameChange}
					/>
				</label>
				<div className="py-2">
					<label>
						Password:
						<input
							className="border ml-2 rounded-md border-black"
							type="password"
							value={editedPassword}
							onChange={handlePasswordChange}
						/>
					</label>
				</div>
				<div className="">
					<button type="submit" className="mr-4">
						Save
					</button>
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};


export default function AkunTerdaftar() {
	const navigate = useNavigate();
	const [showCategory, setShowCategory] = React.useState([]);
	const [users, setUsers] = React.useState([]);
	const [showEditForm, setShowEditForm] = React.useState(false);
	const [selectedUser, setSelectedUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true);

	const handleEdit = (user) => {
		// Set the selected user for editing
		setSelectedUser(user);
		// Show the edit form
		setShowEditForm(true);
	};

	const handleCancelEdit = () => {
		// Reset the selected user and hide the edit form
		setSelectedUser(null);
		setShowEditForm(false);
	};

	const handleLogout = () => {
		// Hapus status login dan status admin dari sessionStorage
		navigate("/", { replace: true });
	};

	React.useEffect(() => {
		// Fetch user data from your API
		const fetchData = async () => {
			try {
				const response = await axios.get("http://192.168.1.7:8000/api/user");
				const responseData = response.data.user;
				setUsers(responseData);
				 setLoading(false);

			}
			catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchData();
	}, []);

const handleDelete = async (userId) => {
	try {
		// Make a DELETE request to the API endpoint to delete the user
		await axios.delete(`http://192.168.1.7:8000/api/destroy/${userId}`);

		// Update the state to reflect the deleted user
		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
	} catch (error) {
		console.error("Error deleting user:", error);
	}
};

	React.useEffect(() => {
		const isAdmin = localStorage.getItem("isAdmin") === "true";
		if (!isAdmin) {
			navigate("/login", { replace: true });
		}
	}, [navigate]);

	const color = blue[500];

	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleDashboard = () => {
		navigate("/dashboard-admin");
	};

	const handleAkun = () => {
		navigate("/akun-terdaftar");
	};

	const handleKategori = (id) => {
		switch (id) {
			case 1:
				navigate("/dashboard/guru-terasik-admin");
				break;
			case 2:
				navigate("/dashboard/guru-terkiller-admin");
				break;
			case 3:
				navigate("/dashboard/guru-terinspiratif-admin");
				break;
			default:
				break;
		}
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" color="" enableColorOnDark open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Osis SMK Negeri 40
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<ListItem disablePadding onClick={handleDashboard}>
						<ListItemButton
							sx={{
								px: 2.5,
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText
								primary="Dashboard"
								sx={{ opacity: open ? 1 : 0 }}
							/>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding onClick={handleAkun}>
						<ListItemButton
							sx={{
								px: 2.5,
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}>
								<AccountCircleOutlined sx={{ color: color }} />
							</ListItemIcon>
							<ListItemText primary="Account" sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={handleLogout}
							sx={{
								px: 2.5,
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}>
								<Logout />
							</ListItemIcon>
							<ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
					<ListItemText
						primary="Created By Abhi Surya Nugroho"
						sx={{ textAlign: "center", opacity: open ? 1 : 0 }}
					/>
					{/* Other list items */}
				</List>
				<Divider />
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				{loading ? (
					<div className="flex items-center justify-center h-screen">
						<FaSpinner className="text-4xl animate-spin" />
					</div>
				) : (
					<div>
						{showEditForm ? (
							// Render the EditUser component with the selected user and cancel edit function
							<EditUser
								selectedUser={selectedUser}
								handleEdit={handleEdit}
								handleCancel={handleCancelEdit}
							/>
						) : (
							<table>
								<thead>
									<tr>
										<th>Nomor</th>
										<div className="ml-4">
											<th>Username</th>
										</div>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user) => (
										<tr key={user.id}>
											<td className="text-center">{user.id}</td>
											<td className="text-center">{user.username}</td>
											<td>
												<button
													onClick={() => handleEdit(user)}
													className="bg-blue-500 text-white px-3 py-2 rounded mr-2 mt-2">
													Edit
												</button>
												<button
													onClick={() => handleDelete(user.id)}
													className="bg-red-500 text-white px-3 py-2 rounded mr-2 mt-2">
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				)}
			</Box>
		</Box>
	);
}
