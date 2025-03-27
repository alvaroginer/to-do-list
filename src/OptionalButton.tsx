interface OptionalButtonsProps {
  showButton?: boolean;
  text: string;
  type: "button" | "submit" | "reset";
  onClick: () => void;
}

export const OptionalButton = (props: OptionalButtonsProps) => {
  const { showButton, text, type, onClick } = props;

  if (!showButton) {
    return null;
  }
  return (
    <button onClick={onClick} type={type}>
      {text}
    </button>
  );
};
