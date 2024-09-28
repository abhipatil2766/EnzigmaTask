// src/components/TaskList.js
import React from 'react';
import { Table, Dropdown, DropdownButton } from 'react-bootstrap';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.assignedTo}</td>
            <td>{task.status}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>{task.comments}</td>
            <td>
              <DropdownButton title="Actions">
                <Dropdown.Item onClick={() => onEdit(task)}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => onDelete(task.id)}>Delete</Dropdown.Item>
              </DropdownButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskList;
