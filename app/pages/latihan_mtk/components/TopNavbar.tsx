import { Navbar, Nav, Container } from "react-bootstrap";

export function TopNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Latihan MTK</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
