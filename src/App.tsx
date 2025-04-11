import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Task, TaskData } from "./task";
import { StreakMessage } from "./StreakMessage";

interface FilterData {
  isCompleted: boolean;
  isPending: boolean;
}

function App() {
  const [taskList, setTaskList] = useState<TaskData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const [filterActive, setFilterActive] = useState<FilterData>({
    isCompleted: false,
    isPending: false,
  });
  const [streakModal, setStreakModal] = useState<boolean>(false);
  const [completedTasks, setCompletedTasks] = useState<number>(0);

  useEffect(() => {
    if (streakModal) {
      const timeOut = setTimeout(() => {
        setStreakModal(false);
        console.log("dentro del timeout");
      }, 5000);

      return () => {
        console.log("cerramos el timeout");
        clearTimeout(timeOut);
      };
    }
  }, [streakModal]);

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
          if (t.isCompleted === false) {
            const newTaskLists = completedTasks + 1;
            if (newTaskLists === 4) {
              setStreakModal(true);
              setCompletedTasks(0);
            } else {
              setCompletedTasks(completedTasks + 1);
            }
          }
          return { ...t, isCompleted: !task.isCompleted };
        } else {
          return t;
        }
      })
    );
  };

  console.log(completedTasks);

  const filteredTasksList = useMemo(() => {
    if (
      !Object.values(filterActive).includes(true) ||
      searchBarValue.trim().length > 0
    ) {
      return taskList.filter((task) => {
        if (
          searchBarValue.trim().length > 0 &&
          !task.text.toLowerCase().includes(searchBarValue.toLowerCase())
        ) {
          return false;
        }

        if (filterActive.isCompleted && !task.isCompleted) {
          return false;
        }

        if (filterActive.isPending && task.isCompleted) {
          return false;
        }

        return true;
      });
    } else {
      return taskList;
    }
  }, [filterActive, searchBarValue, taskList]);

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
          className={filterActive.isCompleted ? "selected" : ""}
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
          className={filterActive.isPending ? "selected" : ""}
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
      {filteredTasksList.map((task: TaskData, index: number) => {
        return (
          <Task
            key={index + 1}
            index={index}
            task={task}
            onDelete={handleDelete}
            onCompleted={handleIsCompleted}
          />
        );
      })}
      {streakModal && <StreakMessage />}
    </>
  );
}

export default App;
