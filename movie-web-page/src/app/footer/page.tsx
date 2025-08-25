"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#000000",
        color: "#fff",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 8 },
        fontSize: { xs: "0.95rem", md: "1rem" },
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={6}
        justifyContent="center"
        alignItems={{ xs: "flex-start", md: "flex-start" }}
        sx={{ mb: 4 }}
      >
        <Box minWidth={200} flex={1}>
          <Typography fontWeight={600} mb={1} variant="subtitle1">
            Download Our App
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Image src="/images/popcorn.png" alt="Moovie logo" width={32} height={32} />
            <Typography ml={1.5} fontWeight={500}>
              Moovie
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Image
              src="/images/store.png"
              alt="App Store"
              width={120}
              height={40}
              style={{ borderRadius: 8, background: "#fff" }}
            />
            <Image
              src="/images/playstore.png"
              alt="Google Play"
              width={120}
              height={40}
              style={{ borderRadius: 8, background: "#fff" }}
            />
          </Box>
        </Box>
        <Box minWidth={140} flex={1}>
          <Typography fontWeight={600} mb={1} variant="subtitle1">
            Navigation
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mt: 2 }}>
            <li><Link href="#" color="inherit" underline="hover">Home</Link></li>
            <li><Link href="#" color="inherit" underline="hover">My list</Link></li>
            <li><Link href="#" color="inherit" underline="hover">About Us</Link></li>
          </Box>
        </Box>
        {/* Legal */}
        <Box minWidth={140} flex={1}>
          <Typography fontWeight={600} mb={1} variant="subtitle1">
            Legal
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mt: 2 }}>
            <li><Link href="#" color="inherit" underline="hover">General Info</Link></li>
            <li><Link href="#" color="inherit" underline="hover">Privacy Policy</Link></li>
            <li><Link href="#" color="inherit" underline="hover">Terms of Service</Link></li>
          </Box>
        </Box>
        <Box minWidth={200} flex={1}>
          <Typography fontWeight={600} mb={1} variant="subtitle1">
            Contact Us:
          </Typography>
          <Typography mt={2} fontSize="0.98rem">
            support@egymovies.com
          </Typography>
          <Typography fontSize="0.98rem">
            Tel: +201045963322
          </Typography>
          <Typography mt={2} fontSize="0.96rem">
            OR By Using:
          </Typography>
          <Box display="flex" gap={2} mt={2}>
            <IconButton href="#" color="inherit" aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton href="#" color="inherit" aria-label="YouTube">
              <YouTubeIcon />
            </IconButton>
            <IconButton href="#" color="inherit" aria-label="WhatsApp">
              <WhatsAppIcon />
            </IconButton>
          </Box>
        </Box>
        <Box minWidth={140} flex={1}>
          <Typography fontWeight={600} mb={1} variant="subtitle1">
            Share Website Via:
          </Typography>
          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <FacebookIcon fontSize="small" />
              <Typography fontSize="0.98rem">Facebook</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <InstagramIcon fontSize="small" />
              <Typography fontSize="0.98rem">Instagram</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ bgcolor: "grey.800", my: 4 }} />
      <Box textAlign="center" fontSize="0.95rem" color="grey.400">
        @ 2023 Movies. All Rights Reserved.
      </Box>
    </Box>
  );
}