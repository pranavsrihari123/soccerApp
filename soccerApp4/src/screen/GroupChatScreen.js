import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import { getStoredUUID } from '../uuidStorage';

const GroupChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({ _id: '', name: 'John Doe' }); // Initialize user state
  const teamId = '9c99291e-66ad-4f4f-84e1-8dd8f4ae0aa1';
  const socket = io('http://localhost:3000'); // Initialize socket connection

  useEffect(() => {
    // Subscribe to the team chat room
    getStoredUUID().then((uuid) => {
      setUser({ _id: uuid, name: 'John Doe' });
    });

    subscribeToTeamChat();

    // Cleanup on component unmount
    return () => {
      // Unsubscribe from the team chat room
      unsubscribeFromTeamChat();
    };
  }, []);

  const subscribeToTeamChat = () => {
    console.log('subscribed', user._id);

    socket.on('connect', () => {
      console.log('Connected:', socket.connected);
      
      // Send the user's information to the server upon connection
      socket.emit('joinTeamChat', { teamId, userId: user._id, userName: user.name });
      console.log('event triggered', user._id);
    });

    // Handle incoming messages from Socket.IO
    socket.on('existingTeamChatMessages', (messageData) => {
      console.log('first joined the chat');
      console.log(messageData);
      console.log('joined the chat');

      // Process existing messages
      const chatMessages = messageData.map((message) => ({
        _id: message._id,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      }));

      // Update the state with existing messages
      setMessages(chatMessages);
    });

    socket.on('receiveTeamChatMessage', (newMessage) => {
      // Handle incoming real-time messages
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]));
    });

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.connected);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  };

  const unsubscribeFromTeamChat = () => {
    // Close the Socket.IO connection on unmount
    socket.disconnect();
  };

  const handleSend = (newMessages) => {
    const { text } = newMessages[0];
  
    // Emit the new message to the server
    socket.emit('sendTeamChatMessage', { teamId, senderId: user._id, messageText: text });
  };  

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => handleSend(newMessages)}
      user={user}
    />
  );
};

export default GroupChatScreen;
