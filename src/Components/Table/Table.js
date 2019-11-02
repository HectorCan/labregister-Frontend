import React, {
  useState,
  useEffect
} from 'react';
import ReactTable from 'react-table';
import TableHeader from './TableHeader';
import { SocketNotifier } from './Socket';
import {
  getTransaction,
  Columns
} from './Data';

function Table(props) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [io] = useState(1);

  const onFetchData = (params) => {
    setLoading(true);
    getTransaction(params)
      .then(function (res) {
        setTransactions(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    SocketNotifier(setTransactions);
  }, [io]);

  return (
    <div style={{marginTop: 15}}>
      <TableHeader onFetchData={onFetchData}/>
      <ReactTable
        className="-highlight -striped"
        style={{ height: "600px" }}
        onFetchData={onFetchData}
        data={transactions}
        loading={loading}

        columns={Columns}
        previousText='Anterior'
        nextText='Siguiente'
        loadingText='Cargando...'
        noDataText='No se encontrarón datos'
        pageText='Página'
        ofText='de'
        rowsText='filas'
        pageJumpText='Saltar a la página'
        rowsSelectorText='Filas por página'
      />
    </div>
  );
}

export default Table;
