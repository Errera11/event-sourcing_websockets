import React from 'react';
import ReactDOM from 'react-dom/client';
import EventSourcing from './EventSourcing';
import WebSocket from "./WebSocket";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WebSocket />
);


