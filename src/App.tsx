import { useState } from "react";
import "./App.css";
import { TaskData } from "./task";

// interface Task {
//   text: string;
//   id: number;
//   isCompleted: boolean;
// }

function App() {
  const [taskList, setTaskList] = useState<TaskData[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleIsCompleted = (task: TaskData) => {
    setTaskList(
      taskList.map((t) => {
        if (t.id === task.id) {
          return { ...task, isCompleted: !task.isCompleted };
        } else {
          return task;
        }
      })
    );
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const newTask: TaskData = {
      text: inputValue,
      id: Date.now(),
      isCompleted: false,
    };
    setTaskList([...taskList, newTask]);
    setInputValue("");
  };

  const handleDelete = (task: TaskData) => {
    setTaskList(taskList.filter((t) => t.id !== task.id));
  };

  console.log(taskList);

  return (
    <>
      <form id="task-form" onSubmit={handleInputSubmit}>
        <h1>To-do list</h1>
        <input
          type="text"
          placeholder="Añade una tarea"
          value={inputValue}
          onChange={handleInput}
        />
        <button type="submit">Añadir Task</button>
      </form>
      {taskList.map((task, index) => {
        return (
          <div
            key={index + task.id}
            className="task-container"
            id={task.id.toString()}
          >
            <input
              type="checkbox"
              checked={task.isCompleted}
              onClick={() => handleIsCompleted(task)}
            />
            <p>{task.text}</p>
            <button onClick={() => handleDelete(task)}>Eliminar</button>
          </div>
        );
      })}
    </>
  );
}

export default App;
