export interface TaskData {
  id: number;
  text: string;
  isCompleted: boolean;
}

export const Task = (props: { task: TaskData; index: number }) => {
  const { task, index } = props;
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
};
