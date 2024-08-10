import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { buscarNotificacionPorId } from "../../api/notificaciones";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";

const NotificacionDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarNotificacionPorId(id)
        .then((response) => {
          console.log(response);
          setItem({
            id: response.id,
            mensaje: response.mensaje,
            fechaEnvio: response.fechaEnvio.slice(0, 10),
            leido: response.leido
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
      <h2>Detalle Notificacion</h2>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Id: {item.id}</Card.Title>
              <Card.Text>Mensaje: {item.mensaje}</Card.Text>
              <Card.Text>Fecha Envío: {item.fechaEnvio}</Card.Text>
              <Card.Text>Leído: {item.leido}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate(`/notificaciones`)}>
            Atrás
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificacionDetalle;
