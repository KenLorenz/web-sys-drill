import Link from '@mui/material/Link'
import Head from "next/head";
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Grid from '@mui/material/Grid'
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button'
import { Form, Field } from 'formik';
import TextField from '@mui/material/TextField'

const validationSchema = Yup.object({
  task: Yup.string().required('Required'),
  desc: Yup.string().required('Required')
});

interface RowType {
  task: string,
  desc: string
}

export default function Home() {
  const router = useRouter();
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data, error } = useSWR('/api/notes', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  const x = '';
  console.log(data)
  return (
    <>
      <Head>
        <title>Final Drill</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <Grid container spacing={2} justifyContent="space-between" sx={{p: 4, bgcolor: '#0071ff33'}}>
          <Grid item>Profile Settings</Grid>
          <Grid item><Link href="/profile">Profile</Link></Grid>
        </Grid>
      </header>
      <div>
        <main>
          <Formik
          
          initialValues = {{
            task: x,
            desc: x
          }}

          validationSchema={validationSchema}

          onSubmit={(values, actions) => {
            axios.put('/api/notes', values)
            .then(() => {
                data.push(values)
                
                mutate('/api/notes', data, false);

                console.log('Adding Notes successfully');
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
              <Grid item xs={12} sm={6}>
                  <Field fullWidth name="task" as={TextField} label='task' />
              </Grid>

              <Grid item xs={12} sm={12}>
                  <Field fullWidth name="desc" as={TextField} label='desc' />
              </Grid>

              <Button type="submit" variant='contained' sx={{m:5, marginRight: 3.5 }}>Save Changes</Button>
            </Form>
          </Formik>
          <TableContainer>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell>Desc</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: RowType) => (
                  <TableRow hover key={row.task} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>

                    <TableCell>{row.task}</TableCell>
                    <TableCell>{row.desc}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      </div>
    </>
  );
}
