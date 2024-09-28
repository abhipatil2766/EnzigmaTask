// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, task, handleSave }) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: ''
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'New Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAssignedTo">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="text"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formComments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              type="text"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
