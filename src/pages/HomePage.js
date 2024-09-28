import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskService from '../services/TaskService';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    TaskService.getTasks().then((tasks) => setTasks(tasks));
  }, []);

  const handleAddOrUpdateTask = (task) => {
    if (taskToEdit) {
      TaskService.updateTask(task).then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === task.id ? task : t))
        );
        setTaskToEdit(null);
      });
    } else {
      TaskService.addTask(task).then(() => {
        setTasks((prevTasks) => [...prevTasks, task]);
      });
    }
  };

  const handleDeleteTask = (id) => {
    TaskService.deleteTask(id).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });
  };

  const handleEditTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTaskToEdit(task);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <TaskForm taskToEdit={taskToEdit} onSave={handleAddOrUpdateTask} />
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default HomePage;
