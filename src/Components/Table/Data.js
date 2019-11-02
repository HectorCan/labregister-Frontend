import React from 'react';
import axios from 'axios';
import moment from 'moment';

// Objeto para hacer eliminar el filtro.
export const DEFAULT_FILTER = {
    matricule: '',
    name: '',
    labId: '',
    type: '',
    dates: {
      start: '',
      end: ''
    }
};

// Promise para obtener los laboratorios.
export const LaboratoriesQuery = axios
  .get('http://localhost:3000/laboratory', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Objeto con los tipos de registro
export const Types = [
  { id: '', name: 'Todos'},
  { id: '*', name: 'Entrada'},
  { id: '#', name: 'Salida'},
];

// Función para renderizar las opciones de un select
export const renderOpts = (list) => {
  // map es una instruccion que itera por cada elemento y regresa algo a un array
  // [...data...] = array.map((v) => return v;);
  return list.map((v) => {
    return <option key={v.id} value={v.id}>{v.name}</option>;
  });
};

// Promise para obtener las transacciones con filtrado.
export const getTransaction = (params) => {
  return axios
    .post('http://localhost:3000/transaction/data', {
      params: {
        filter: params.filtered,
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
};

// Columnas
export const Columns = [{
  Header: 'Registro de entradas - Laboratorios',
  columns: [
    {
      Header: '#',
      accessor: 'id',
      width: 50
    },
    {
      Header: 'Matricula',
      accessor: 'user.matricule',
      width: 100,
      Cell: (props) => {
        return `${props.value}`
      }
    },
    {
      Header: 'Usuario',
      accessor: 'user.name',
      width: 300,
      Cell: (props) => {
        return `${props.value}`
      }
    },
    {
      Header: 'Laboratorio',
      accessor: 'laboratory.name',
      Cell: (props) => {
        return `${props.value}`
      }
    },
    {
      Header: 'Tipo',
      accessor: 'type',
      Cell: (props) => {
        return props.value === '*' ? 'Entrada' : 'Salida'
      },
    },
    {
      Header: 'Registro de Entrada',
      accessor: 'arrived_at',
      Cell: (props) => {
        return new moment(props.value).format('YYYY-MM-DD HH:mm:ss');
      }
    },
  ]
}];
