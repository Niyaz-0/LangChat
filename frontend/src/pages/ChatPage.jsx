import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getStreamtoken } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import { StreamChat } from "stream-chat"
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import CallButton from "../components/CallButton"

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export default function ChatPage() {
  const { id: recipientId } = useParams();

  const queryClient = useQueryClient();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamtoken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initializeChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat ...")

        const client = StreamChat.getInstance(STREAM_API_KEY)

        await client.connectUser({
          id: authUser._id,
          name: authUser.username,
          image: authUser.profilePic,
        }, tokenData.token)

        const channelId = [authUser._id, recipientId].sort().join("-");

        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser._id, recipientId],
        })

        await currentChannel.watch();

        setChatClient(client);
        setChannel(currentChannel);

      } catch (error) {
        console.log("Error in connecting to the chat client", error);
        toast.error("Could not connect to chat. Please try again.");
      } 
      finally {
        setLoading(false);
      }
    };

    initializeChat();
  }, [authUser, tokenData?.token, recipientId]);

  const handleVideoCall = () => {
    if(channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join Here: ${callUrl}`,
      })
    }
  }

  if(loading || !chatClient || !channel) return <ChatLoader />

  return <div className="h-[93vh]">
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <div className="w-full relative">
          <CallButton handleVideoCall={handleVideoCall} />
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput focus />
          </Window>
        </div>
        <Thread />
      </Channel>
    </Chat>

  </div>;
}
