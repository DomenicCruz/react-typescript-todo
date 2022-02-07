import React, { useState, useCallback } from "react";
import "./App.css";
import InputField from "./components/InputField";
import ToDoList from "./components/ToDoList";
import TodoItem from "./models/todo";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [toDo, setToDo] = useState<string>("");
  const [toDoList, setToDoList] = useState<TodoItem[]>([]);
  const [completedtoDoList, setCompletedToDoList] = useState<TodoItem[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (toDo) {
      setToDoList([...toDoList, { id: Date.now(), text: toDo, isDone: false }]);
      setToDo("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    let add,
      active = [...toDoList],
      completed = [...completedtoDoList];

    //Remove item from the source and put it to the destination, setState
    if (source.droppableId === "active_tasks") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "active_tasks") {
      active.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }
    setCompletedToDoList(completed);
    setToDoList(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">DowIt!</span>
        <InputField toDo={toDo} setToDo={setToDo} handleAdd={handleAdd} />
        <ToDoList
          setToDoList={setToDoList}
          toDoList={toDoList}
          setCompletedToDoList={setCompletedToDoList}
          completedtoDoList={completedtoDoList}
        ></ToDoList>
      </div>
    </DragDropContext>
  );
};

export default App;
