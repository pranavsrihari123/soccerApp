import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import { getStoredUUID } from '../uuidStorage';

const DMChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({ _id: '' });
  const [otherUser, setOtherUser] = useState({ _id: '', name: '' });
  const socket = io('http://localhost:3000');

  useEffect(() => {
    // Get user ID and set up the chat with the other user
    getStoredUUID().then((uuid) => {
      setUser({ _id: uuid });
      setOtherUser(route.params.otherUser); // Assuming you pass other user details through navigation
    });

    subscribeToDMChat();

    return () => {
      unsubscribeFromDMChat();
    };
  }, []);

  const subscribeToDMChat = () => {
    socket.on('connect', () => {
      console.log('Connected:', socket.connected);
      
      // Send the user's information to the server upon connection
      socket.emit('joinDMChat', { userId: user._id, otherUserId: otherUser._id, userName: user.name });
    });

    // Handle incoming messages from Socket.IO
    socket.on('existingDMChatMessages', (messageData) => {
      const chatMessages = messageData.map((message) => ({
        _id: message._id,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      }));

      setMessages(chatMessages);
    });

    socket.on('receiveDMChatMessage', (newMessage) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]));
    });

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.connected);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  };

  const unsubscribeFromDMChat = () => {
    socket.disconnect();
  };

  const handleSend = (newMessages) => {
    const { text } = newMessages[0];

    // Emit the new message to the server
    socket.emit('sendDMChatMessage', { senderId: user._id, receiverId: otherUser._id, messageText: text });
  };  

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => handleSend(newMessages)}
      user={{ _id: user._id }}
    />
  );
};

export default DMChatScreen;
