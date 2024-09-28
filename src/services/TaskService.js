const tasks = [];

const TaskService = {
  getTasks: () => {
    return Promise.resolve(tasks);
  },
  addTask: (task) => {
    tasks.push(task);
    return Promise.resolve(task);
  },
  deleteTask: (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    return Promise.resolve();
  },
  updateTask: (updatedTask) => {
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    tasks[index] = updatedTask;
    return Promise.resolve(updatedTask);
  },
};

export default TaskService;
