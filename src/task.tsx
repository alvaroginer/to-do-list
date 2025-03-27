export interface TaskData {
  id?: number;
  text: string;
  isCompleted: boolean;
}

export const Task = (props: TaskData) => {
  const { text, id, isCompleted = false } = props;
  return (
    <div key={id} className="task-container">
      <input
        type="checkbox"
        name="checked"
        checked={isCompleted}
        onChange={() => !isCompleted}
      />
      <p>{text}</p>
      <button>Eliminar</button>
    </div>
  );
};
