const Guest = require('../model/guest');

exports.getGuestList = async (req, res) => {
  try {
    const hostId = req.params.userId
    const guests = await Guest.find({host: hostId});
    res.send(guests);
  } catch (error) {
    res.status(500);
    res.end();
  }
};
exports.postGuest = async (req, res) => {
  try {
    const guest = req.body;
    if ((guest.host && guest.name && guest.email) !== '') {
      const savedGuest = await Guest.create(guest);
      res.status(201);
      res.send(savedGuest);
    } else {
      res.status(400);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.end();
  }
};
