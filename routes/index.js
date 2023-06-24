const express = require('express')
const { userInfo } = require('os')
const path = require('path')

const router = express.Router()

const authenticated = require('../middlewares/authenticated')

router.get('/loadPlans/:planType', authenticated, (req, res) => {
    res.status(200).json(res.locals.user.plans[req.params.planType])
})
router.post('/addPlan/:planType', authenticated, async (req, res) => {
    try {
        res.locals.user.plans[req.params.planType].push(req.body)
        const user = await res.locals.user.save() 
        res.status(201).json({data: user.plans[req.params.planType]})
    } catch (err) {
        res.status(500).json({message: 'Unknown server error'})
    }
})
router.post('/deletePlan/:planType/:id', authenticated, async (req, res) => {
    try {
        res.locals.user.plans[req.params.planType].findIndex(plan => plan.id === req.params.id) !== -1
        && res.locals.user.plans[req.params.planType].splice(res.locals.user.plans[req.params.planType].findIndex(plan => plan.id === req.params.id), 1)
        const user = await res.locals.user.save() 
        res.status(201).json({data: user.plans[req.params.planType]})
    } catch (err) {
        res.status(500).json({message: 'Unknown server error'})
    }
})
router.post('/updatePlan/:planType/:id', authenticated, async (req, res) => {
    try {
        res.locals.user.plans[req.params.planType].findIndex(plan => plan.id === req.params.id) !== -1
        && (res.locals.user.plans[req.params.planType][res.locals.user.plans[req.params.planType].findIndex(plan => plan.id === req.params.id)] = req.body)
        const user = await res.locals.user.save() 
        res.status(201).json({data: user.plans[req.params.planType]})
    } catch (err) {
        res.status(500).json({message: 'Unknown server error'})
    }
})

module.exports = router