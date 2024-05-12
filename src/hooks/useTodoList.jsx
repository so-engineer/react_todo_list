import { useCallback, useState } from "react";

export const useTodoList = () => {
  const [text, setText] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [todos, setTodos] = useState([]);

  const onChangeText = (e) => {
    setText(e.target.value);
  }

  const onChangeUpdateText = (e) => {
    setUpdateText(e.target.value);
  }

  const onChangeCheckBox = useCallback((index) => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }, [todos]);

  const onClickAdd = useCallback(() => {
    if (text === '') return;
    const todo = {
      text: text,
      completed: false,
      updated: false,
    }
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    setText('');
  }, [text, todos]);

  const onClickUpdateAdd = useCallback((index) => {
    if (updateText === '') return;
    const newTodos = [...todos]
    const updateTodo = {
      text: updateText,
      completed: false,
      updated: false,
    }
    newTodos[index] = updateTodo
    setTodos(newTodos);
    setUpdateText('');
  }, [updateText, todos]);

  const onClickUpdate = useCallback((index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return {...todo, updated: true};
      } else {
        return {...todo, updated: false};
    }});
    setTodos(newTodos);
  }, [todos]);

  const onClickDelete = useCallback((index) => {
    alert('本当に削除してもよろしいですか？');
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }, [todos]);

  return {text, updateText, todos, onChangeText, onChangeUpdateText, onChangeCheckBox, onClickAdd, onClickUpdateAdd, onClickUpdate, onClickDelete};
}