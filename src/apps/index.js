import { Router } from 'express';
import { validate, create, remove } from './model';

const router = Router();

const createApp = (req, res) => {
  return validate(req.body)
    .then(value => create(value))
    .then(objectID => res.status(201).json({ objectID }))
    .catch(error => res.status(400).json({ error }));
};

const removeApp = (req, res) => {
  remove(req.params.id)
    .then(() => res.status(204).send())
    .catch(error => res.status(400).json({ error }));
};

router.post('/', createApp);
router.delete('/:id', removeApp);

export default router;
