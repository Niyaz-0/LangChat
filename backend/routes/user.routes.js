import express from 'express';
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequests, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const userRouter = express.Router();

userRouter.use(protectRoute)

userRouter.get('/', getRecommendedUsers);

userRouter.get('/friends', getMyFriends);

userRouter.post('/friend-request/:recipientId', sendFriendRequest);

userRouter.put('/friend-request/:requestId', acceptFriendRequest);

userRouter.get('/friend-requests', getFriendRequests)

userRouter.get('/outgoing-friend-requests', getOutgoingFriendRequests)

export default userRouter;
