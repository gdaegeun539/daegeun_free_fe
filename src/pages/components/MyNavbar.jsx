import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar, Button } from "react-bootstrap";

const MyNavBar = () => {
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
        <Button className="justify-content-end button-palette-custom">
          기기 추가
        </Button>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
