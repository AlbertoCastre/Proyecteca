import React from 'react';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import Header from '../layout/Header-Home';
import Footer from '../layout/Footer';
import { FiAlignJustify } from 'react-icons/fi';





const Proyectos: React.FC = () => {
  return (
<>
    <Header/>


    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Row className="px-4 my-5 align-items-center" style={{ width: '100%', maxWidth: '1200px' }}>
        <Col sm={5}>
         
          <p className="mt-4">
          <h1 className="font-weight-light">Ingenieria en software </h1>
          </p>
        </Col>
        <Col sm={7}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Col>
      </Row>
    </div>



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