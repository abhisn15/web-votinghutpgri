import React, { useState, useEffect, useRef } from "react";
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
	ChevronLeft,
	ChevronRight,
	Dashboard as DashboardIcon,
	Logout,
} from "@mui/icons-material";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

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

export default function Terkiller() {
	const [guruData, setGuruData] = useState([]);
	const [selectedOption, setSelectedOption] = useState("");
	const [nama_guru, setNama_guru] = useState("");
	const [terasik, setTerasik] = useState(0);
	const color = blue[500];
	const colorCyan = cyan[900];
	const [buttonColor, setButtonColor] = useState("");
	const [votes, setVotes] = useState({});
	const [hasVoted, setHasVoted] = useState(false);
	const [selectedGuru, setSelectedGuru] = useState(null);
	const [loading, setLoading] = React.useState(true);

	const onGuruChange = (guru) => {
		setSelectedGuru(guru);
	};

	const handleVote = async () => {
		if (selectedGuru) {
			try {
				const response = await axios.post("http://192.168.1.7:8000/api/vote", {
					guruId: selectedGuru.id,
					category: "terkiller",
				});
				// Refresh data guru setelah vote

				// Set hasVoted to true
				setHasVoted(true);

				// Simpan informasi suara pengguna di penyimpanan lokal
				localStorage.setItem("hasVotedTerkiller", '1');
			} catch (error) {
				console.error(error);
			}
		} else {
			alert("Pilih guru terlebih dahulu");
		}
	};

	const handleSubmit = async () => {
		try {
			const response = axios.post(
				"http://192.168.1.7:8000/api/updateVoteStatusTerkiller",
				{
					userId: localStorage.getItem("user_id"),
					hasVotedTerkiller: "1", // or '1', depending on the backend expectation
				},
			);
				 setLoading(false);

			if (selectedGuru) {
				// Memanggil fungsi handleVote untuk melakukan vote
				await handleVote();
				setHasVoted(true);
			} else {
				alert("Pilih guru terlebih dahulu");
			}
			localStorage.setItem("hasVotedTerkiller", "1");
		} catch (error) {
			console.error(error);
		}
	};

	const navigate = useNavigate();

	const hasAlerted = useRef(false);

		useEffect(() => {
			const isUser = localStorage.getItem("isUser") === "true";
			const voted = localStorage.getItem("hasVotedTerkiller") === "1";

			if (!isUser) {
				navigate("/", { replace: true });
			}

			if (voted && !hasAlerted.current) {
				navigate("/dashboard", { replace: true });
				alert("Hayoo kamu sudah vote tidak boleh vote 2 kali yah:D");

				// Set the state variable to true to indicate that the alert has been shown
				hasAlerted.current = true;
			}
		}, [navigate]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://192.168.1.7:8000/api/getGuru");
				const responseData = response.data.guru;
				setGuruData(responseData);
				 setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const handleLogout = () => {
		navigate("/login", { replace: true });
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
		navigate("/dashboard");
	};

	const formSubmit = (event) => {
		event.preventDefault();

		if (!hasVoted) {
			if (selectedGuru) {
				const newSelectedOption = selectedGuru.nama_guru;

				setVotes((prevVotes) => {
					const updatedVotes = { ...prevVotes };

					Object.keys(updatedVotes).forEach((option) => {
						if (option !== newSelectedOption) {
							updatedVotes[option] = 0;
						}
					});

					updatedVotes[newSelectedOption] =
						(updatedVotes[newSelectedOption] || 0) + 1;

					return updatedVotes;
				});

				// Set hasVoted to true
				setHasVoted(true);

				// Simpan informasi suara pengguna di penyimpanan lokal
				localStorage.setItem("hasVotedTerkiller", "true");

				// Perform other actions on form submission
				handleSubmit();
			} else {
				alert("Pilih guru terlebih dahulu");
			}
		} else {
			alert("Anda sudah memberikan suara!");
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
				<div className="container xl:mx-[150px]">
					{loading ? (
						<div className="flex items-center justify-center h-screen">
							<FaSpinner className="text-4xl animate-spin" />
						</div>
					) : (
						<form onSubmit={formSubmit}>
							<div className="radio">
								{guruData.map((guru) => (
									<div key={guru.id} className="flex">
										<label className="w-[72%]">
											<input
												type="radio"
												className="mr-2"
												value={selectedGuru ? selectedGuru.nama_guru : ""}
												checked={selectedGuru && selectedGuru.id === guru.id}
												onChange={() => onGuruChange(guru)}
											/>
											{guru.nama_guru}
										</label>
										<div className="">Suara: {guru.terkiller || 0}</div>
									</div>
								))}
							</div>
							<button
								className="px-5 py-2 rounded-md text-white mt-5 mb-5 bg-blue-500"
								type="submit"
								disabled={hasVoted}>
								{hasVoted ? "Sudah Memilih" : "Vote"}
							</button>
						</form>
					)}

					<button
						className="bg-black px-5 py-2 rounded-md text-white"
						onClick={handleBack}>
						Kembali
					</button>
				</div>
			</Box>
		</Box>
	);
}
