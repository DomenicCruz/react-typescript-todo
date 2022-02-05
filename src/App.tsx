import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import ToDoList from "./components/ToDoList";
import TodoItem from "./models/todo";

const App: React.FC = () => {
  const [toDo, setToDo] = useState<string>("");
  const [toDoList, setToDoList] = useState<TodoItem[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (toDo) {
      setToDoList([...toDoList, { id: Date.now(), text: toDo, isDone: false }]);
      setToDo("");
    }
  };

  return (
    <div className="App">
      <span className="heading">DowIt!</span>
      <InputField toDo={toDo} setToDo={setToDo} handleAdd={handleAdd} />
      <ToDoList setToDoList={setToDoList} toDoList={toDoList}></ToDoList>
    </div>
  );
};

export default App;
