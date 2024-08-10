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
  buscarEncuestaPorId,
  crearEncuesta,
  actualizarEncuesta,
} from "../../api/encuestas";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";

const EncuestaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    id: null,
    titulo: "",
    descripcion: "",
  });
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
    return () => setIsLoading(false);
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
      actualizarEncuesta(item.id, item)
        .then(() => {
          navigate("/encuestas");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setError(true);
        });
    } else {
      crearEncuesta(item)
        .then(() => {
          navigate("/encuestas");
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
          <h2>{item ? "Editar Encuesta" : "Crear Encuesta"}</h2>
          {error && (
            <Alert variant="danger">
              Ocurrió un error. Por favor intente de nuevo.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                required
                type="text"
                name="titulo"
                defaultValue={item.titulo}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                required
                type="text"
                name="descripcion"
                defaultValue={item.descripcion}
                onChange={handleChange}
                disabled={isLoading}
              />
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

export default EncuestaForm;
