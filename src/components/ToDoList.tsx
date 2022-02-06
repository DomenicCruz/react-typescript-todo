import type { ReactElement } from "react";
import TodoItem from "../models/todo";
import ToDo from "./ToDo";

export interface ToDoListProps {
  toDoList: TodoItem[];
  setToDoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

export default function ToDoList({
  toDoList,
  setToDoList,
}: ToDoListProps): ReactElement {
  return (
    <div className="container">
      <div className="todos">
        <span className="todo__header">Tasks!</span>
        {toDoList.map((todo) => (
          <ToDo
            todo={todo}
            key={todo.id}
            toDoList={toDoList}
            setToDoList={setToDoList}
          />
        ))}
      </div>
      <div className="todos">
        <span className="todo__header">Completed!</span>
        {toDoList.map((todo) => (
          <div className="">
            <ToDo
              className="remove"
              todo={todo}
              key={todo.id}
              toDoList={toDoList}
              setToDoList={setToDoList}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
