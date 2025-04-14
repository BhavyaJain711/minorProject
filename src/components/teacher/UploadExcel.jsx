import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
  useTheme,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Upload as UploadIcon, CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import authAxios from '../../authAxios';

const UploadExcel = () => {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });
  const [examDetails, setExamDetails] = useState({
    examName: '',
    year: '',
    semester: '',
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && 
          file.type !== 'application/vnd.ms-excel') {
        setUploadStatus({
          loading: false,
          success: false,
          error: 'Please upload a valid Excel file (.xlsx or .xls)',
        });
        return;
      }
      setSelectedFile(file);
      setUploadStatus({ loading: false, success: false, error: null });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({
        loading: false,
        success: false,
        error: 'Please select a file to upload',
      });
      return;
    }

    setUploadStatus({ loading: true, success: false, error: null });

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('examName', examDetails.examName);
    formData.append('year', examDetails.year);
    formData.append('semester', examDetails.semester);

    try {
      const response = await authAxios.post('http://localhost:5000/teacher/upload-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus({
        loading: false,
        success: true,
        error: null,
      });
      setSelectedFile(null);
      // Reset file input
      document.getElementById('file-upload').value = '';
    } catch (error) {
      setUploadStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Error uploading file. Please try again.',
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus({ loading: false, success: false, error: null });
    // Reset file input
    document.getElementById('file-upload').value = '';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}>
        Upload Exam Marks
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Excel Sheet
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please upload the filled Excel sheet containing student marks. Ensure the file is in the correct format.
              </Typography>

              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: theme.palette.primary.main,
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)',
                }}
              >
                <input
                  accept=".xlsx,.xls"
                  style={{ display: 'none' }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mb: 2 }}
                  >
                    Select File
                  </Button>
                </label>
                {selectedFile && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Selected file: {selectedFile.name}
                    </Typography>
                    <Tooltip title="Remove file">
                      <IconButton
                        color="error"
                        onClick={handleRemoveFile}
                        size="small"
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>

              {uploadStatus.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {uploadStatus.error}
                </Alert>
              )}

              {uploadStatus.success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  File uploaded successfully!
                </Alert>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!selectedFile || uploadStatus.loading}
                startIcon={uploadStatus.loading ? <CircularProgress size={20} /> : <UploadIcon />}
                fullWidth
              >
                {uploadStatus.loading ? 'Uploading...' : 'Upload File'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please follow these guidelines when preparing your Excel file:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Ensure the Excel file follows the template format
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Do not modify the column headers
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Enter marks in the correct format (numbers only)
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Save the file in .xlsx or .xls format
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Maximum file size: 10MB
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => window.open('/templates/marks-template.xlsx', '_blank')}
              >
                Download Template
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UploadExcel;
