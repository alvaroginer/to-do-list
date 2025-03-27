import { useState } from "react";
import { Task } from "./task";
import type { TaskData } from "./task";
import "./App.css";

//Hacer una barra de búsqueda con preevntdefaul extraer su contenido y con el contenido crear una tarea cuando se pulse en un botón
// si el input está vacío el botón debe estar disabled

function App() {
  const [taskList, setTaskList] = useState<TaskData[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setTaskList([...taskList, { text: inputValue, isCompleted }]);
    setInputValue("");
  };

  console.log(taskList);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Añadir tarea"
          value={inputValue}
          onInput={handleInputChange}
        />
        <button type="submit" disabled={!inputValue.trim()}>
          Añadir
        </button>
      </form>
      {taskList.map((task, index) => {
        return (
          <Task
            text={task.text}
            id={index}
            isCompleted={isCompleted}
            key={index + 1}
          />
        );
      })}
    </>
  );
}

export default App;
