import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { buscarMantenimientoPorId } from "../../api/mantenimientos";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";

const MantenimientoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarMantenimientoPorId(id)
        .then((response) => {
          console.log(response);
          setItem({
            id: response.id,
            descripcion: response.descripcion,
            fechaSolicitud: response.fechaSolicitud.slice(0, 10),
            fechaCompletado: response.fechaCompletado.slice(0, 10),
            estado: response.estado,
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          setError(error);
        });
    }
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Alert variant="info" className="my-4 text-center">
        No existen registros.
      </Alert>
    );
  }

  return (
    <Container className="my-4">
      <h2>Detalle Mantenimiento</h2>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Id: {item.id}</Card.Title>
              <Card.Text>Descripción: {item.descripcion}</Card.Text>
              <Card.Text>Fecha Solicitud: {item.fechaSolicitud}</Card.Text>
              <Card.Text>Fecha Completado: {item.fechaCompletado}</Card.Text>
              <Card.Text>Estado: {item.estado}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate(`/mantenimientos`)}>
            Atrás
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MantenimientoDetalle;
