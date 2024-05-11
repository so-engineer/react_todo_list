import { useCallback, useState } from "react";

export const useTodoList = () => {
  const [todos, setTodos] = useState([]);

  const checkBox = (index) => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  const addTodo = (text) => {
    if (text === '') return;
    const todo = {
      text: text,
      completed: false,
      updated: false,
    }
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  }

  const addUpdateTodo = (updateText, index) => {
    if (updateText === '') return;
    const newTodos = [...todos]
    const updateTodo = {
      text: updateText,
      completed: false,
      updated: false,
    }
    newTodos[index] = updateTodo
    setTodos(newTodos);
  }

  const updateTodo = useCallback((index) => {
    const newTodos = [...todos]
    newTodos[index].updated = !newTodos[index].updated;
    setTodos(newTodos);
  }, [todos]);

  const deleteTodo = useCallback((index) => {
    alert('本当に削除してもよろしいですか？');
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }, [todos]);

  return {todos, checkBox, addTodo, addUpdateTodo, updateTodo, deleteTodo};
}