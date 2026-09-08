import { Router, Request, Response } from 'express';
import { Model } from 'mongoose';

export function createResourceRouter(model: Model<any>): Router {
  const router = Router();

  router.get('/', async (_req: Request, res: Response) => {
    const documents = await model.find().sort({ createdAt: -1 }).lean();
    res.json(documents);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const document = await model.findById(req.params.id).lean();
    if (!document) {
      res.status(404).json({ error: 'Resource not found' });
      return;
    }
    res.json(document);
  });

  router.post('/', async (req: Request, res: Response) => {
    const document = await model.create(req.body);
    res.status(201).json(document);
  });

  router.patch('/:id', async (req: Request, res: Response) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!document) {
      res.status(404).json({ error: 'Resource not found' });
      return;
    }
    res.json(document);
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    const document = await model.findByIdAndDelete(req.params.id).lean();
    if (!document) {
      res.status(404).json({ error: 'Resource not found' });
      return;
    }
    res.status(204).send();
  });

  return router;
}
