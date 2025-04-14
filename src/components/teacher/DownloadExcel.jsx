import React, { useEffect, useState } from 'react';
import authAxios from "../../authAxios";
import { Card, CardContent, Typography, Button, CardActions, Divider } from '@mui/material';

const ExamComponents = () => {
  const [examComponents, setExamComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

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
    console.log('Selected Exam Component:', component);
  };

  // Handle downloading of Excel for selected exam component
  const handleDownloadExcel = async (componentId) => {
    try {
      const response = await authAxios.get(`http://localhost:5000/teacher/download-excel/${componentId}`, {
        responseType: 'blob' // This is important to handle binary data
      });
      
      // Create a link element to initiate the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Marks_Entry_${componentId}.xlsx`); // Filename
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up the link element
    } catch (error) {
      console.error('Error downloading Excel:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Typography variant="h4" className="text-center mb-6">
        Exam Components
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examComponents.map((exam) => (
          <Card key={exam.id} className="shadow-lg border border-gray-200">
            <CardContent>
              <Typography variant="h5" component="div" className="font-semibold text-gray-800">
                {exam.name}
              </Typography>
              <Divider className="my-4" />
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Year: {exam.year} | Semester: {exam.semester}
              </Typography>
              <ul className="space-y-2">
                {exam.components.map((component) => (
                  <li key={component.id}>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="primary"
                      onClick={() => handleSelectComponent(component)}
                      className="text-left"
                    >
                      {component.name}
                    </Button>
                  </li>
                ))}
              </ul>
              <center className="m-4"> 
                <Button
                  variant="contained"
                  className="m-4"
                  color="primary"
                  onClick={() => handleDownloadExcel(exam.id)} // Pass the exam ID to download
                >
                  Download Excel
                </Button>
              </center>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedComponent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <Typography variant="h6" className="mb-4 font-semibold">
              Selected Component Details
            </Typography>
            <Divider className="mb-4" />
            <Typography>Name: {selectedComponent.name}</Typography>
            <Typography>Weightage: {selectedComponent.weightage}%</Typography>
            {selectedComponent.marks && <Typography>Marks: {selectedComponent.marks}</Typography>}
            <Typography>Type: {selectedComponent.type || 'N/A'}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedComponent(null)}
              className="mt-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamComponents;
