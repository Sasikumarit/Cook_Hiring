import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useHistory } from "react-router-dom";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import Axios from "axios";
import { DateTime } from "luxon";
import { Roles } from "../../util/Roles";

const adminPages = ["Dashboard", "Applied Jobs", "Jobs Posted"];
const customerPages = ["Dashboard", "Post Jobs", "Applied Candidates"];
const jobseekerPages = ["Dashboard", "Applied Jobs"];
const settings = ["Profile", "Logout"];

const jobGridColumns = [
  { field: "id", headerName: "S.No", width: 90 },
  {
    field: "jobdescription",
    headerName: "Job Description",
    width: 150,
    editable: true,
  },
  {
    field: "wageperday",
    headerName: "Wage Per Day",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    editable: true,
  },
  {
    field: "fromdate",
    headerName: "From Date",
    width: 150,
    editable: true,
    valueGetter: (params) =>
      `${DateTime.fromISO(params.row.fromdate).toFormat("dd-MM-yyyy")}`,
  },
  {
    field: "todate",
    headerName: "To Date",
    width: 110,
    editable: true,
    valueGetter: (params) =>
      `${DateTime.fromISO(params.row.todate).toFormat("dd-MM-yyyy")}`,
  },

  {
    field: "userid",
    headerName: "User",
    width: 110,
    editable: true,
  },
];

const Dashboard = (props) => {
  const history = useHistory();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(history.location.state);
  const [jobState, setJobState] = React.useState({
    columns: jobGridColumns,
    rows: [],
  });
  const [jobSeekerState, setJobSeekerState] = React.useState({
    columns: [],
    rows: [],
  });
  const [adminState, setAdminState] = React.useState({ columns: [], rows: [] });

  React.useEffect(() => {
    async function fetch() {
      await Axios.get(process.env.REACT_APP_ServerHost + `jobs`).then((res) => {
        if (res.status === 200) {
          setJobState({ ...jobState, rows: res.data.response });
          return res.data.response;
        }
        return res;
      });
    }
    fetch();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (title) => {
    setAnchorElUser(null);

    if (title === "Logout") {
      localStorage.removeItem("currentUser");
      history.push("/");
    }
  };

  return (
    <>
      <div className="dashboard">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Cook Hiring
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {user?.userrole.toLowerCase() === Roles.Admin.toLowerCase() &&
                    adminPages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}

                  {user?.userrole.toLowerCase() === Roles.Cook.toLowerCase() &&
                    jobseekerPages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}

                  {user?.userrole.toLowerCase() ===
                    Roles.Customer.toLowerCase() &&
                    customerPages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                </Menu>
              </Box>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Cook Hiring
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {user?.userrole.toLowerCase() === Roles.Admin.toLowerCase() &&
                  adminPages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}

                {user?.userrole.toLowerCase() === Roles.Cook.toLowerCase() &&
                  jobseekerPages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}

                {user?.userrole.toLowerCase() ===
                  Roles.Customer.toLowerCase() &&
                  customerPages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <div style={{ width: "65%", margin: "2%" }}>
          <h1>Jobs Data</h1>
          <CustomDataGrid columns={jobState.columns} rows={jobState.rows} />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
