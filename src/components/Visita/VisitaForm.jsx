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
  buscarVisitaPorId,
  crearVisita,
  actualizarVisita,
} from "../../api/visitas";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";

const VisitaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    id: null,
    cedula: "",
    nombre: "",
    fechaVisita: "",
    tipoVisita: "Programada",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarVisitaPorId(id)
        .then((response) => {
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
      actualizarVisita(item.id, item)
        .then(() => {
          navigate("/visitas");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setError(true);
        });
    } else {
      crearVisita(item)
        .then(() => {
          navigate("/visitas");
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
          <h2>{item.id ? "Editar Visita" : "Crear Visita"}</h2>
          {error && (
            <Alert variant="danger">
              Ocurrió un error. Por favor intente de nuevo.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Cédula</Form.Label>
              <Form.Control
                required
                type="text"
                name="cedula"
                value={item.cedula}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                type="text"
                name="nombre"
                value={item.nombre}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Fecha Visita</Form.Label>
              <Form.Control
                required
                type="date"
                name="fechaVisita"
                value={item.fechaVisita}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Tipo Visita</Form.Label>
              <Form.Control
                required
                as="select"
                name="tipoVisita"
                value={item.tipoVisita}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="programada">Programada</option>
                <option value="manual">Manual</option>
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

export default VisitaForm;
