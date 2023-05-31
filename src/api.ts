import io from 'socket.io-client'
import {MessagesType, UserType} from './chat-reducer'

// const socket = io('https://web-socket-chat-server.vercel.app/')

export const api = {
    socket: null as null | SocketIOClient.Socket,

    createConnection() {
        this.socket = io('http://localhost:3009/')
    },
    subscribe(initMessagesHandler: (messages: MessagesType []) => void,
              newMessageSentHandler: (message: string) => void,
              userTypingHandler: (user: UserType) => void) {
        this.socket?.on('init-messages-published', initMessagesHandler)
        this.socket?.on('new-message-sent', newMessageSentHandler)
        this.socket?.on('user-typing', userTypingHandler)

    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null
    },
    sendName(name: string) {
        this.socket?.emit('client-name-sent', name)
    },
    sendMessage(message: string) {
        this.socket?.emit('client-message-sent', message)
    },
    typeMessage() {
        this.socket?.emit('client-typed')
    }
}