// const Template = require('../model/template');
import Express, { Request, Response } from 'express';
import Template from '../model/template';

const getTemplate = async (req: Request, res: Response) => {
  try {
    console.log(req.body, 'body');
    console.log(req.params.userId, 'userid');
    const hostId = `${req.params.userId}`;
    const template = await Template.findOne({ host: hostId });
    // console.log(template);
    res.send(template);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.end();
  }
};

const postTemplate = async (req: Request, res: Response) => {
  try {
    const hostId = req.params.userId;
    const foundTemplate = await Template.findOne({ host: hostId });
    const template = req.body;
    console.log(template, 'template');
    if (foundTemplate) {
      await Template.findOneAndUpdate({ host: hostId }, template);
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
    console.log(error);
    res.end();
  }
};

export default { getTemplate, postTemplate };
