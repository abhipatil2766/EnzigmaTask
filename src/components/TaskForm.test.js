import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  it('renders the task form correctly', () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    // Check for form fields
    expect(screen.getByPlaceholderText('Assigned To')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Status')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Comments')).toBeInTheDocument();
  });

  it('submits the form with correct values', () => {
    const mockSubmit = jest.fn();
    render(<TaskForm onSubmit={mockSubmit} />);

    // Simulate filling form
    fireEvent.change(screen.getByPlaceholderText('Assigned To'), { target: { value: 'User 1' } });
    fireEvent.change(screen.getByPlaceholderText('Status'), { target: { value: 'In Progress' } });
    fireEvent.change(screen.getByPlaceholderText('Comments'), { target: { value: 'Test comment' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Save'));

    // Expect form submission to happen
    expect(mockSubmit).toHaveBeenCalledWith({
      assignedTo: 'User 1',
      status: 'In Progress',
      dueDate: '',
      priority: '',
      comments: 'Test comment',
    });
  });
});
