// import { useDispatch } from 'store';

// material-ui
import { Button, Grid, Stack, TextField, Container } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';


/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const LoginForms = () => {
    // const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: () => {
        }
    });

    return (
        <Container maxWidth="sm"
        >
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                                <Button variant="contained" type="submit">
                                    Verify & Submit
                                </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default LoginForms;
