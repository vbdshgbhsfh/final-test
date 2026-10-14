import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Do coding challenges', active: true },
    { id: 2, text: 'Do coding challenges', active: true },
    { id: 3, text: 'Do coding challenges', active: false },
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [inputText, setInputText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (activeTab === 'Completed') {
      alert('Chức năng thêm Task chỉ sử dụng được trong Tab ALL và Active!');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputText,
      active: true,
    };

    setTasks([...tasks, newTask]);
    setInputText('');
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, active: !task.active } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDeleteAllCompleted = () => {
    setTasks(tasks.filter((task) => task.active));
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') return task.active;
    if (activeTab === 'Completed') return !task.active;
    return true;
  });

  return (
    <div className="todo-container">
      <h1 className="todo-title">#todo</h1>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All
        </button>
        <button
          className={`tab-btn ${activeTab === 'Active' ? 'active' : ''}`}
          onClick={() => setActiveTab('Active')}
        >
          Active
        </button>
        <button
          className={`tab-btn ${activeTab === 'Completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('Completed')}
        >
          Completed
        </button>
      </div>
      <hr className="divider" />

      {activeTab !== 'Completed' && (
        <form className="add-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="add details"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="task-input"
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      )}

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <label className="task-label">
              <input
                type="checkbox"
                checked={!task.active}
                onChange={() => handleToggleTask(task.id)}
              />
              <span className={!task.active ? 'completed-text' : ''}>
                {task.text}
              </span>
            </label>

            {activeTab === 'Completed' && (
              <button
                className="delete-icon-btn"
                onClick={() => handleDeleteTask(task.id)}
                title="Xóa task"
              >
                [x]
              </button>
            )}
          </li>
        ))}
      </ul>

      {activeTab === 'Completed' && tasks.some((task) => !task.active) && (
        <div className="delete-all-container">
          <button className="delete-all-btn" onClick={handleDeleteAllCompleted}>
            Delete all
          </button>
        </div>
      )}
    </div>
  );
}

export default App;