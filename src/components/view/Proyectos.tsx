import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../layout/Header-Home';
import Footer from '../layout/Footer';


const Proyectos: React.FC = () => {
  return (
<>
    <Header/>

    <Row className="px-4 my-5" >
          <Col sm>
            <Card>
              <Card.Body>
                <Card.Title>Investigación de campo</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  ratione aut dolores quas atque distinctio magni! Unde
                  praesentium accusantium et consectetur magni veritatis veniam
                  autem, sapiente, beatae voluptatibus, voluptatum voluptates?
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card>
              <Card.Body>
                <Card.Title>Ingenieria Biomedica</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  ratione aut dolores quas atque distinctio magni! Unde
                  praesentium accusantium et consectetur magni veritatis veniam
                  autem, sapiente, beatae voluptatibus, voluptatum voluptates?
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card>
              <Card.Body>
                <Card.Title>Paginas con react</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  ratione aut dolores quas atque distinctio magni! Unde
                  praesentium accusantium et consectetur magni veritatis veniam
                  autem, sapiente, beatae voluptatibus, voluptatum voluptates?
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="px-4 my-5" >
          <Col sm>
            <Card>
              <Card.Body>
                <Card.Title>Investigación de campo</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  ratione aut dolores quas atque distinctio magni! Unde
                  praesentium accusantium et consectetur magni veritatis veniam
                  autem, sapiente, beatae voluptatibus, voluptatum voluptates?
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card>
              <Card.Body>
                <Card.Title>Ingenieria Biomedica</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  ratione aut dolores quas atque distinctio magni! Unde
                  praesentium accusantium et consectetur magni veritatis veniam
                  autem, sapiente, beatae voluptatibus, voluptatum voluptates?
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card>
              <Card.Body>
                <Card.Title>Paginas con react</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  ratione aut dolores quas atque distinctio magni! Unde
                  praesentium accusantium et consectetur magni veritatis veniam
                  autem, sapiente, beatae voluptatibus, voluptatum voluptates?
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
<Footer/>
    </>
  );
};

export default Proyectos;