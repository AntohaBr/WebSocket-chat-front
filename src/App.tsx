import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import './App.css'
import {useDispatch, useSelector} from 'react-redux'
import {createConnection, destroyConnection, sendMessage, setClientName, typeMessage} from './chat-reducer'
import {AppDispatchType, RootReducerType} from './store'

export const App =() => {
    const messages = useSelector((state: RootReducerType) => state.chat.messages)
    const typingUser = useSelector((state: RootReducerType) => state.chat.typingUser)

    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(createConnection())
        return () => {
            dispatch(destroyConnection())
        }
    }, [])

    const [message, setMessage] = useState('hello')
    const [name, setName] = useState('')

    const onChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const onClickTextHandler = () => {
        dispatch(sendMessage(message))
        setMessage('')
    }

    const onClickNameHandler = () => {
        dispatch(setClientName(name))
    }

    const onKeyPressHandler = () => {
        dispatch(typeMessage())
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
                        {messages.map((m) => {
                            return <div key={m.id}>
                                <b>{m.user.name}:</b>{m.message}
                                <hr/>
                            </div>
                        })
                        }
                        {typingUser.map((u) => {
                            return <div key={u.id}>
                                <b>{u.name}:</b>...
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
                        <textarea value={message} onChange={onChangeTextHandler} onKeyPress={onKeyPressHandler}></textarea>
                        <button onClick={onClickTextHandler}>Send text</button>
                    </div>
                </div>
            </div>
    )
}

