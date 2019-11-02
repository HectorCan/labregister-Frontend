import React from 'react';
import { Container } from 'reactstrap';
import Navbar from './Components/Navbar';
import Table from './Components/Table';
import ReactNotification from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css';
import './App.css';
import 'react-table/react-table.css';

function App() {
  return (
    <div>
      <ReactNotification />
      <Navbar />
      <Container fluid>
        <Table />
      </Container>
    </div>
  );
}

export default App;
