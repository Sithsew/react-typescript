import React from "react";
import { Container, Typography, Paper, Grid, Box } from "@mui/material";
import "./About.css";
import lmsImage from "./lms.png";

const About: React.FC = () => {
  return (
    <Paper className="about" elevation={3}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center">
              <img src={lmsImage} alt="Library" className="image" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Typography variant="h4" align="center" gutterBottom>
                Welcome to the LMS
              </Typography>
              <Typography variant="body1" align="center" paragraph>
                Say goodbye to the ever-growing L&D backlog. Our intuitive platform empowers your L&D team and employees to capture, share, and preserve your company's collective knowledge.
              </Typography>
              <address>
                <Typography variant="body1" paragraph>
                  <h3>Level up your e-learning creation with EasyAI</h3>
                  <br />
                  From question generation to text simplification, creating e-learning courses just got easier and more effective than ever with the power of EasyAI. Create faster. Improve quality. Boost learning
                  <br />
                  <a href="https://www.easygenerator.com/en/">Discover EasyAI</a>
                </Typography>
              </address>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default About;
