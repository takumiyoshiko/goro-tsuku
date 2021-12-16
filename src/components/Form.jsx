import { TextField } from '@material-ui/core'
import { Button, Container, useTheme } from '@mui/material'
import Box from '@mui/material/Box'

const Form = ({ number, error, handleChange, handleSubmit }) => {
  const theme = useTheme()

  return (
    <Box sx={{ my: '5vh' }}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="数字を入力"
            error={error}
            value={number}
            onChange={handleChange}
            helperText={
              error ? '半角で数字（2桁〜12桁）を入力してください' : ''
            }
            fullWidth
            FormHelperTextProps={{
              style: {
                textAlign: 'center',
              },
            }}
            inputProps={{
              style: {
                color: theme.palette.text.primary,
                textAlign: 'center',
                fontSize: '2.5em',
                fontWeight: 'bold',
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: '2vh' }}
            style={{ fontSize: '1.2em', fontWeight: 'bold' }}
            fullWidth
          >
            語呂合わせを生成
          </Button>
        </form>
      </Container>
    </Box>
  )
}

export default Form
