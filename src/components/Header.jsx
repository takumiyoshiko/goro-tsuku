import { Box, Typography } from '@material-ui/core'
import { Container } from '@mui/material'
import { yellow } from '@mui/material/colors'

const Header = () => {
  return (
    <>
      <Box sx={{ py: '5vh' }} style={{ background: yellow.A700 }}>
        <Container maxWidth="sm">
          <Typography
            variant="h1"
            component="h1"
            align="center"
            style={{ fontFamily: 'Nico Moji' }}
          >
            <ruby>
              ゴ<rt>5</rt>
            </ruby>
            <ruby>
              ロ<rt>6</rt>
            </ruby>
            <ruby>
              ツ<rt>2</rt>
            </ruby>
            <ruby>
              ク<rt>9</rt>
            </ruby>
          </Typography>
        </Container>
      </Box>
      <Box sx={{ mt: '3vh' }}>
        <Container maxWidth="sm" style={{ fontWeight: 'bold' }}>
          ゴロツクは数字の語呂合わせを自動生成するサービスです。
          単語の並びの自然さを１億文のテキストから学習し、それを考慮して語呂合わせを生成しています。
        </Container>
      </Box>
    </>
  )
}

export default Header
