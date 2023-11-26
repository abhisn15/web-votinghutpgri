import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { blue, cyan } from "@mui/material/colors";
import {
  AccountCircleOutlined,
	ChevronLeft,
	ChevronRight,
	Dashboard as DashboardIcon,
	Logout,
} from "@mui/icons-material";
import axios from "axios";

const drawerWidth = 240;

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

export default function TerinspiratifAdmin() {
	const [guruData, setGuruData] = useState([]);
	const [selectedOption, setSelectedOption] = useState("");
	const [votedData, setVotedData] = useState("");
	const color = blue[500];
	const colorCyan = cyan[900];
  const [buttonColor, setButtonColor] = useState("");
  const [loading, setLoading] = React.useState(true);
  
	useEffect(() => {
		setButtonColor(selectedOption ? "#2449EE" : "#B0B0B0");
	}, [selectedOption]);

	const navigate = useNavigate();
	useEffect(() => {
		const isAdmin = localStorage.getItem("isAdmin") === "true";
		if (!isAdmin) {
			navigate("/", { replace: true });
		}
	}, [navigate]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://192.168.1.7:8000/api/getGuru");
				const responseData = response.data.guru;
				setGuruData(responseData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://192.168.1.7:8000/api/getGuru");
				const responseData = response.data.hasVotedTerinspiratif;
				setVotedData(responseData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const handleLogout = () => {
		navigate("/", { replace: true });
	};

	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleBack = () => {
		navigate("/dashboard-admin");
	};

	const onValueChange = (event) => {
		setSelectedOption(event.target.value);
		console.log(selectedOption);
	};

	const formSubmit = (event) => {
		event.preventDefault();
		// Handle form submission
  };
  
  	const handleAkun = () => {
			navigate("/akun-terdaftar");
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
					<ListItem disablePadding>
						<ListItemButton sx={{ px: 2.5 }}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}>
								<DashboardIcon sx={{ color: color }} />
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
								<AccountCircleOutlined />
							</ListItemIcon>

							<ListItemText primary="Account" sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={handleLogout} sx={{ px: 2.5 }}>
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
				</List>
				<Divider />
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<div className="container mx-auto">
					{guruData.map((guru) => (
						<div className="flex" key={guru.id}>
							<div className="w-[72%]">{guru.nama_guru}</div>
							<div className="">Suara: {guru.terinspiratif}</div>
						</div>
					))}
					<button onClick={handleBack}>Kembali</button>
				</div>
			</Box>
		</Box>
	);
}
