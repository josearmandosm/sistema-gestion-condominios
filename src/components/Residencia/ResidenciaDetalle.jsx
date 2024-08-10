import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { buscarResidenciaPorId } from "../../api/residencias";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";

const ResidenciaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarResidenciaPorId(id)
        .then((response) => {
          console.log(response);
          setItem({
            id: response.id,
            numero: response.numero,
            direccion: response.direccion,
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
      <h2>Detalle Residencia</h2>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Id: {item.id}</Card.Title>
              <Card.Subtitle>Número: {item.numero}</Card.Subtitle>
              <Card.Text>Dirección: {item.direccion}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate(`/residencias`)}>
            Atrás
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ResidenciaDetalle;
