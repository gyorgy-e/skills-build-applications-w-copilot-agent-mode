"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResourceRouter = createResourceRouter;
const express_1 = require("express");
function createResourceRouter(model) {
    const router = (0, express_1.Router)();
    router.get('/', async (_req, res) => {
        const documents = await model.find().sort({ createdAt: -1 }).lean();
        res.json(documents);
    });
    router.get('/:id', async (req, res) => {
        const document = await model.findById(req.params.id).lean();
        if (!document) {
            res.status(404).json({ error: 'Resource not found' });
            return;
        }
        res.json(document);
    });
    router.post('/', async (req, res) => {
        const document = await model.create(req.body);
        res.status(201).json(document);
    });
    router.patch('/:id', async (req, res) => {
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
    router.delete('/:id', async (req, res) => {
        const document = await model.findByIdAndDelete(req.params.id).lean();
        if (!document) {
            res.status(404).json({ error: 'Resource not found' });
            return;
        }
        res.status(204).send();
    });
    return router;
}
