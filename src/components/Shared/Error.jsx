import { Alert } from "react-bootstrap";

const Error = ({ message }) => (
  <Alert variant="danger" className="my-4">
    {message}
  </Alert>
);

export default Error;
