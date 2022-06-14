const Template = require('../model/template');

exports.getTemplate = async (req, res) => {
    try {
        const hostId = req.params.userId
        const template = await Template.findOne({host: hostId});
        console.log(template)
        res.send(template);
      } catch (error) {
        res.status(500);
        res.end();
      }
}
exports.postTemplate = async (req, res) => {
    try {
      const hostId = req.params.userId
      const foundTemplate = await Template.findOne({host: hostId});
      const template = req.body;
      if (foundTemplate) {
        await Template.findOneAndUpdate({host: hostId}, template)
      } else {
        if (template.host !== '') {
          const savedTemplate = await Template.create(template);
          res.status(201);
          res.send(savedTemplate);
        } else {
          res.status(400);
          res.end();
        }
      }
    } catch (error) {
      res.status(500);
      res.end();
    }
  };
