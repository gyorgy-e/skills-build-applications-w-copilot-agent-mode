"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const resourceRouter_1 = require("./routes/resourceRouter");
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API',
        resources: ['users', 'teams', 'activities', 'leaderboard', 'workouts'],
    });
});
app.use('/api/users', (0, resourceRouter_1.createResourceRouter)(models_1.User));
app.use('/api/teams', (0, resourceRouter_1.createResourceRouter)(models_1.Team));
app.use('/api/activities', (0, resourceRouter_1.createResourceRouter)(models_1.Activity));
app.use('/api/leaderboard', (0, resourceRouter_1.createResourceRouter)(models_1.LeaderboardEntry));
app.use('/api/workouts', (0, resourceRouter_1.createResourceRouter)(models_1.Workout));
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, () => {
    console.log(`Octofit Tracker API listening on port ${PORT}`);
    console.log(`API base URL: ${baseUrl}`);
    void (0, database_1.connectDatabase)();
});
exports.default = app;
