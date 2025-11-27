import React, { useState, useEffect } from "react";
import "./TodoApp.css";


import { FiSun, FiMoon, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export default function TodoApp() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const [dark, setDark] = useState(false);

    // Load saved todos & theme from localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("todos"));
        if (saved) setTodos(saved);

        const theme = localStorage.getItem("theme");
        if (theme === "dark") setDark(true);
    }, []);

    // Save todos to localStorage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Save theme to localStorage
    useEffect(() => {
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    const addTodo = () => {
        if (!task.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: task,
            completed: false,
            animate: "fade-in",
        };

        setTodos([...todos, newTodo]);
        setTask("");

        // Remove animation class after animation ends
        setTimeout(() => {
            setTodos((prev) =>
                prev.map((t) => ({ ...t, animate: "" }))
            );
        }, 300);
    };

    const deleteTodo = (id) => {
        // Add fade-out animation before deleting
        setTodos(
            todos.map((t) =>
                t.id === id ? { ...t, animate: "fade-out" } : t
            )
        );

        setTimeout(() => {
            setTodos((prev) => prev.filter((t) => t.id !== id));
        }, 300);
    };

    const toggleCompleted = (id) => {
        setTodos(
            todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const editTodo = (id) => {
        const newText = prompt("Edit your task:");
        if (newText?.trim()) {
            setTodos(
                todos.map((t) =>
                    t.id === id ? { ...t, text: newText } : t
                )
            );
        }
    };

    return (
        <div className={dark ? "wrapper dark-mode" : "wrapper"}>
            <div className="container">

                {/* Theme Toggle */}
                <div className="theme-toggle" onClick={() => setDark(!dark)}>
                    {dark ? <FiSun size={22} /> : <FiMoon size={22} />}
                </div>

                <h1 className="title">TaskFlow</h1>
                <p className="subtitle">Organize. Focus. Complete.</p>

                {/* Input Row */}
                <div className="input-row">
                    <input
                        className="input"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter your task..."
                    />
                    <button className="add-btn" onClick={addTodo}>
                        <FiPlus size={20} />
                    </button>
                </div>

                {/* Pending Tasks */}
                <h2 className="section-title">Pending</h2>
                <div className="list">
                    {todos.filter((t) => !t.completed).length === 0 && (
                        <p className="empty-text">✨ You're all caught up!</p>
                    )}

                    {todos
                        .filter((t) => !t.completed)
                        .map((t) => (
                            <div key={t.id} className={`todo-item ${t.animate}`}>
                                <input
                                    type="checkbox"
                                    onChange={() => toggleCompleted(t.id)}
                                />
                                <span className="todo-text">{t.text}</span>

                                <div className="btn-group">
                                    <button className="edit-btn" onClick={() => editTodo(t.id)}>
                                        <FiEdit2 />
                                    </button>
                                    <button className="delete-btn" onClick={() => deleteTodo(t.id)}>
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Completed Tasks */}
                <h2 className="section-title">Completed</h2>
                <div className="list">
                    {todos.filter((t) => t.completed).length === 0 && (
                        <p className="empty-text">No completed tasks yet</p>
                    )}

                    {todos
                        .filter((t) => t.completed)
                        .map((t) => (
                            <div
                                key={t.id}
                                className={`todo-item completed-card ${t.animate}`}
                            >
                                <input
                                    type="checkbox"
                                    checked
                                    onChange={() => toggleCompleted(t.id)}
                                />
                                <span className="todo-text completed-text">{t.text}</span>
                                <button className="delete-btn" onClick={() => deleteTodo(t.id)}>
                                    <FiTrash2 />
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
