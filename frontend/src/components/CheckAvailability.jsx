import React from "react";
import { Button, Card, Dropdown } from "react-bootstrap";

const CheckAvailability = () => {
  return (
    <div>
      <Card>
        <Card.Body className="d-flex flex-wrap">
          <Dropdown align="end" className="me-auto ms-auto" auto>
            <Dropdown.Toggle variant="light">
              Select Country
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="end" className="me-auto ms-auto" auto>
            <Dropdown.Toggle variant="light">
              Select Country
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="end" className="me-auto ms-auto" auto>
            <Dropdown.Toggle variant="light">
              Select Country
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="end" className="me-auto ms-auto" auto>
            <Dropdown.Toggle variant="light">
              Select Country
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="warning" className="me-auto ms-auto">Check Avialability</Button>
          {/* Add more Dropdown components here */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CheckAvailability;
