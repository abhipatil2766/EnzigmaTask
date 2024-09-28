// src/App.js
import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Button } from 'react-bootstrap';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleAddTask = () => {
    setCurrentTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleSaveTask = (task) => {
    if (task.id) {
      const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
      setTasks(updatedTasks);
    } else {
      task.id = tasks.length + 1; // Simple id generation
      setTasks([...tasks, task]);
    }
    setShowTaskForm(false);
  };
/*
  describe('App Component', () => {
    it('renders the main app correctly', () => {
      render(<App />);
  
      // Check if the task list and form are rendered
      expect(screen.getByText('Tasks')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });*/

  return (
    <div className="container mt-4">
      <h1>To-Do List Application</h1>
      <Button variant="primary" onClick={handleAddTask}>
        New Task
      </Button>
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      <TaskForm
        show={showTaskForm}
        handleClose={() => setShowTaskForm(false)}
        task={currentTask}
        handleSave={handleSaveTask}
      />
    </div>
  );
};

export default App;
