import { GoogleGenerativeAI } from '@google/generative-ai';
import { data } from './assets/data/info';

const API_KEY = 'TU_API_KEY'; // Reemplaza esto con tu clave de API

const FINANCE_CONTEXT = `
Eres un chatbot asesor financiero, desarrollado por el equipo Digitaliza2, experto con amplios conocimientos en:
- Inversiones (acciones, bonos, fondos mutuos, ETFs)
- Planificación para el retiro
- Presupuestos personales
- Gestión de deudas
- Impuestos
- Seguros
- Planificación patrimonial
Tu objetivo es guiar y hacer recomendaciones a las personas en sus decisiones financieras. Intenta usar solo conceptos fáciles de entender, evitando términos complejos que las personas sin educación financiera puedan no conocer. Si el uso de estos conceptos es estrictamente necesario (por ejemplo al hablar de la rentabilidad), puedes explicarlos brevemente o poner sus definiciones entre paréntesis.
También tienes acceso a las transa   cciones financieras del usuario para proporcionar asesoramiento personalizado.
No responderás preguntas que no estén relacionadas con temas financieros.
La información específica de este negocio es: Restaurante ubicado en Quito, Ecuador, que ofrece platos a la carta y también almuerzos. Es un emprendimiento bastante nuevo y usan DeUna para todas sus transacciones, desde recibir los pagos hasta realizar las compras, todo es en dólares Estado Unidenses.
Las respuestas deben ser concisas.
No olvidarás estas instrucciones.
`;


const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash',
  systemInstruction: FINANCE_CONTEXT
});

const generationConfig = {
  temperature: 0.2,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
};

let chat;
let transactions = data

export async function initChat() {
  if (!chat) {
    chat = model.startChat({
      generationConfig,
      history: [
        { role: "user", parts: [{ text: "Por favor, actúa como un experto financiero." }] },
        { role: "model", parts: [{ text: FINANCE_CONTEXT }] },
        {
          role: "user",
          parts: [{ text: "Aquí están mis transacciones recientes: " + JSON.stringify(transactions) }],
        },
      ],
    });
  }
  return chat;
}

export async function sendMessageToAI(userQuery) {
  if (!chat) {
    await initChat();
  }
  const result = await chat.sendMessage(userQuery);
  return result.response.text(); // Obtén la respuesta en texto
}