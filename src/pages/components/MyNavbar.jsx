import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="info" variant="dark">
      <Container>
        <Navbar.Brand href="/">Infobility</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/category/samsung">Samsung</Nav.Link>
          <Nav.Link href="/category/apple">Apple</Nav.Link>
          <Nav.Link href="/category/google">Google</Nav.Link>
          <Nav.Link href="/category/xiaomi">Xiaomi</Nav.Link>
        </Nav>
        <Button
          className="justify-content-end button-palette-custom"
          onClick={() => {
            navigate("/device/add");
          }}>
          기기 추가
        </Button>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
