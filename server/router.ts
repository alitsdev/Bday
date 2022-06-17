import Express from 'express';
import Template from './controllers/template-controller';
import Guest from './controllers/guest-controller';
import User from './controllers/user-controller';
// import Guest from './controllers/controller';
// import User from './controllers/controller';

const router = Express.Router();

router.get('/:userId/template', Template.getTemplate);
router.post('/:userId/template', Template.postTemplate);

router.get('/:userId/guests', Guest.getGuestList);
router.post('/:userId/guests', Guest.postGuest);

// router.post('/login', User.login);
router.get('/:userId', User.getUser);
router.post('/register', User.postUser);

export default router;
