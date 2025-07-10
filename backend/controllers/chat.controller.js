import { generateStreamToken } from "../lib/stream.js"

export const getStreamToken = async (req, res) => {
    try {
        const token = await generateStreamToken(req.user.id)

        res.status(200).json({ token })
    } catch (error) {
        console.log('Error in getting the streamToken', error)
        res.status(500).json({ message: "Internal Server Error!!"})
    }
}