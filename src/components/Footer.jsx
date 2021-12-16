import { Link, Typography } from '@material-ui/core'
import { Box, Container, Divider } from '@mui/material'

const Footer = () => {
  return (
    <>
      <Divider variant="middle" sx={{ mt: '5vh' }} />
      <Box sx={{ my: '3vh' }}>
        <Container maxWidth="sm">
          <Typography variant="body2" align="center">
            Developed by{' '}
            <Link
              href="https://takumiyoshiko.github.io/"
              color="secondary"
              target="_blank"
              rel="noopener"
            >
              Takumi Yoshikoshi
            </Link>{' '}
            and{' '}
            <Link
              href="http://hirokazukiyomaru.com"
              color="secondary"
              target="_blank"
              rel="noopener"
            >
              Hirokazu Kiyomaru
            </Link>
            .
          </Typography>
        </Container>
      </Box>
    </>
  )
}

export default Footer
