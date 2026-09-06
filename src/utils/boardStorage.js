const STORAGE_KEY = 'task-board:boards'
const LEGACY_STORAGE_KEY = 'task-board:tasks'

const STARTER_TASKS = [
  { id: crypto.randomUUID(), title: 'Sketch the board layout', status: 'done' },
  { id: crypto.randomUUID(), title: 'Wire up useState for tasks', status: 'doing' },
  { id: crypto.randomUUID(), title: 'Add drag and drop', status: 'todo' },
  { id: crypto.randomUUID(), title: 'Deploy to Vercel', status: 'todo' },
]

export function createBoard(name, tasks = []) {
  return { id: crypto.randomUUID(), name, tasks }
}

export function loadBoards() {
  try {
    const rawBoards = localStorage.getItem(STORAGE_KEY)
    if (rawBoards) {
      const boards = JSON.parse(rawBoards)
      if (Array.isArray(boards) && boards.length > 0) {
        const validBoards = boards.filter(
          (board) =>
            board &&
            typeof board.id === 'string' &&
            typeof board.name === 'string' &&
            Array.isArray(board.tasks)
        )
        if (validBoards.length > 0) return validBoards
      }
    }

    const rawTasks = localStorage.getItem(LEGACY_STORAGE_KEY)
    const tasks = rawTasks ? JSON.parse(rawTasks) : STARTER_TASKS
    return [createBoard('Mon tableau', tasks)]
  } catch {
    return [createBoard('Mon tableau', STARTER_TASKS)]
  }
}

export function saveBoards(boards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
}
