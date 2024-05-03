import { Box, Typography } from '@mui/material';
import toast from 'react-hot-toast';

export default function NotFount() {
  toast.error('Ошибка 404');
  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh',
    }}
    >
      <Box>
        <Typography>Ошибка 404 чат не найден</Typography>
      </Box>
    </Box>
  );
}
