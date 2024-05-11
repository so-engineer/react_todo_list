import { useCallback, useState } from 'react';
import './App.css';
import { useTodoList } from '../hooks/useTodoList';

export const App = () => {
  const [text, setText] = useState('');
  const [updateText, setUpdateText] = useState('');
  const {todos, checkBox, addTodo, addUpdateTodo, updateTodo, deleteTodo} = useTodoList();

  const completedTodos = todos.filter((todo) => todo.completed);

  const onChangeText = (e) => {
    setText(e.target.value);
  }

  const onChangeUpdateText = (e) => {
    setUpdateText(e.target.value);
  }

  const onChangeCheckBox = (index) => {
    checkBox(index);
  }

  const onClickAdd = () => {
    addTodo(text);
    setText('');
  };

  const onClickUpdateAdd = (index) => {
    addUpdateTodo(updateText, index);
    setUpdateText('');
  }

  const onClickUpdate = useCallback((index) => {
    updateTodo(index)
  }, [updateTodo]);

  const onClickDelete = useCallback((index) => {
    deleteTodo(index);
  }, [deleteTodo]);

  return (
    <>
      <h1>ToDo List</h1>
      <div>
        <input onChange= {onChangeText} type="text" value={text} placeholder="Add ToDo" />
        <button onClick={onClickAdd}>保存</button>
        <div>
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