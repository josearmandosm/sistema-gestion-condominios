import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { buscarEncuestaPorId } from "../../api/encuestas";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";

const EncuestaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarEncuestaPorId(id)
        .then((response) => {
          console.log(response);
          setItem({
            id: response.id,
            titulo: response.titulo,
            descripcion: response.descripcion,
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
      <h2>Detalle Encuesta</h2>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Id: {item.id}</Card.Title>
              <Card.Subtitle>Título: {item.titulo}</Card.Subtitle>
              <Card.Text>Descripción: {item.descripcion}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate(`/encuestas`)}>
            Atrás
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EncuestaDetalle;
