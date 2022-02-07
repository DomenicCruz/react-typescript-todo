import type { ReactElement } from "react";
import { Droppable } from "react-beautiful-dnd";
import TodoItem from "../models/todo";
import ToDo from "./ToDo";

export interface ToDoListProps {
  toDoList: TodoItem[];
  setToDoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  completedtoDoList: TodoItem[];
  setCompletedToDoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

export default function ToDoList({
  toDoList,
  setToDoList,
  setCompletedToDoList,
  completedtoDoList,
}: ToDoListProps): ReactElement {
  return (
    <div className="container">
      <Droppable droppableId="active_tasks">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          >
            <span className="todo__header">Tasks!</span>
            {toDoList.map((todo, index) => (
              <ToDo
                index={index}
                todo={todo}
                key={todo.id}
                toDoList={toDoList}
                setToDoList={setToDoList}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="completed_tasks">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
          >
            <span className="todo__header">Completed!</span>
            {completedtoDoList.map((todo, index) => (
              <div className="">
                <ToDo
                  index={index}
                  className="remove"
                  todo={todo}
                  key={todo.id}
                  toDoList={completedtoDoList}
                  setToDoList={setCompletedToDoList}
                />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
