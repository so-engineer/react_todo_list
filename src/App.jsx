import { useState } from 'react';
import './App.css';

export const App = () => {
  const [text, setText] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [todos, setTodos] = useState([]);

  const completedTodos = todos.filter((todo) => todo.completed);

  const onChangeText = (e) => {
    setText(e.target.value);
  }

  const onChangeUpdateText = (e) => {
    setUpdateText(e.target.value);
  }

  const onChangeCheckBox = (index) => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  const onClickAdd = () => {
    if (text === '') return;
    const todo = {
      text: text,
      completed: false,
      updated: false,
    }
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    setText('');
  }

  const onClickUpdateAdd = (index) => {
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
  }

  const onClickUpdate = (index) => {
    const newTodos = [...todos]
    newTodos[index].updated = !newTodos[index].updated;
    setTodos(newTodos);
  }

  const onClickDelete = (index) => {
    // alert('本当に削除してもよろしいですか？');
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <>
      <h1>ToDo List</h1>
      <div>
        <input onChange= {onChangeText} type="text" value={text} placeholder="Add ToDo" />
        <button onClick={onClickAdd}>保存</button>
        <div className>
          <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.updated ? (
                <>
                  <input onChange= {onChangeUpdateText} type="text" value={updateText} placeholder="Update ToDo" />
                  <button onClick={() => onClickUpdateAdd(index)}>保存</button>
                </>
              ) : (
                <>
                  <input onChange={() => onChangeCheckBox(index)} type="checkbox" checked={todo.completed} />
                  <span>{todo.text}</span>
                  <button onClick={() => onClickUpdate(index)}>編集</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </>
              )}
            </li>
          ))}
          </ul>
        </div>
        <footer>
          <span>全てのタスク: {todos.length}</span>
          <span>完了済み: {completedTodos.length}</span>
          <span>未完了: {todos.length - completedTodos.length}</span>
        </footer>
      </div>
    </>
  )
}