import React from "react";
import { Typography, Container } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Container component="footer" style={{ marginTop: "auto", textAlign: "center" }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} LMS
      </Typography>
    </Container>
  );
};

export default Footer;
