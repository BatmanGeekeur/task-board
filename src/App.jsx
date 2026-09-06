import { useEffect, useState } from 'react'
import Board from './components/Board'
import './App.css'

const STORAGE_KEY = 'task-board:tasks'

const STARTER_TASKS = [
  { id: crypto.randomUUID(), title: 'Sketch the board layout', status: 'done' },
  { id: crypto.randomUUID(), title: 'Wire up useState for tasks', status: 'doing' },
  { id: crypto.randomUUID(), title: 'Add drag and drop', status: 'todo' },
  { id: crypto.randomUUID(), title: 'Deploy to Vercel', status: 'todo' },
]

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : STARTER_TASKS
  } catch {
    return STARTER_TASKS
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(title) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, status: 'todo' },
    ])
  }

  function moveTask(id, status) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    )
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Board</h1>
        <p className="app-subtitle">A small kanban, built while learning React.</p>
      </header>
      <Board tasks={tasks} onAdd={addTask} onMove={moveTask} onRemove={removeTask} />
    </div>
  )
}
