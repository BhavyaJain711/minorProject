import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  Paper,
  Stack,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Analytics as AnalyticsIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';

const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Box sx={{ color: 'primary.main', mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const PublicHome = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: "Comprehensive Exam Management",
      description: "Streamlined examination process from creation to evaluation, ensuring academic excellence and integrity."
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      title: "Advanced Assessment Tools",
      description: "Sophisticated tools for creating, managing, and evaluating various types of examinations."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: "Secure Examination Environment",
      description: "State-of-the-art security measures to maintain the integrity of the examination process."
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: "Efficient Result Processing",
      description: "Quick and accurate result processing with detailed analytics and reporting capabilities."
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      title: "Performance Analytics",
      description: "Comprehensive analytics to track and improve academic performance across the institution."
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />,
      title: "Academic Integrity",
      description: "Robust systems to ensure fair and transparent examination processes."
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          mt: "-24",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/pdeu-bg.jpeg')`,
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              color="inherit"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              PDEU Exam Portal
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Empowering Academic Excellence Through Advanced Examination Management
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button variant="contained" size="large">
                Learn More
              </Button>
              <Button variant="outlined" size="large" sx={{
                 color: 'white', 
                borderColor: 'white' 
                }}>
                Contact Us
              </Button>
            </Stack>
          </Box>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Our Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                About PDEU Exam Portal
              </Typography>
              <Typography variant="body1" paragraph>
                The PDEU Exam Portal represents our commitment to academic excellence and technological innovation. 
                As a premier educational institution, we have developed a comprehensive examination management system 
                that supports our mission of providing quality education.
              </Typography>
              <Typography variant="body1" paragraph>
                Our portal is designed to streamline the examination process while maintaining the highest standards 
                of academic integrity and security. It serves as a testament to our dedication to creating an 
                environment that fosters learning and growth.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: theme.shadows[4],
                }}
                src="/university-campus.jpg"
                alt="PDEU Campus"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body1" paragraph>
            For more information about our examination system or to schedule a demonstration, 
            please contact our academic support team.
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 2 }}>
            Contact Academic Support
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default PublicHome;