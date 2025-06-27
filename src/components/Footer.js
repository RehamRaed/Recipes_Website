import logo from "../assets/logo2.png";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer style={{backgroundColor: "#333" , padding: "30px 0px" , marginTop:"50px"}}>
      <Container >
        <Row className=" mb-3" style={{color:"#909090"}}>
          <Col lg={4} xs={12} className="text-center">الشروط والأحكام</Col>
          <Col lg={4} xs={12} className="text-center">© جميع الحقوق محفوظة 2025</Col>
          <Col lg={4} xs={12} className="text-center">Privacy Policy</Col>
        </Row>

        <Row className="justify-content-center mb-3">
          <img src={logo} alt="logo" style={{ width:"90px" , margin:"30px auto"}} />
        </Row>

        <Row className="justify-content-center">
          <div className="icons-container d-flex gap-4 fs-4 justify-content-center" style={{width: "30%"}}>
            <a href="#"><i className="bi bi-facebook text-white"></i></a>
            <a href="#"><i className="bi bi-twitter text-white"></i></a>
            <a href="#"><i className="bi bi-instagram text-white"></i></a>
            <a href="#"><i className="bi bi-youtube text-white"></i></a>
            <a href="#"><i className="bi bi-linkedin text-white"></i></a>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
