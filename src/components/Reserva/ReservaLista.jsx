import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Table,
  Modal,
  Alert,
} from "react-bootstrap";
import { buscarReservas, eliminarReserva } from "../../api/reservas";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";

const ReservaLista = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    buscarReservas()
      .then((response) => {
        setItems(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setError(error);
      });
  }, []);

  const handleDelete = (id) => {
    setShowConfirm(true);
    setSelectedItemId(id);
  };

  const confirmDelete = () => {
    setIsLoading(true);
    eliminarReserva(selectedItemId)
      .then(() => {
        setItems(items.filter((item) => item.id !== selectedItemId));
        setIsLoading(false);
        setShowConfirm(false);
        setSelectedItemId(null);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setError(error);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <Container className="my-4">
        <h2>Reservas</h2>
        <Row className="my-3">
          <Col>
            <Button
              variant="success"
              onClick={() => navigate(`/reservas/crear`)}
              className="my-4"
            >
              Nueva Reserva
            </Button>
            {items.length ? (
              <Table striped bordered responsive hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>AreaComun</th>
                    <th>Nombre</th>
                    <th>Cedula</th>
                    <th>FechaReserva</th>
                    <th>FechaEvento</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.areaComun}</td>
                      <td>{item.cedula}</td>
                      <td>{item.fechaReserva.slice(0, 10)}</td>
                      <td>{item.fechaEvento.slice(0, 10)}</td>
                      <td>{item.estado}</td>
                      <td>
                        <ButtonGroup className="float-end">
                          <Button
                            variant="info"
                            size="sm"
                            onClick={() => navigate(`/reservas/${item.id}`)}
                          >
                            Detalle
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() =>
                              navigate(`/reservas/${item.id}/editar`)
                            }
                            className="mx-2"
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            Eliminar
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="info" className="my-4 text-center">
                No existen registros.
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que quieres eliminar este item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReservaLista;
