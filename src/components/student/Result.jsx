import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Tabs,
  Tab,
  useTheme,
  Divider,
} from '@mui/material';
import {
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import authAxios from '../../authAxios';

const Result = () => {
  const theme = useTheme();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState(0);
  const [overallStats, setOverallStats] = useState({
    cgpa: 0,
    totalCredits: 0,
    totalSubjects: 0,
    highestMarks: 0,
    lowestMarks: 0,
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // const response = await authAxios.get('http://localhost:5000/student/results');
        const response = await authAxios.get('http://localhost:5000/api/students/66d95fa93a64cad16092e04c');
        console.log(response.data);
        // setResults(response.data);
        
        // Calculate overall statistics
        if (response.data.length > 0) {
          const allMarks = response.data.flatMap(sem => 
            sem.subjects.map(sub => sub.marks)
          );
          const totalCredits = response.data.reduce((sum, sem) => 
            sum + sem.subjects.reduce((credits, sub) => credits + sub.credits, 0), 0
          );
          const totalSubjects = response.data.reduce((sum, sem) => 
            sum + sem.subjects.length, 0
          );
          
          setOverallStats({
            cgpa: response.data.reduce((sum, sem) => sum + sem.sgpa, 0) / response.data.length,
            totalCredits,
            totalSubjects,
            highestMarks: Math.max(...allMarks),
            lowestMarks: Math.min(...allMarks),
          });
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleSemesterChange = (event, newValue) => {
    setSelectedSemester(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}>
        Academic Results
      </Typography>

      {/* Overall Performance Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SchoolIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">CGPA</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {overallStats.cgpa.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Credits</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {overallStats.totalCredits}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Subjects</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {overallStats.totalSubjects}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Highest Marks</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {overallStats.highestMarks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Semester Selection Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={selectedSemester}
          onChange={handleSemesterChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {results.map((semester, index) => (
            <Tab
              key={index}
              label={`Semester ${semester.semester}`}
              sx={{ minWidth: 'auto' }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Semester Results */}
      {results[selectedSemester] && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject Code</TableCell>
                      <TableCell>Subject Name</TableCell>
                      <TableCell align="right">Credits</TableCell>
                      <TableCell align="right">Marks</TableCell>
                      <TableCell align="right">Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results[selectedSemester].subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell>{subject.code}</TableCell>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell align="right">{subject.credits}</TableCell>
                        <TableCell align="right">{subject.marks}</TableCell>
                        <TableCell align="right">{subject.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Semester Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Semester SGPA
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {results[selectedSemester].sgpa.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Credits
                    </Typography>
                    <Typography variant="h6">
                      {results[selectedSemester].subjects.reduce((sum, sub) => sum + sub.credits, 0)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Subjects Passed
                    </Typography>
                    <Typography variant="h6">
                      {results[selectedSemester].subjects.filter(sub => sub.grade !== 'F').length} / {results[selectedSemester].subjects.length}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Result;
