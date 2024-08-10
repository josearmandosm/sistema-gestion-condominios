import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import TopNavbar from "./components/TopNavbar.jsx";
import HomePage from "./components/HomePage.jsx";
import Login from "./components/Auth/Login.jsx";
import { UsuarioLista, UsuarioForm, UsuarioDetalle } from "./components/Usuario";
import { ResidenciaLista, ResidenciaForm, ResidenciaDetalle } from "./components/Residencia";
import { ReservaLista, ReservaForm, ReservaDetalle } from "./components/Reserva";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { VisitaForm, VisitaDetalle, VisitaLista } from "./components/Visita";
import { PagoForm, PagoDetalle, PagoLista } from "./components/Pago";
import {
  NotificacionForm,
  NotificacionDetalle,
  NotificacionLista,
} from "./components/Notificacion";
import {
  MantenimientoForm,
  MantenimientoDetalle,
  MantenimientoLista,
} from "./components/Mantenimiento";
import { EncuestaForm, EncuestaDetalle, EncuestaLista } from "./components/Encuesta";
import ProtectedRoute from "./context/ProtectedRoute.jsx";

const ProtectedLayout = () => (
  <ProtectedRoute>
    <Outlet />
  </ProtectedRoute>
);

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <TopNavbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<UsuarioForm />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/encuestas" element={<EncuestaLista />} />
            <Route path="/encuestas/crear" element={<EncuestaForm />} />
            <Route path="/encuestas/:id" element={<EncuestaDetalle />} />
            <Route path="/encuestas/:id/editar" element={<EncuestaForm />} />

            <Route path="/mantenimientos" element={<MantenimientoLista />} />
            <Route path="/mantenimientos/crear" element={<MantenimientoForm />} />
            <Route path="/mantenimientos/:id" element={<MantenimientoDetalle />} />
            <Route path="/mantenimientos/:id/editar" element={<MantenimientoForm />} />

            <Route path="/notificaciones" element={<NotificacionLista />} />
            <Route path="/notificaciones/crear" element={<NotificacionForm />} />
            <Route path="/notificaciones/:id" element={<NotificacionDetalle />} />
            <Route path="/notificaciones/:id/editar" element={<NotificacionForm />} />

            <Route path="/pagos" element={<PagoLista />} />
            <Route path="/pagos/crear" element={<PagoForm />} />
            <Route path="/pagos/:id" element={<PagoDetalle />} />
            <Route path="/pagos/:id/editar" element={<PagoForm />} />

            <Route path="/reservas" element={<ReservaLista />} />
            <Route path="/reservas/crear" element={<ReservaForm />} />
            <Route path="/reservas/:id" element={<ReservaDetalle />} />
            <Route path="/reservas/:id/editar" element={<ReservaForm />} />

            <Route path="/residencias" element={<ResidenciaLista />} />
            <Route path="/residencias/crear" element={<ResidenciaForm />} />
            <Route path="/residencias/:id" element={<ResidenciaDetalle />} />
            <Route path="/residencias/:id/editar" element={<ResidenciaForm />} />

            <Route path="/usuarios" element={<UsuarioLista />} />
            <Route path="/usuarios/crear" element={<UsuarioForm />} />
            <Route path="/usuarios/:id" element={<UsuarioDetalle />} />
            <Route path="/usuarios/:id/editar" element={<UsuarioForm />} />

            <Route path="/visitas" element={<VisitaLista />} />
            <Route path="/visitas/crear" element={<VisitaForm />} />
            <Route path="/visitas/:id" element={<VisitaDetalle />} />
            <Route path="/visitas/:id/editar" element={<VisitaForm />} />
          </Route>

          <Route path="*" element={<p>No hay nada aquí: 404!</p>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
