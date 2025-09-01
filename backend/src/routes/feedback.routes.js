import { Router } from 'express';
const router = Router();

router.post('/', (req, res) => {
  const { messageId, feedback, message } = req.body || {};
  console.log('[feedback]', { messageId, feedback, message });
  return res.status(204).end();
});

export default router;
