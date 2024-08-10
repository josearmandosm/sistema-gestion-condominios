import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { buscarPagoPorId } from "../../api/pagos";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";

const PagoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarPagoPorId(id)
        .then((response) => {
          console.log(response);
          setItem({
            id: response.id,
            monto: response.monto,
            descripcion: response.descripcion,
            descripcionPago: response.descripcionPago,
            fechaPago: response.fechaPago.slice(0, 10),
            tipoPago: response.tipoPago,
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
      <h2>Detalle Pago</h2>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Id: {item.id}</Card.Title>
              <Card.Text>Monto: {item.monto}</Card.Text>
              <Card.Text>Descripcion: {item.descripcion}</Card.Text>
              <Card.Text>DescripcionPago: {item.descripcionPago}</Card.Text>
              <Card.Text>FechaPago: {item.fechaPago}</Card.Text>
              <Card.Text>TipoPago: {item.tipoPago}</Card.Text>
              <Card.Text>Estado: {item.estado}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate(`/pagos`)}>
            Atrás
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PagoDetalle;
