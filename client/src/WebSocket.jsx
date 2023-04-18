import './App.css';
import {useEffect, useRef, useState} from "react";
import * as uuid from 'uuid';
import axios from "axios";


function LongPolling() {

    const socket = useRef();

    const [message, setMessage] = useState([])
    const [input, setInput] = useState('')

    const Submit = async(e) => {
        socket.current.send(JSON.stringify({
            message: input,
            id: uuid.v4()
        }))
        setInput('');
        e.preventDefault();

    }

    useEffect(() => {
        socket.current = new WebSocket(process.env.REACT_APP_WS_API_URL)

        socket.current.onmessage = event => {
            setMessage(prev => [JSON.parse(event.data), ...prev])
        }

    }, [])


    return (
        <div className="App">
            <div className={'form'}>
                <form>
                    <h3>A simple form</h3>
                    <input type={'text'} value={input}
                           onChange={e => setInput(e.target.value)}
                    />
                    <button onClick={Submit}>Post</button>
                </form>
            </div>
            {message.length != 0 && <div className={'messages'}>
                {message.map(item => {
                    return <div key={item.id}>id: {item.id} message: {item.message}</div>
                })}
            </div>
            }
        </div>
    );
}

export default LongPolling;
