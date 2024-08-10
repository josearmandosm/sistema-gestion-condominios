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
  buscarMantenimientoPorId,
  crearMantenimiento,
  actualizarMantenimiento,
} from "../../api/mantenimientos";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";

const MantenimientoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    id: null,
    descripcion: "",
    fechaCompletado: "",
    estado: "Pendiente",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarMantenimientoPorId(id)
        .then((response) => {
          setItem({
            id: response.id,
            descripcion: response.descripcion,
            fechaCompletado: response.fechaCompletado.slice(0, 10),
            estado: response.estado,
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
    setItem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    if (item.id) {
      actualizarMantenimiento(item.id, item)
        .then(() => {
          navigate("/mantenimientos");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setError(true);
        });
    } else {
      crearMantenimiento(item)
        .then(() => {
          navigate("/mantenimientos");
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
          <h2>{item.id ? "Editar Mantenimiento" : "Crear Mantenimiento"}</h2>
          {error && (
            <Alert variant="danger">
              Ocurrió un error. Por favor intente de nuevo.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                required
                type="text"
                name="descripcion"
                value={item.descripcion}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Fecha Completado</Form.Label>
              <Form.Control
                required
                type="date"
                name="fechaCompletado"
                value={item.fechaCompletado}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Estado</Form.Label>
              <Form.Control
                required
                as="select"
                name="estado"
                value={item.estado}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="pendiente">Pendiente</option>
                <option value="enProgreso">EnProgreso</option>
                <option value="completado">Completado</option>
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

export default MantenimientoForm;
