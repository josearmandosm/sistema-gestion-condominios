import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { buscarUsuarioPorId } from "../../api/usuarios";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";

const UsuarioDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarUsuarioPorId(id)
        .then((response) => {
          console.log(response);
          setItem({
            id: response.id,
            nombre: response.nombre,
            apellido: response.apellido,
            telefono: response.telefono,
            email: response.email,
            rol: response.rol,
            fechaRegistro: response.fechaRegistro.slice(0, 10),
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
      <h2>Detalle Usuario</h2>
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Id: {item.id}</Card.Title>
              <Card.Text>Nombre: {item.nombre}</Card.Text>
              <Card.Text>Apellido: {item.apellido}</Card.Text>
              <Card.Text>Telefono: {item.telefono}</Card.Text>
              <Card.Text>Email: {item.email}</Card.Text>
              <Card.Text>Rol: {item.rol}</Card.Text>
              <Card.Text>FechaRegistro: {item.fechaRegistro}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate(`/usuarios`)}>
            Atrás
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UsuarioDetalle;
