import type { ReactElement } from "react";
import { useState, useRef, useEffect } from "react";
import { RiEdit2Fill, RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import TodoItem from "../models/todo";
import { Draggable } from "react-beautiful-dnd";

export interface ToDoItemProps {
  todo: TodoItem;
  toDoList: TodoItem[];
  setToDoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  className?: string;
  index: number;
}

export default function ToDo({
  todo,
  toDoList,
  setToDoList,
  className = "",
  index,
}: ToDoItemProps): ReactElement {
  const [edit, setEdit] = useState<boolean>(false);
  const [text, setText] = useState<string>(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleToggleDone = (todoId: number) => {
    setToDoList(
      toDoList.map((todo) =>
        todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (todoId: number) => {
    setToDoList(toDoList.filter((todo) => todo.id !== todoId));
  };

  const handleEdit = (e: React.FormEvent, todoId: number) => {
    e.preventDefault();
    setToDoList(
      toDoList.map((todo) => (todo.id === todoId ? { ...todo, text } : todo))
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          key={todo.id}
          ref={provided.innerRef}
          className={`todos__single ${className} ${
            snapshot.isDragging ? "drag" : ""
          }`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              onBlur={() => setEdit(false)}
              className="todos__single--text"
              ref={inputRef}
              type=""
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.text}</s>
          ) : (
            <span className="todos__single--text">{todo.text}</span>
          )}
          <div>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <RiDeleteBin6Fill />
            </span>
            <span className="icon" onClick={() => setEdit(!edit)}>
              <RiEdit2Fill />
            </span>
            <span className="icon" onClick={() => handleToggleDone(todo.id)}>
              <AiFillCheckCircle />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
}
