import React, { useState } from 'react';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    InputGroup,
    ButtonToolbar,
    Button
} from 'reactstrap';
import {
  DEFAULT_FILTER,
  LaboratoriesQuery,
  Types,
  renderOpts
} from './Data';

// Obtenemos los laboratorios...
let Laboratories = [];
LaboratoriesQuery.then((res) => {
  Laboratories = res.data;
});

const TableHeader = (props) => {
  const { onFetchData } = props;
  const [filter, setFilter] = useState(DEFAULT_FILTER);

  function onChange(e) {
    const { name, value } = e.target;
    if (name !== "start" && name !== "end") {
      setFilter({
        ...filter,
        [name]: value
      });
    } else {
      setFilter({
        ...filter,
        dates: {
          ...filter.dates,
          [name]: value
        }
      });
    }
    e.preventDefault();
  }

  const applyFilter = () => {
    onFetchData({ filtered: filter });
  };

  const cleanFilter = () => {
    setFilter(DEFAULT_FILTER);
    onFetchData({ filtered: DEFAULT_FILTER });
  };

  return (
    <Container fluid>
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="matricule">Matricula:</Label>
              <Input
                id="matricule"
                name="matricule"
                type="text"
                bsSize="sm"
                value={filter.matricule}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="username">Usuario:</Label>
              <Input
                id="username"
                name="name"
                bsSize="sm"
                value={filter.name}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="laboratory">Laboratorio:</Label>
              <Input
                id="laboratory"
                name="labId"
                type="select"
                bsSize="sm"
                value={filter.labId}
                onChange={(e) => {
                  onChange(e);
                }
              }>
                <option value="">Todos</option>
                { renderOpts(Laboratories) }
              </Input>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="type">Tipo:</Label>
              <Input
                id="type"
                name="type"
                type="select"
                bsSize="sm"
                value={filter.type}
                onChange={(e) => {
                  onChange(e);
                }
              }>
                { renderOpts(Types) }
              </Input>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="dates">Fecha:</Label>
              <InputGroup>
                <Input
                  type="date"
                  name="start"
                  bsSize="sm"
                  value={filter.dates.start}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  placeholder="YYYY-MM-DD"
                />
                <Input
                  type="date"
                  name="end"
                  bsSize="sm"
                  value={filter.dates.end}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  placeholder="YYYY-MM-DD"
                />
              </InputGroup>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <ButtonToolbar style={{paddingTop: 30}}>
                <Button
                  size="sm"
                  color="secondary"
                  onClick={cleanFilter}
                >Limpiar
                </Button>
                &nbsp;
                <Button
                  size="sm"
                  color="primary"
                  onClick={applyFilter}
                >Aplicar
                </Button>
              </ButtonToolbar>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default TableHeader;
