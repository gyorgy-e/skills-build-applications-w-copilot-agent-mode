"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose_1.default.connection;
async function connectDatabase() {
    try {
        await mongoose_1.default.connect(connectionString, { serverSelectionTimeoutMS: 5000 });
        console.log('Connected to octofit_db');
    }
    catch (error) {
        console.error('Unable to connect to octofit_db:', error);
    }
}
db.on('error', (error) => console.error('MongoDB connection error:', error));
exports.default = db;
