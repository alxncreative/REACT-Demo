import Header from "./components/Header/header";
import TaskList from "./components/TaskList/taskList";
import Task from "./components/Task/task";
import { useState } from "react";
import TaskForm from "./components/TaskForm/taskForm";

function App() {
  const handleTaskClick = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const [tasks, setTasks] = useState(savedTasks);
  const [newTaskText, setNewTaskText] = useState("");

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();

    const newId = tasks.length > 0? tasks[tasks.length - 1].id + 1 : 1;
    const taskLabel = event.target.elements.taskLabel.value;

    if (taskLabel.trim() === "") {
      return;
    }

    const newTasks = [...tasks, { id: newId, taskText: taskLabel, completed: false, isUpdating: false }];

    setTasks(newTasks);

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    event.target.elements.taskLabel.value="";

    setNewTaskText("");
  };

  const handleTaskDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const [editId, setEditId] = useState(null);

  const editStart = (id) => {
    setEditId(id);
  }

  const handleTaskUpdate = (id, newText) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
       ? {...task, taskText: newText }
        : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editEnd = (id) => {
    setEditId(null);
  }

  return (
    <>
      <Header
      title="To-Do List"
      tagType="h1"
      />

      <main>
        {tasks.length === 0 && <p>No tasks yet. Add tasks using the form below</p>}

        {tasks.length > 0 && (
          <TaskList>
            {tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                taskText={task.taskText}
                onSelect={() => handleTaskClick(task.id)}
                onDelete={() => handleTaskDelete(task.id)}
                onTextClick={() => editStart(task.id)}
                onChange={(e) => handleTaskUpdate(task.id, e.target.value)}
                onBlur={() => editEnd(task.id) }
                completed={task.completed}
                isUpdating={editId === task.id}
              />
            ))}
          </TaskList>
        )}

        <TaskForm onSubmit={handleNewTaskSubmit} />
      </main>
    </>
  );
}

export default App;
