import { Router } from 'express';
import { validate, create } from './model';

const router = Router();

const createApp = (req, res) => {
  return validate(req.body)
    .then(value => create(value))
    .then(objectID => res.status(201).json({ objectID }))
    .catch(error => res.status(400).json({ error }));
};

router.post('/', createApp);

export default router;
