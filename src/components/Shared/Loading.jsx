import { Spinner } from "react-bootstrap";

const Loading = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      zIndex: 9999,
    }}
  >
    <Spinner animation="border" role="status" />
  </div>
);

export default Loading;
