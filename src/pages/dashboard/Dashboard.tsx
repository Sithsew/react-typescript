import React from 'react';
import './Dashboard.css';
import { Container, Paper, Typography } from '@mui/material';
import { getUserName } from "../auth/authSlice";
import welcomeGif from "./welcome.gif";

const Dashboard: React.FC = () => {
  const name = getUserName();
  const timeOfDay = getTimeOfDay();

  function getTimeOfDay() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'morning';
    } else if (currentHour < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  }

  function getGreeting() {
    switch (timeOfDay) {
      case 'morning':
        return 'Good Morning';
      case 'afternoon':
        return 'Good Afternoon';
      case 'evening':
        return 'Good Evening';
      default:
        return 'Hi';
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" mb={2}>
          {getGreeting()}, {name}
        </Typography>
        <Typography variant="h5" component="h1" mb={2}>
          Welcome to the App!
        </Typography>
        <div className="gif-container">
          <img src={welcomeGif} alt="Welcome GIF" className="welcome-gif" />
        </div>
      </Paper>
    </Container>
  );
};

export default Dashboard;
