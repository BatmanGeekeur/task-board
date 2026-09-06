import { useEffect, useState } from 'react'
import Board from './components/Board'
import BoardsNav from './components/BoardsNav'
import DeleteBoardModal from './components/DeleteBoardModal'
import { createBoard, loadBoards, saveBoards } from './utils/boardStorage'
import './App.css'
import './BoardManagement.css'

export default function App() {
  const [boards, setBoards] = useState(loadBoards)
  const [visibleBoardIds, setVisibleBoardIds] = useState(null)
  const [boardToDelete, setBoardToDelete] = useState(null)

  useEffect(() => {
    saveBoards(boards)
  }, [boards])

  const selectedBoardIds = visibleBoardIds ?? (boards[0] ? [boards[0].id] : [])
  const visibleBoards = boards.filter((board) => selectedBoardIds.includes(board.id))

  function updateBoard(boardId, updateTasks) {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? { ...board, tasks: updateTasks(board.tasks) }
          : board
      )
    )
  }

  function addBoard() {
    const board = createBoard(`Tableau ${boards.length + 1}`)
    setBoards((prev) => [...prev, board])
    setVisibleBoardIds((prev) => [...(prev ?? [boards[0]?.id].filter(Boolean)), board.id])
  }

  function addTask(boardId, title) {
    updateBoard(boardId, (tasks) => [
      ...tasks,
      { id: crypto.randomUUID(), title, status: 'todo' },
    ])
  }

  function moveTask(boardId, id, status) {
    updateBoard(boardId, (tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    )
  }

  function removeTask(boardId, id) {
    updateBoard(boardId, (tasks) => tasks.filter((task) => task.id !== id))
  }

  function editTask(boardId, id, title) {
    updateBoard(boardId, (tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, title } : task))
    )
  }

  function moveTaskToBoard(sourceBoardId, taskId, destinationBoardId) {
    if (sourceBoardId === destinationBoardId) return
    setBoards((prev) => {
      const sourceBoard = prev.find((board) => board.id === sourceBoardId)
      const task = sourceBoard?.tasks.find((item) => item.id === taskId)
      if (!task || !prev.some((board) => board.id === destinationBoardId)) return prev
      return prev.map((board) => {
        if (board.id === sourceBoardId) return { ...board, tasks: board.tasks.filter((item) => item.id !== taskId) }
        if (board.id === destinationBoardId) return { ...board, tasks: [...board.tasks, task] }
        return board
      })
    })
  }

  function requestDeleteBoard(board) {
    if (boards.length === 1) return
    if (board.tasks.length > 0) {
      setBoardToDelete(board)
      return
    }
    deleteBoard(board.id)
  }

  function deleteBoard(boardId, destinationBoardId = null) {
    const board = boards.find((item) => item.id === boardId)
    if (!board) return

    setBoards((prev) =>
      prev
        .filter((item) => item.id !== boardId)
        .map((item) =>
          item.id === destinationBoardId
            ? { ...item, tasks: [...item.tasks, ...board.tasks] }
            : item
        )
    )
    setBoardToDelete(null)

    setVisibleBoardIds((prev) => {
      const next = (prev ?? [boards[0]?.id].filter(Boolean)).filter((id) => id !== boardId)
      return next.length > 0 ? next : [boards.find((item) => item.id !== boardId)?.id].filter(Boolean)
    })
  }

  function toggleBoard(boardId) {
    setVisibleBoardIds((prev) => {
      const current = prev ?? [boards[0]?.id].filter(Boolean)
      if (current.includes(boardId)) {
        const next = current.filter((id) => id !== boardId)
        return next.length > 0 ? next : current
      }
      return [...current, boardId]
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Board</h1>
        <p className="app-subtitle">
          Un tableau de tâches léger et intuitif, développé avec React et Vite.
        </p>
      </header>

      <BoardsNav
        boards={boards}
        visibleBoardIds={selectedBoardIds}
        onToggle={toggleBoard}
        onShowAll={() => setVisibleBoardIds(boards.map((board) => board.id))}
        onAdd={addBoard}
        onDelete={requestDeleteBoard}
      />

      <div className="boards-view">
          {visibleBoards.map((board) => (
          <section className="board-panel" key={board.id}>
            <h2 className="board-panel__title">{board.name}</h2>
            <Board
              tasks={board.tasks}
              otherBoards={boards.filter((item) => item.id !== board.id)}
              onAdd={(title) => addTask(board.id, title)}
              onMove={(id, status) => moveTask(board.id, id, status)}
              onMoveToBoard={(taskId, destinationBoardId) =>
                moveTaskToBoard(board.id, taskId, destinationBoardId)
              }
              onRemove={(id) => removeTask(board.id, id)}
              onEdit={(id, title) => editTask(board.id, id, title)}
            />
          </section>
          ))}
      </div>

      <DeleteBoardModal
        board={boardToDelete}
        destinationBoards={boards.filter((board) => board.id !== boardToDelete?.id)}
        onDelete={deleteBoard}
        onCancel={() => setBoardToDelete(null)}
      />
    </div>
  )
}
