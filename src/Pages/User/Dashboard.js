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
import { blue, cyan } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Terasik from "./Terasik";
import Terkiller from "./Terkiller";
import Terinspiratif from "./Terinspiratif";
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
localStorage.getItem("isUser");

export default function Dashboard() {
	const color = blue[500];
	const [showCategory, setShowCategory] = React.useState([]);
	const navigate = useNavigate();

	const username = localStorage.getItem("isUsername");

	React.useEffect(() => {
		const isUser = localStorage.getItem("isUser") === "true";

		if (!isUser) {
			navigate("/", { replace: true });
		}
	}, [navigate]);

	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	// Check if the user is logged in as a regular user

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://192.168.1.7:8000/api/category",
				);
				const responseData = response.data.category;
				setShowCategory(responseData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);


	const handleKategori = (id) => {
		switch (id) {
			case 1:
				navigate("/dashboard/guru-terasik");
				break;
			case 2:
				navigate("/dashboard/guru-terkiller");
				break;
			case 3:
				navigate("/dashboard/guru-terinspiratif");
				break;
			default:
				break;
		}
	};

	const handleLogout = () => {
		navigate("/login", { replace: true });
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
								<DashboardIcon sx={{ color: color }} />
							</ListItemIcon>

							<ListItemText
								primary="Dashboard"
								sx={{ opacity: open ? 1 : 0 }}
							/>
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
					{/* Other list items */}
				</List>
				<Divider />
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<div className="mb-10">
					<h1 className="text-2xl font-[500] mb-4">Hallo, { username }</h1>
					<h1 className="text-xl font-[400]">Selamat Datang Di Situ Kami, Ayoo voting gurumu sesuai kategori apa yang kamu vote!</h1>
				</div>
				<div className="flex flex-wrap justify-center items-center gap-10">
					{showCategory.map((item) => (
						<Card key={item.id} sx={{ maxWidth: 270 }}>
							<CardMedia
								component="img"
								alt={item.guru}
								height="140"
								image={item.img}
								sx={{ height: 220 }}
							/>
							<CardContent>
								<Typography gutterBottom variant="p" component="div">
									{item.category}
								</Typography>
							</CardContent>
							<div className="flex justify-center bg-slate-200">
								<CardActions>
									<Button
										onClick={() => handleKategori(item.id)}
										className="w-[400px]"
										size="small">
										Mulai Voting
									</Button>
								</CardActions>
							</div>
						</Card>
					))}
				</div>
			</Box>
		</Box>
	);
}
