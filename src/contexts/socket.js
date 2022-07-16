/* eslint-disable no-undef */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import socketio from 'socket.io-client';
import { socketConfig } from 'src/core/config';

const socket = socketio(socketConfig, { reconnectionDelayMax: 10000 });

const SocketContext = createContext(null);
const { Provider } = SocketContext;
const SocketConsumer = SocketContext.Consumer;

const SocketProvider = ({ children }) => {
  return <Provider value={{ socket }}>{children}</Provider>;
};

export { SocketProvider, SocketContext, SocketConsumer };

SocketProvider.propTypes = {
  children: PropTypes.any,
};
