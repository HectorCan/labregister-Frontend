import socketIOClient from "socket.io-client";
import { store } from 'react-notifications-component';

const socket = socketIOClient("http://localhost:3000");

export const SocketNotifier = (setTransactions) => {
  socket.on('FromAPI', (transaction) => {
    setTransactions(t => [...t, transaction]);
    store.addNotification({
      title: "¡Registo exitoso!",
      message: `Se ha registrado ${transaction.user.name} en ${transaction.laboratory.name}.`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  });
};
