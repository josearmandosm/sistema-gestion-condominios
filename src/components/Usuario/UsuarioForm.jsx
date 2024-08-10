import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { buscarUsuarioPorId, crearUsuario, actualizarUsuario } from "../../api/usuarios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import Error from "../Shared/Error";

const UsuarioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    id: null,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rol: "visitante",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      buscarUsuarioPorId(id)
        .then((response) => {
          setItem({
            id: response.id,
            nombre: response.nombre,
            apellido: response.apellido,
            telefono: response.telefono,
            email: response.email,
            password: response.password,
            rol: response.rol,
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
      actualizarUsuario(item.id, item)
        .then(() => {
          navigate("/usuarios");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setError(true);
        });
    } else {
      crearUsuario(item)
        .then(() => {
          navigate("/usuarios");
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
          <h2>{item.id ? "Editar Usuario" : "Crear Usuario"}</h2>
          {error && <Alert variant="danger">Ocurrió un error. Por favor intente de nuevo.</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                type="text"
                name="nombre"
                value={item.nombre}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                required
                type="text"
                name="apellido"
                value={item.apellido}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                required
                type="text"
                name="telefono"
                value={item.telefono}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={item.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={item.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Form.Label>Rol</Form.Label>
              <Form.Control
                required
                as="select"
                name="rol"
                value={item.rol}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="administrador">Administrador</option>
                <option value="residente">Residente</option>
                <option value="visitante">Visitante</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="consejo">Consejo</option>
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

export default UsuarioForm;
