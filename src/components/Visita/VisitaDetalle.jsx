import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { buscarVisitaPorId } from "../../api/visitas";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";

const VisitaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarVisitaPorId(id)
        .then((response) => {
          console.log(response);
          setItem({
            id: response.id,
            cedula: response.cedula,
            nombre: response.nombre,
            fechaVisita: response.fechaVisita.slice(0, 10),
            tipoVisita: response.tipoVisita,
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
      <h2>Detalle Visita</h2>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Id: {item.id}</Card.Title>
              <Card.Text>Cédula: {item.cedula}</Card.Text>
              <Card.Text>Nombre: {item.nombre}</Card.Text>
              <Card.Text>FechaVisita: {item.fechaVisita}</Card.Text>
              <Card.Text>TipoVisita: {item.tipoVisita}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate(`/visitas`)}>
            Atrás
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default VisitaDetalle;
