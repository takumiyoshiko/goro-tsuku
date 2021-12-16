import React, { useEffect, useState } from 'react'
import Form from './Form'
import Result from './Result'
import { getGoros } from '../lib'
import { Box } from '@material-ui/core'
import { CircularProgress, Typography } from '@mui/material'

const Main = () => {
  const [number, setNumber] = useState('')
  const [error, setError] = useState(false)
  const [goros, setGoros] = useState(null)
  const [dic, setDic] = useState(null)
  const [lm, setLm] = useState(null)

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/dic.min.json', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((dat) => {
        setDic(dat)
      })
    fetch(process.env.PUBLIC_URL + '/lm.min.json', {
      headers: {
        // 'Content-Encoding': 'gzip',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((dat) => {
        setLm(dat)
      })
  }, [])

  useEffect(() => {
    setError(() => {
      if (number.length === 0) {
        return false
      }
      return (
        number.length < 2 ||
        12 < number.length ||
        number.split('').some((c) => parseInt(c).toString() !== c)
      )
    })
  }, [number])

  if (dic === null || lm === null) {
    return (
      <Box>
        <Typography
          sx={{ mt: '3vh' }}
          align="center"
          style={{ fontWeight: 'bold' }}
        >
          ロード中
        </Typography>
        <Typography
          sx={{ mt: '1vh', mb: '3vh' }}
          align="center"
          style={{ fontWeight: 'bold' }}
        >
          <CircularProgress />
        </Typography>
      </Box>
    )
  }

  const handleChange = (event) => {
    event.preventDefault()
    setNumber(event.target.value)
    setGoros(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!error && number !== '') {
      setGoros(getGoros(number, dic, lm))
    }
  }

  return (
    <Box sx={{ my: 5 }}>
      <Form
        number={number}
        error={error}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Result number={number} goros={goros} />
    </Box>
  )
}

export default Main
