import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Snackbar, Alert } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  width: 'min(500px, 50vw)',
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({ email: '', password: '' });
  
  // Streak State
  const [streakMessage, setStreakMessage] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  // Check streak when the page loads or the user logs in
  const checkStreak = () => {
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const currentDate = new Date().toLocaleDateString();
    let newStreakMessage = '';

    if (lastLoginDate === currentDate) {
      // User has logged in today
      const currentStreak = parseInt(localStorage.getItem('streakCount') || '0');
      newStreakMessage = `You're continuing your streak of ${currentStreak} day${currentStreak > 1 ? 's' : ''}!`;
    } else {
      // First login of the day
      localStorage.setItem('lastLoginDate', currentDate);
      const newStreak = parseInt(localStorage.getItem('streakCount') || '0') + 1;
      localStorage.setItem('streakCount', newStreak.toString());
      newStreakMessage = `Great job! You've started a streak of ${newStreak} day${newStreak > 1 ? 's' : ''}!`;
    }

    setStreakMessage(newStreakMessage);
    setOpenSnackbar(true);
  };

  const handleSignIn = () => {
    checkStreak();
    navigate('/dashboard');
  };

  return (
    <Box {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="row" justifyContent="flex-end">
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link component="button" variant="body2" sx={{ alignSelf: 'baseline' }}>
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="button" fullWidth variant="contained" onClick={handleSignIn}>
              Sign in
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link href="/material-ui/getting-started/templates/sign-in/" variant="body2">
                Sign up
              </Link>
            </Typography>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          </Box>
        </Card>
      </SignInContainer>

      {/* Streak Reminder Snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {streakMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
