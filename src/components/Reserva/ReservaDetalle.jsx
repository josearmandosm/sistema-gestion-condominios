import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { buscarReservaPorId } from "../../api/reservas";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";

const ReservaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarReservaPorId(id)
        .then((response) => {
          console.log(response);
          setItem({
            id: response.id,
            areaComun: response.areaComun,
            nombre: response.nombre,
            cedula: response.cedula,
            fechaReserva: response.fechaReserva.slice(0, 10),
            fechaEvento: response.fechaEvento.slice(0, 10),
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
      <h2>Detalle Reserva</h2>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Id: {item.id}</Card.Title>
              <Card.Subtitle>Número: {item.numero}</Card.Subtitle>
              <Card.Text>Área Común: {item.areaComun}</Card.Text>
              <Card.Text>Nombre: {item.nombre}</Card.Text>
              <Card.Text>Cédula: {item.cedula}</Card.Text>
              <Card.Text>Fecha Reserva: {item.fechaEvento}</Card.Text>
              <Card.Text>Fecha Evento: {item.fechaEvento}</Card.Text>
              <Card.Text>Estado: {item.estado}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate(`/reservas`)}>
            Atrás
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservaDetalle;
