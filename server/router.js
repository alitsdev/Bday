const express = require('express')
const router = express.Router()
const { Template, User, Guest } = require('./controllers/controller')


router.post('/:userId/template', Template.postTemplate);
router.get('/:userId/template', Template.getTemplate);

router.post('/:userId/guests', Guest.postGuest);
router.get('/:userId/guests', Guest.getGuestList)

// router.post('/login', User.login);
router.get('/:userId', User.getUser);
router.post('/register', User.postUser);

module.exports = router;