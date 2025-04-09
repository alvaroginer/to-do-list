import { useEffect, useState } from "react";
import "./App.css";
import { Task, TaskData } from "./task";

interface FilterData {
  isCompleted: boolean;
  isPending: boolean;
}

function App() {
  const [taskList, setTaskList] = useState<TaskData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<TaskData[]>([]);
  const [filterActive, setFilterActive] = useState<FilterData>({
    isCompleted: false,
    isPending: false,
  });

  useEffect(() => {
    setFilteredTasks([...taskList]);

    if (searchBarValue.trim.length > 0) {
      setFilteredTasks(
        taskList.filter((task) =>
          task.text.toLowerCase().includes(searchBarValue.toLowerCase())
        )
      );
    }

    if (filterActive.isCompleted === true) {
      setFilteredTasks((currentFilterTasks) =>
        currentFilterTasks.filter((task) => task.isCompleted === true)
      );
    }

    if (filterActive.isPending === true) {
      setFilteredTasks((currentFilterTasks) =>
        currentFilterTasks.filter((task) => task.isCompleted === false)
      );
    }
  }, [searchBarValue, taskList, filterActive]);

  const handleSearchBarValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(e.target.value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const newTask: TaskData = {
      text: inputValue,
      id: Date.now() + 1,
      isCompleted: false,
    };
    setTaskList([...taskList, newTask]);
    setInputValue("");
  };

  const handleDelete = (task: TaskData) => {
    setTaskList(taskList.filter((t) => t.id !== task.id));
  };

  const handleIsCompleted = (task: TaskData) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((t) => {
        if (t.id === task.id) {
          return { ...t, isCompleted: !task.isCompleted };
        } else {
          return t;
        }
      })
    );
  };

  return (
    <>
      <input
        type="text"
        onChange={handleSearchBarValue}
        placeholder="Search the tasks here..."
      />
      <form id="task-form" onSubmit={handleInputSubmit}>
        <h1>To-do list</h1>
        <input
          type="text"
          placeholder="Añade una tarea"
          value={inputValue}
          onChange={handleInput}
        />
        <button type="submit">Añadir Task</button>
        <button
          onClick={() =>
            setFilterActive({
              ...filterActive,
              isCompleted: !filterActive.isCompleted,
            })
          }
        >
          Only show completed
        </button>
        <button
          onClick={() =>
            setFilterActive({
              ...filterActive,
              isPending: !filterActive.isPending,
            })
          }
        >
          Only show pending
        </button>
      </form>
      {searchBarValue === "" && !Object.values(filterActive).includes(true) ? (
        taskList.map((task: TaskData, index: number) => {
          return (
            <Task
              key={index + 1}
              index={index}
              task={task}
              onDelete={handleDelete}
              onCompleted={handleIsCompleted}
            />
          );
        })
      ) : filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => (
          <Task
            key={index + 1}
            index={index}
            task={task}
            onDelete={handleDelete}
            onCompleted={handleIsCompleted}
          />
        ))
      ) : (
        <p>No results found</p>
      )}
    </>
  );
}

export default App;
