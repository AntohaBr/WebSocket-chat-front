import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import './App.css'
import io from 'socket.io-client'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {useDispatch, useSelector} from "react-redux";

const socket = io('http://localhost:3009/')

const rootReducer = combineReducers({chat: chatReducer})
type AppStateType = ReturnType<typeof rootReducer>
const store = createStore(rootReducer, applyMiddleware(thunk))


function App() {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(createConnection())
    }, [])


    // const [messages, setMessages] = useState<Array<any>>([])
    const [message, setMessage] = useState('hello')
    const [name, setName] = useState('')

    const onChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const onClickTextHandler = () => {
        socket.emit('client-message-sent', message)
        setMessage('')
    }

    const onClickNameHandler = () => {
        socket.emit('client-name-sent', name)
    }

    useEffect(() => {
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    return (
        <div className="App">
            <div>
                <div style={{
                    border: '1px solid black',
                    padding: '10px',
                    height: '300px',
                    width: '300px',
                    overflow: 'scroll',
                    margin: '150px auto'
                }}
                >
                    {messages.map(m => {
                        return <div key={m.id}>
                            <b>{m.user.name}:</b>{m.message}
                            <hr/>
                        </div>
                    })
                    }
                    <div ref={messagesAnchorRef}></div>
                </div>
                <div>
                    <input value={name} onChange={onChangeNameHandler}/>
                    <button onClick={onClickNameHandler}>Send name</button>
                </div>
                <div>
                    <textarea value={message} onChange={onChangeTextHandler}></textarea>
                    <button onClick={onClickTextHandler}>Send text</button>
                </div>
            </div>
        </div>
    )
}

export default App;
