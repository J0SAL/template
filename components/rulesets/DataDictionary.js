import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import dataContext from "../../hooks/DataContext/dataContext";

const DataDictionary = ({ id }) => {
  const { rulesets } = useContext(dataContext);
  const [dictionaries, setDictionaries] = useState([]);
  const [selectedDict, setSelectedDict] = useState({});

  useEffect(() => {
    if (rulesets && id) {
      setDictionaries(rulesets.find((item) => item.id == id)?.dictionaries);
    }
  }, [rulesets, id]);

  const BadgeStyle = {
    marginBottom: "15px",
    fontSize: "15px",
    textAlign: "center",
    width: "100%",
    height: "13%",
    cursor: "pointer",
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card
            style={{
              width: "20rem",
              height: "25rem",
              margin: "10px",
              boxShadow: "2px 2px 5px 2px lightblue",
              border: "1px solid black",
            }}
          >
            <Card.Body>
              <Card.Title className="d-flex justify-content-center align-items-center">
                <h5>Data Dictionary Keywords</h5>
              </Card.Title>
              {dictionaries?.map((dictionary, key) => (
                <Badge
                  key={key}
                  varaint="primary"
                  className="d-flex justify-content-center align-items-center"
                  style={BadgeStyle}
                  onClick={() => setSelectedDict(dictionary)}
                >
                  {dictionary.dictName}
                </Badge>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              width: "50rem",
              height: "25rem",
              margin: "10px",
              maxHeight: "400px",
              boxShadow: "2px 2px 5px 2px lightblue",
              border: "1px solid black",
              overflowY: "auto",
            }}
          >
            <Card.Body>
              <Card.Title>Data Dictionary</Card.Title>
              {selectedDict?.dictContent && (
                <Card.Text>
                  <pre>
                    {JSON.parse(JSON.stringify(selectedDict.dictContent))}
                  </pre>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DataDictionary;
