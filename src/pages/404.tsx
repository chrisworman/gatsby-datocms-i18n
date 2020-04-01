import React from "react"
import Layout from "../components/layout"
import ButtonLink from "../components/buttonLink/buttonLink"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
      textAlign: 'center',
      padding: '80px',
      '& h1': {
        margin: '0',
      },
      '& p': {
        maxWidth : '400px',
        margin : '2rem auto',
        lineHeight: '2rem',
      },
  },
}));


export default function NotFoundPage() {
  const classes = useStyles();
  return (
    <Layout title="404" titleSuffix="Page Not Found">
      <div className={classes.container}>
        <h1>Page Not Found</h1>
        <p>The page you requested does not exist.<br/>  Click the following link to continue shopping.</p>
        <ButtonLink text="Continue Shopping" url="/" />
      </div>
    </Layout>
  );
}