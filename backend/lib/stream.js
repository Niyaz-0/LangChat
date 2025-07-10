import { StreamChat } from 'stream-chat'

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData)
        return userData;

    } catch (error) {
        console.log('Error in creating Stream User', error)
    }
}

export const generateStreamToken = async (userId) => {
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);

    } catch (error) {
        console.log('Error in generating Stream Token', error)
    }
}