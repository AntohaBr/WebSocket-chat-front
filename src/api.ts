import io from 'socket.io-client'

// const socket = io('https://web-socket-chat-server.vercel.app/')
const socket = io('http://localhost:3009/')



socket.on('init-messages-published', (messages: any) => {
    setMessages(messages)
})

socket.on('new-message-sent', (message: any) => {
    setMessages((messages) => [...messages, message])
})