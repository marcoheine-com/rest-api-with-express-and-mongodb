import { Router } from 'express';
import { v4 as uuid4 } from 'uuid';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
  const id = uuid4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.models.me.id,
  };

  req.models.context.models.messages[id] = message;
  return res.send(message);
});

router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
