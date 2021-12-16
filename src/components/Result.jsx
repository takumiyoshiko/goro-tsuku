import { Box } from '@material-ui/core'
import { Container, Grid } from '@mui/material'
import { Share } from 'react-twitter-widgets'

const Goro = ({ goro, rank }) => {
  let tags = []
  for (let i = 0; i < goro.words.length; i++) {
    tags.push(
      <ruby style={{ margin: '3px' }} key={`word-${rank}-${i}`}>
        {goro.words[i].split('_')[0]}
        <rt>{goro.nums[i]}</rt>
      </ruby>
    )
  }
  tags.push(
    <span style={{ fontSize: '0.5em' }} key={`reading-${rank}`}>
      （{goro.yomis.join('')}）
    </span>
  )
  return tags
}

const Item = ({ goro, rank }) => {
  rank += 1
  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid
        item
        fontSize={rank === 1 ? '2em' : rank <= 3 ? '1.75em' : '1.5em'}
        fontWeight="bold"
      >
        {rank}位：
        <Goro goro={goro} rank={rank} />
      </Grid>
    </Grid>
  )
}

const Result = ({ number, goros }) => {
  if (goros === null) {
    return <>{null}</>
  }
  return (
    <>
      <Box sx={{ mt: 5 }} align="left">
        <Container maxWidth="sm">
          {goros.map((goro, rank) => (
            <Item goro={goro} rank={rank} key={`item-${rank}`} />
          ))}
        </Container>
      </Box>
      <Box sx={{ my: 3 }} align="center">
        <Container maxWidth="sm">
          <Share
            options={{
              size: 'large',
              text: `#ゴロツク で ${number} の語呂合わせを作りました。`,
            }}
          />
        </Container>
      </Box>
    </>
  )
}

export default Result
