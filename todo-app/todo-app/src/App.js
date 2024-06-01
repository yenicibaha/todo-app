import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputmessage, setInputmessage] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (inputmessage.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8000/todos', { message: inputmessage, completed: false });
        setTodos([...todos, response.data]);
        setInputmessage('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const completeTodo = async (id, index) => {
    try {
      const newTodos = [...todos];
      newTodos[index].completed = !newTodos[index].completed;
      setTodos(newTodos);
      await axios.put(`http://localhost:8000/todos/${id}`, { completed: newTodos[index].completed });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const removeTodo = async (id, index) => {
    try {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
      await axios.delete(`http://localhost:8000/todos/${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="app">
      <h1>TO-DO</h1>

      <div id="input_c">
        <input
          type="message"
          placeholder="Görev ekle"
          value={inputmessage}
          onChange={e => setInputmessage(e.target.value)}
        />
        <button id="ekle" onClick={addTodo}>
          Ekle
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <button className={todo.completed ? 'completed-tik' : ''} onClick={() => completeTodo(todo.id, index)}>
              ✓
            </button>
            {todo.message}
            <button onClick={() => removeTodo(todo.id, index)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
