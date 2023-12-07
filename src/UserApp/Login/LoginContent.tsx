import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../assets/logo/logo.png";
import { LoginContext } from "./LoginContext";

import "../Style/LoginPage.scss";

export default function LoginContent(): JSX.Element {
  const { datalogin, handleOnchange, handleLogin } =
    React.useContext(LoginContext);

  return (
    <div className="login_container">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main", width: 150, height: 150 }}
            src={logo}
          ></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label={"Email"}
              onChange={(e) => handleOnchange(e, "email")}
              value={datalogin.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label={"Password"}
              onChange={(e) => handleOnchange(e, "password")}
              value={datalogin.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
