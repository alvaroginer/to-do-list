export interface TaskData {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface TaskProps {
  task: TaskData;
  index: number;
  onDelete: (task: TaskData) => void;
  onCompleted: (task: TaskData) => void;
}

export const Task = (props: TaskProps) => {
  const { task, index, onDelete, onCompleted } = props;

  return (
    <div
      key={index + task.id}
      className="task-container"
      id={task.id.toString()}
    >
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onCompleted(task)}
      />
      <p>{task.text}</p>
      <button onClick={() => onDelete(task)}>Eliminar</button>
    </div>
  );
};
