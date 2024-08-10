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
import { buscarPagoPorId, crearPago, actualizarPago } from "../../api/pagos";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";

const PagoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    id: null,
    monto: "",
    descripcion: "",
    descripcionPago: "",
    fechaPago: "",
    tipoPago: "mantenimiento",
    estado: "pendiente",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarPagoPorId(id)
        .then((response) => {
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
      actualizarPago(item.id, item)
        .then(() => {
          navigate("/pagos");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setError(true);
        });
    } else {
      crearPago(item)
        .then(() => {
          navigate("/pagos");
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
          <h2>{item.id ? "Editar Pago" : "Crear Pago"}</h2>
          {error && (
            <Alert variant="danger">
              Ocurrió un error. Por favor intente de nuevo.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                required
                type="number"
                name="monto"
                value={item.monto}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                required
                type="text"
                name="descripcion"
                value={item.descripcion}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Descripción Pago</Form.Label>
              <Form.Control
                required
                type="text"
                name="descripcionPago"
                value={item.descripcionPago}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Fecha Pago</Form.Label>
              <Form.Control
                required
                type="date"
                name="fechaPago"
                value={item.fechaPago}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Tipo Pago</Form.Label>
              <Form.Control
                required
                as="select"
                name="tipoPago"
                value={item.tipoPago}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="mantenimiento">Mantenimiento</option>
                <option value="extracurricular">Extracurricular</option>
                <option value="otro">Otro</option>
              </Form.Control>
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                name="estado"
                value={item.estado}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="pendiente">Pendiente</option>
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

export default PagoForm;
