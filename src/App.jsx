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

  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();

    const newId = tasks.length > 0? tasks[tasks.length - 1].id + 1 : 1;
    const taskLabel = event.target.elements.taskLabel.value;

    if (taskLabel.trim() === "") {
      return;
    }

    setTasks([
      ...tasks,
      { id: newId, taskText: taskLabel, completed: false },
    ]);

    event.target.elements.taskLabel.value="";

    setNewTaskText("");
  };

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
                taskText={task.taskText}
                onSelect={() => handleTaskClick(task.id)}
                completed={task.completed}
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
