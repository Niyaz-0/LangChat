import express from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { getStreamToken } from '../controllers/chat.controller.js';

const chatRouter = express.Router();

chatRouter.get("/token", protectRoute, getStreamToken)

export default chatRouter;