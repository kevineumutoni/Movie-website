"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

// Add the prop typing here!
export default function SignInPage({ onSignIn }: { onSignIn?: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    if (onSignIn) onSignIn();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#000",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#111",
        }}
      >
        <Box
          component="img"
          src="/images/banner.png"
          alt="Banner"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 3,
            boxShadow: 4,
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#000000",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 7,
            bgcolor: "#000000",
            color: "#fff",
            borderRadius: 3,
            minWidth: 550,
          }}
        >
          <Typography variant="h4" align="center" mb={3} fontWeight={700}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={e => setUsername(e.target.value)}
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#fff" },
                },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#fff" },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#fff",
                color: "#000",
                p:2.4,
                fontWeight: 600,
                ":hover": { bgcolor: "#222" },
                mt: 2,
              }}
            >
              Login
            </Button>
          </Box>
          {success && (
            <Typography align="center" mt={3} color="#fff">
              Login successful! 
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}