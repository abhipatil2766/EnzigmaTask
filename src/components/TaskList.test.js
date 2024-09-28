import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

// Sample tasks data
const tasks = [
  { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '12/10/2024', priority: 'Low', comments: 'This task is good' },
  { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '14/09/2024', priority: 'High', comments: 'This task is important' },
];

describe('TaskList Component', () => {
  it('renders the task list correctly', () => {
    render(<TaskList tasks={tasks} onEdit={jest.fn()} onDelete={jest.fn()} />);
    
    // Check if the tasks are rendered
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });

  it('calls the delete function when delete button is clicked', () => {
    const mockDelete = jest.fn();
    render(<TaskList tasks={tasks} onEdit={jest.fn()} onDelete={mockDelete} />);
    
    // Simulate delete button click
    fireEvent.click(screen.getAllByText('Delete')[0]);
    
    // Expect delete to be called with task id 1
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it('calls the edit function when edit button is clicked', () => {
    const mockEdit = jest.fn();
    render(<TaskList tasks={tasks} onEdit={mockEdit} onDelete={jest.fn()} />);
    
    // Simulate edit button click
    fireEvent.click(screen.getAllByText('Edit')[0]);
    
    // Expect edit to be called with task object
    expect(mockEdit).toHaveBeenCalledWith(tasks[0]);
  });
});
