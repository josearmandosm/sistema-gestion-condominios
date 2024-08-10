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
  buscarReservaPorId,
  crearReserva,
  actualizarReserva,
} from "../../api/reservas";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";

const ReservaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    id: null,
    areaComun: "",
    nombre: "",
    cedula: "",
    fechaEvento: "",
    estado: "Pendiente",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarReservaPorId(id)
        .then((response) => {
          setItem({
            id: response.id,
            areaComun: response.areaComun,
            nombre: response.nombre,
            cedula: response.cedula,
            fechaEvento: response.fechaEvento.slice(0, 10),
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
      actualizarReserva(item.id, item)
        .then(() => {
          navigate("/reservas");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setError(true);
        });
    } else {
      crearReserva(item)
        .then(() => {
          navigate("/reservas");
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
          <h2>{item.id ? "Editar Reserva" : "Crear Reserva"}</h2>
          {error && (
            <Alert variant="danger">
              Ocurrió un error. Por favor intente de nuevo.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Área Común</Form.Label>
              <Form.Control
                required
                type="text"
                name="areaComun"
                value={item.areaComun}
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
              <Form.Label>Cédula</Form.Label>
              <Form.Control
                required
                type="text"
                name="cedula"
                value={item.cedula}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Fecha del Evento</Form.Label>
              <Form.Control
                required
                type="date"
                name="fechaEvento"
                value={item.fechaEvento}
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
                <option value="aprobada">Aprobada</option>
                <option value="rechazada">Rechazada</option>
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

export default ReservaForm;
