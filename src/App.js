import './App.css';
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Dropdown } from 'react-bootstrap';

const ExpressionEngine = () => {
  const [connectorType, setConnectorType] = useState('AND');
  const [expressions, setExpressions] = useState([
    { ruleType: 'Age', operator: '>', value: '', score: '' },
  ]);

  const handleConnectorTypeChange = (event) => {
    setConnectorType(event.target.value);
  };

  const handleExpressionChange = (index, field, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index][field] = value;
    setExpressions(updatedExpressions);
  };

  const handleAddExpression = () => {
    setExpressions([...expressions, { ruleType: 'Age', operator: '>', value: '', score: '' }]);
  };

  const handleSumbitExpression = (e) => {
    e.preventDefault();
    console.log(connectorType,expressions);
  };

  const handleDeleteExpression = (index) => {
    const updatedExpressions = [...expressions];
    updatedExpressions.splice(index, 1);
    setExpressions(updatedExpressions);
  };

  return (
    <div class="container-fluid">
    <Container>
      <h2>Task</h2>
      <Form>
        <Form.Group as={Row} controlId="connectorType">
          <Form.Label column sm="2">Connector Type</Form.Label>
          <Col sm="10">
            <Form.Control as="select" value={connectorType} onChange={handleConnectorTypeChange}>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </Form.Control>
          </Col>
        </Form.Group>

        
        {expressions.map((expression, index) => (
          <Row key={index} className='exprssions'>
            <Col>
              <Form.Group controlId={`ruleType-${index}`}>
                <Form.Label>Rule Type</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id={`ruleTypeDropdown-${index}`}>
                    {expression.ruleType}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleExpressionChange(index, 'ruleType', 'Age')}>Age</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleExpressionChange(index, 'ruleType', 'Credit Score')}>Credit Score</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleExpressionChange(index, 'ruleType', 'Account Balance')}>Account Balance</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`operator-${index}`}>
                <Form.Label>Operator</Form.Label>
                <Form.Control as="select" value={expression.operator} onChange={(e) => handleExpressionChange(index, 'operator', e.target.value)}>
                  <option>{'>'}</option>
                  <option>{'<'}</option>
                  <option>≥</option>
                  <option>≤</option>
                  <option>=</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`value-${index}`}>
                <Form.Label>Value</Form.Label>
                <Form.Control type="text" value={expression.value} onChange={(e) => handleExpressionChange(index, 'value', e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`score-${index}`}>
                <Form.Label>Score</Form.Label>
                <Form.Control type="text" value={expression.score} onChange={(e) => handleExpressionChange(index, 'score', e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => handleDeleteExpression(index)}>Delete</Button>
            </Col>
          </Row>
        ))}
        <div className='buttons'>
        <Button variant="primary" onClick={handleAddExpression}>Add Expression</Button>
        <Button variant="primary" onClick={handleSumbitExpression}>Sumbit</Button>
        </div>
        
      </Form>
      
      
    </Container>
    </div>
  );
};

export default ExpressionEngine;
