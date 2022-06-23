const express = require('express')
const database = require('../database')
const router = express()

router.post('/calculate', async (request, response) => {
  try {
    const expression = request.body.expression
    if (!expression) {
      return response
        .status(409)
        .json({ message: 'Expressão precisa estar preenchida' })
    }

    const currentIp =
      request.headers['x-forwarded-for']?.split(',').shift() ||
      request.socket?.remoteAddress

    const result = eval(expression)

    await database('calculations').insert({
      ip: currentIp,
      result,
      expression
    })

    return response.json({
      ip: currentIp,
      result,
      expression,
      date: new Date()
    })
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
})

module.exports = router
