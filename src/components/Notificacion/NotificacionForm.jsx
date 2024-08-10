import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  buscarNotificacionPorId,
  crearNotificacion,
  actualizarNotificacion,
} from "../../api/notificaciones";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";

const NotificacionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    id: null,
    mensaje: "",
    leído: "",
    estado: "Pendiente",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarNotificacionPorId(id)
        .then((response) => {
          setItem({
            id: response.id,
            mensaje: response.mensaje,
            leido: response.leido,
          });
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
        });
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === "leido" ? value === "true" : value;
    setItem((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    if (item.id) {
      actualizarNotificacion(item.id, item)
        .then(() => {
          navigate("/notificaciones");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setError(true);
        });
    } else {
      crearNotificacion(item)
        .then(() => {
          navigate("/notificaciones");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setError(true);
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2>{item.id ? "Editar Notificacion" : "Crear Notificacion"}</h2>
          {error && (
            <Alert variant="danger">
              Ocurrió un error. Por favor intente de nuevo.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                required
                type="text"
                name="mensaje"
                value={item.mensaje}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Leído</Form.Label>
              <Form.Control
                required
                as="select"
                name="leido"
                value={item.leido}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="true">Sí</option>
                <option value="false">No</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Guardar"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificacionForm;
