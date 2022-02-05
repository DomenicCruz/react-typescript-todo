import { ReactElement, useRef } from "react";
import "./styles.css";

interface InputFieldProps {
  toDo: string;
  setToDo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

export default function InputField({
  toDo,
  setToDo,
  handleAdd,
}: InputFieldProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      action=""
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        value={toDo}
        className="input__box"
        type=""
        placeholder="Enter a task!"
        onChange={(e) => {
          setToDo(e.target.value);
        }}
      />
      <button className="input__submit" type="submit">
        Add
      </button>
    </form>
  );
}
