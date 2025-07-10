import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export const getRecommendedUsers = async (req, res) => {
    try {
       const currentUserId = req.user._id;
       const currentUser = req.user;

       const recommendedUsers = await User.find({
        $and: [
            {_id: {$ne: currentUserId}},
            {_id: {$nin: currentUser.friends}},
            {isOnBoarded: true}
        ]
       }) 

       res.status(200).json(recommendedUsers)

    } catch (error) {
        console.log("Error in getRecommendedUsers", error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export const getMyFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends", "username profilePic nativeLanguage learningLanguage")

        if(!user) {
            return res.status(404).json({ message: "User not found!!"});
        }

        res.status(200).json(user.friends);

    } catch (error) {
         console.log("Error in getMyFriends", error);
         res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export const sendFriendRequest = async (req, res) => {
    try {
        const myId = req.user._id;
        const { recipientId } = req.params;
        console.log(req.user._id, req.params);

        if(myId === recipientId) {
            return res.status(400).json({message: "You cannot send a friend request to yourself"})
        }

        const recipient = await User.findById(recipientId)
        if(!recipient) {
            return res.status(404).json({message: "Recipient not found"})
        }

        if(recipient.friends.includes(myId)) {
            return res.status(400).json({message: "You are already friends with the recipient"})
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                {sender: myId, recipient: recipientId},
                {sender: recipientId, recipient: myId},
            ]
        })
        if(existingRequest) {
            return res.status(400).json({message: "Request already exists between the sender and recipient"})
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        })

        res.status(201).json(friendRequest)

    } catch (error) {
        console.log("Error in sendFriendRequest", error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId)

        if(!friendRequest) {
             return res.status(404).json({message: "Request not found"})
        }

        if(friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this request"})
        }

        await FriendRequest.findByIdAndUpdate(requestId, { status: "accepted" }, { new: true } )

        // Add each other to the friendlist
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: {friends: friendRequest.recipient}
        })
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {friends: friendRequest.sender}
        })

        res.status(200).json({ message: "Friend request accepted"})

    } catch (error) {
        console.log("Error in acceptFriendRequest", error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export const getFriendRequests = async (req, res) => {
    try {
        const incomingRequests = await FriendRequest.find({
            recipient: req.user._id,
            status: "pending"
        }).populate("sender", "username profilePic nativeLanguage learningLanguage")

        const acceptedRequests = await FriendRequest.find({
            sender: req.user._id,
            status: "accepted"
        }).populate("recipient", "username profilePic")

        res.status(200).json({ incomingRequests, acceptedRequests })

    } catch (error) {
        console.log("Error in getFriendRequests", error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "username profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}