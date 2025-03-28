export interface TaskData {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface TaskProps {
  task: TaskData;
  index: number;
  setTaskList: React.Dispatch<React.SetStateAction<TaskData[]>>;
}

export const Task = (props: TaskProps) => {
  const { task, index, setTaskList } = props;

  const handleDelete = (task: TaskData) => {
    setTaskList((prevTaskList) => prevTaskList.filter((t) => t.id !== task.id));
  };

  const handleIsCompleted = (task: TaskData) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((t) => {
        if (t.id === task.id) {
          return { ...t, isCompleted: !task.isCompleted };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <div
      key={index + task.id}
      className="task-container"
      id={task.id.toString()}
    >
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => handleIsCompleted(task)}
      />
      <p>{task.text}</p>
      <button onClick={() => handleDelete(task)}>Eliminar</button>
    </div>
  );
};
