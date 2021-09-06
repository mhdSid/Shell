import SocketIOClient from 'socket.io-client';
import {apiRequest} from '../../Constants/Api';
import {Alert} from 'react-native';

let socket = null; // SocketIOClient(apiRequest.apiUri);

const initSocket = () => {
  // socket.open();
  // socket.connect();
};

const addSocketEventListeners = () => {
  // socket.on('connect', () => {
  //   // Alert.alert('Connected to Socket Server');
  // });
  // socket.on('hi', message => Alert.alert(`Socket Message: ${message}`));
  // socket.on('message', message => Alert.alert(`Socket Message: ${message}`));
};

const emitSocketEvents = () => {
  // socket.emit('hi', 'Hi server');
  // socket.emit('message', 'Hi server');
};

export {initSocket, addSocketEventListeners, emitSocketEvents};
