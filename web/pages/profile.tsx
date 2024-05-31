import Head from 'next/head';
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Form, Field } from 'formik';
import * as Yup from 'yup';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

const validationSchema = Yup.object({
  first_name: Yup.string().required('Required'),
  middle_name: Yup.string(),
  last_name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  age: Yup.string().required('Required'),
  desc: Yup.string()
});

export default function Profile() {
    const router = useRouter();

    const fetcher = (url: string) => axios.get(url).then(res => res.data);
    const { data, error } = useSWR('/api/user', fetcher);

    if (error) return <div>Error loading user data</div>;
    if (!data) return <div>Loading...</div>;
    const { first_name, middle_name, last_name, email, age, desc } = data; 

    return (
    <>
    <Head>
        <title>Final Drill</title>
    </Head>
    <div>
        <header>
          <Grid container spacing={2} justifyContent="space-between" sx={{p: 4, bgcolor: '#0071ff33'}}>
            <Grid item>Profile Settings</Grid>
            <Grid item><Link href="/">Home</Link></Grid>
          </Grid>
        </header>
    </div>
    <main>
        <Formik
        
        initialValues = {{
            email: email,
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            age: age,
            desc: desc
          }}

        validationSchema={validationSchema}

        onSubmit={(values, actions) => {
        axios.put('/api/user', values)
        .then(() => {
            mutate('/api/user', values, false);
            console.log('Profile updated successfully');
            router.push('/');
        }).catch(error => {
            console.error('Failed to update profile:', error.response ? error.response.data : error.message);
        })
        .finally(() => {
            actions.setSubmitting(false);
        });

        }}
        >

        
            <Form>
                <Grid container spacing={7} sx={{p: 10}}>

                    <Grid item xs={12} sm={4}>
                        <Field fullWidth name="first_name" as={TextField} label='Firstname' />
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                        <Field fullWidth name="middle_name" as={TextField} label='MiddleName' />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Field fullWidth name="last_name" as={TextField} label='LastName' />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Field fullWidth type='email' name="email" as={TextField} label='Email' />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <Field fullWidth type='number' name="age" as={TextField} label='Age' />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Field fullWidth name="desc" as={TextField} label='Description' />
                    </Grid>

                    

                    <Grid item xs={12}>
                        <Button type="submit" variant='contained' sx={{ marginRight: 3.5 }}>Save Changes</Button>
                        <Button type='reset' variant='outlined' color='secondary'>Reset</Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    </main>
    </>
  )
}


