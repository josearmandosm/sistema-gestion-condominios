import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../context/AuthContext";
import { Button } from "react-bootstrap";
import Loading from "./Shared/Loading";

function TopNavbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Gestión de Condominios</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                className={({ isActive }) => "nav-link link-dark" + (isActive ? " active" : "")}
              >
                Home
              </Nav.Link>

              {!isAuthenticated ? (
                <>
                  <Button onClick={() => navigate("/login")} className="mx-2">
                    Login
                  </Button>
                  <Button onClick={() => navigate("/registrar")}>Registrar</Button>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/encuestas"
                    className={({ isActive }) => "nav-link link-dark" + (isActive ? " active" : "")}
                  >
                    Encuestas
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/mantenimientos"
                    className={({ isActive }) => "nav-link link-dark" + (isActive ? " active" : "")}
                  >
                    Mantenimientos
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/notificaciones"
                    className={({ isActive }) => "nav-link link-dark" + (isActive ? " active" : "")}
                  >
                    Notificaciones
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/pagos"
                    className={({ isActive }) => "nav-link link-dark" + (isActive ? " active" : "")}
                  >
                    Pagos
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/reservas"
                    className={({ isActive }) => "nav-link link-dark" + (isActive ? " active" : "")}
                  >
                    Reservas
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/residencias"
                    className={({ isActive }) => "nav-link link-dark" + (isActive ? " active" : "")}
                  >
                    Residencias
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/usuarios"
                    className={({ isActive }) => "nav-link link-dark" + (isActive ? " active" : "")}
                  >
                    Usuarios
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/visitas"
                    className={({ isActive }) => "nav-link link-dark" + (isActive ? " active" : "")}
                  >
                    Visitas
                  </Nav.Link>
                  <Button onClick={logout} className="mx-2">
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;
