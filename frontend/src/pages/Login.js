import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';
import AuthSocial from '../sections/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled('div')(({ theme }) => ({
  width: '45%',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '0'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 50,
  display: 'flex',
  overflow: 'hidden',
  maxHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login">
      
      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <img src="/static/illustrations/image.jpg" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Se Connecter 
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Saisir vos informations</Typography>
          </Stack>

          <LoginForm />

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' }
            }}
          >
            Don’t have an account?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
