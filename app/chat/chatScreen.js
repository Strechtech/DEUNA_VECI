import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ViewScreen } from "../login";
import { initChat, sendMessageToAI } from "../../genAI";

export const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "received",
      text: "¡Hola! 👋\nSoy el asistente financiero de Deuna 💜",
      timestamp: "",
    },
    {
      id: "2",
      type: "received",
      text: "¿Tienes preguntas sobre presupuestos, inversiones o cómo manejar tus finanzas? ¡Estoy aquí para ayudarte a tomar decisiones inteligentes!",
      timestamp: "",
    },
    {
      id: "3",
      type: "sent",
      text: "Hola, deuna",
      timestamp: "02:12 PM",
    },
  ]);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        await initChat();
      } catch (error) {
        console.error('Error al inicializar el chat:', error);
      }
    };
  
    initializeChat();
  }, []);

  const [inputText, setInputText] = useState("");

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
  
    const newMessage = {
      id: Math.random().toString(),
      type: 'sent',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');
  
    try {
      const aiResponse = await sendMessageToAI(inputText); // Enviar el mensaje a la IA
      const botMessage = {
        id: Math.random().toString(),
        type: 'received',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
  
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error al obtener respuesta de la IA:', error);
    }
  };

  const renderMessage = ({ item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.type === "sent" ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <ViewScreen>
      {/* Header */}
      <View style={styles.header}>
        <Feather name="menu" size={24} color="black" />
        <Image
          source={require("../../assets/Images/deunaletras.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerIcons}>
          <Feather name="thumbs-up" size={24} color="black" />
          <Feather name="thumbs-down" size={24} color="black" style={{ marginLeft: 10 }} />
        </View>
      </View>

      {/* Chat */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.chatContainer}
        inverted
        contentContainerStyle={{ flexDirection: "column-reverse" }}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <Feather name="paperclip" size={24} color="gray" style={{ marginHorizontal: 10 }} />
        <TextInput
          style={styles.textInput}
          placeholder="Mensaje..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Feather name="send" size={24} color="purple" style={{ marginHorizontal: 10 }} />
        </TouchableOpacity>
      </View>
    </ViewScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 200,
    height: 80,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
});

export default ChatScreen;
