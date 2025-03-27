import { useState } from "react";
import { Task } from "./task";
import "./App.css";

//Hacer una barra de búsqueda con preevntdefaul extraer su contenido y con el contenido crear una tarea cuando se pulse en un botón
// si el input está vacío el botón debe estar disabled

function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    setTaskList([
      ...taskList,
      { text: inputValue, checked: false, id: new Date() },
    ]);
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Añadir tarea"
          value={inputValue}
          onInput={handleInputChange}
        />
        <button onClick={handleClick}>Añadir</button>
      </form>
      {taskList.map((task, index) => {
        <Task text={task.text} id={index} isCompleted={task.checked} />;
      })}
    </>
  );
}

export default App;
