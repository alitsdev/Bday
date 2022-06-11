const User = require('../model/user');

exports.getUser = async (req, res) => {
  try {
    const id = req.params.userId
    const user = await User.findOne({userId: id});
    res.send(user);
  } catch (error) {
    res.status(500);
    res.end();
  }
};
exports.postUser = async (req, res) => {
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
    res.end();
  }
};
