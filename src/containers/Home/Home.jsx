import "./Home.css";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  const navigate = useNavigate();
  return (
    <Container fluid className="d-flex flex-column justify-content-center min-vh-100">
      <Row className="container-home flex-grow-1">
        <Col>
          <div className="card">
            <h1>Welcome to <span className="fix-text">Fix</span>App</h1>
            <h4>If you can't fix it, you don't own it.! </h4>
            <h4>
              <span className="text">Repair</span> is better than recycling
            </h4>
            <p>
              Making our things las longer is both moew efficient and more
              cost-effective than mining them for raw materials.
            </p>
            <h4>
              <span className="text">Repair</span> saves you money{" "}
            </h4>
            <p>
              Fixing devices is often free, and usually cheaper than replacing
              them.
            </p>
            <h4>
              <span className="text">Repair</span> saves the planet{" "}
            </h4>
            <p>
              Earth has limited resources. Eventually we will run out. The best
              way to be efficient is to reuse wht we already have.
            </p>
            <button className="custom-btn btn-1" onClick={()=> {navigate('/repairs')}}>Let's repair</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
