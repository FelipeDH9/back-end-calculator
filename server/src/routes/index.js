const express = require('express')
const database = require('../database')
const router = express()

router.post('/calculate', async (request, response) => {
  try {
    const { user_id } = request.headers
    const userAccount = await database('user_accounts')
      .where({ id: user_id })
      .select()

    if (!userAccount[0]) {
      return response.status(401).json({ message: 'Invalid authorization' })
    }

    const expression = request.body.expression

    if (!expression) {
      return response
        .status(409)
        .json({ message: 'Expression field is required' })
    }

    const result = eval(expression)

    await database('calculations').insert({
      user_id,
      result,
      expression
    })

    return response.json({
      user_id,
      name: userAccount[0].name,
      result,
      expression,
      date: new Date()
    })
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
})

router.post('/signin-create', async (request, response) => {
  try {
    let { name } = request.body
    name = String(name).toLowerCase()
    if (!name) {
      return response.status(409).json({
        message: 'Field name is required'
      })
    }
    const findUserAccount = await database('user_accounts')
      .where({ name })
      .select()
    if (findUserAccount[0]) {
      return response.json(findUserAccount[0])
    }
    const userId = await database('user_accounts').insert({
      name
    })
    const userAccount = await database('user_accounts')
      .where({ id: userId[0] })
      .select()
    return response.json(userAccount[0])
  } catch (error) {
    return response.status(500).json(error)
  }
})

router.get('/calculations', async (request, response) => {
  try {
    const { user_id } = request.headers
    const userAccount = await database('user_accounts')
      .where({ id: user_id })
      .select()

    if (!userAccount[0]) {
      return response.status(401).json({ message: 'Invalid authorization' })
    }
    const calculations = await database('calculations')
      .where({ user_id })
      .orderBy('id', 'desc')
      .select()
    const calculationsWithName = calculations.map(calculation => {
      return { ...calculation, name: userAccount[0].name }
    })
    return response.json(calculationsWithName)
  } catch (error) {
    return response.status(500).json(error)
  }
})

module.exports = router
