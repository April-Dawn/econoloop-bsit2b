import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAppData } from '../../contexts/AppDataContext';
import { useRoute } from '@react-navigation/native';

export default function ChatScreen() {
  const route = useRoute();
  const transactionId = route.params?.transactionId || 'chat-default';
  const { chats, sendMessage } = useAppData();
  const [message, setMessage] = useState('');

  const messages = chats[transactionId] || [];

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(transactionId, message.trim());
    setMessage('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.header}>Chat with Partner</Text>

      <ScrollView style={styles.messagesContainer}>
        {messages.length === 0 ? (
          <Text style={styles.empty}>No messages yet. Say hello to start coordinating!</Text>
        ) : (
          messages.map((msg) => (
            <View 
              key={msg.id} 
              style={[styles.messageBubble, msg.sender === 'You' ? styles.myMessage : styles.otherMessage]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.time}>{msg.time}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8e9' },
  header: { fontSize: 20, fontWeight: '700', color: '#2e7d32', textAlign: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  messagesContainer: { flex: 1, padding: 15 },
  empty: { textAlign: 'center', color: '#999', marginTop: 100, fontSize: 16 },
  messageBubble: { padding: 12, borderRadius: 18, marginBottom: 10, maxWidth: '80%' },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#4caf50' },
  otherMessage: { alignSelf: 'flex-start', backgroundColor: '#ffffff' },
  messageText: { fontSize: 16, color: '#fff' },
  time: { fontSize: 10, color: '#ddd', marginTop: 4, textAlign: 'right' },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ddd' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 25, paddingHorizontal: 18, paddingVertical: 12, fontSize: 16 },
  sendBtn: { backgroundColor: '#2e7d32', paddingHorizontal: 24, justifyContent: 'center', borderRadius: 25, marginLeft: 8 },
  sendText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});