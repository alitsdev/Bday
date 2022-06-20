import { Request, Response } from 'express';
import User from '../model/user';

const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const user = await User.findOne({ userId: id });
    res.send(user);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.end();
  }
};
const postUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    if ((user.userId && user.email && user.password) !== '') {
      const savedUser = await User.create(user);
      res.status(201);
      res.send(savedUser);
    } else {
      res.status(400);
      res.end();
    }
  } catch (error) {
    res.status(500);
    console.log(error);
    res.end();
  }
};

export default { postUser, getUser };
