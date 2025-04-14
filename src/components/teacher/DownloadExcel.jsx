import React, { useEffect, useState } from 'react';
import authAxios from "../../authAxios";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';

const ExamComponents = () => {
  const theme = useTheme();
  const [examComponents, setExamComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchExamComponents = async () => {
      try {
        const response = await authAxios.get('http://localhost:3000/api/examComponents');
        setExamComponents(response.data.docs);
      } catch (error) {
        console.error('Error fetching exam components:', error);
      }
    };

    fetchExamComponents();
  }, []);

  // Handle selection of an exam component
  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
    setOpenDialog(true);
  };

  // Handle downloading of Excel for selected exam component
  const handleDownloadExcel = async (componentId) => {
    try {
      const response = await authAxios.get(`http://localhost:5000/teacher/download-excel/${componentId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Marks_Entry_${componentId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading Excel:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}>
        Exam Components
      </Typography>

      <TableContainer component={Paper} sx={{ 
        backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
        boxShadow: theme.shadows[2]
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Exam Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Year</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Semester</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Components</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examComponents.map((exam) => (
              <TableRow key={exam.id} hover>
                <TableCell>{exam.name}</TableCell>
                <TableCell>{exam.year}</TableCell>
                <TableCell>{exam.semester}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {exam.components.map((component) => (
                      <Button
                        key={component.id}
                        variant="outlined"
                        size="small"
                        startIcon={<InfoIcon />}
                        onClick={() => handleSelectComponent(component)}
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        {component.name}
                      </Button>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="Download Excel">
                    <IconButton
                      color="primary"
                      onClick={() => handleDownloadExcel(exam.id)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Component Details</DialogTitle>
        <DialogContent>
          {selectedComponent && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                <strong>Name:</strong> {selectedComponent.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                <strong>Weightage:</strong> {selectedComponent.weightage}%
              </Typography>
              {selectedComponent.marks && (
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  <strong>Marks:</strong> {selectedComponent.marks}
                </Typography>
              )}
              <Typography variant="subtitle1">
                <strong>Type:</strong> {selectedComponent.type || 'N/A'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExamComponents;
