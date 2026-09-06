import { useState } from 'react'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import Column from './Column'
import TaskCard from './TaskCard'

const COLUMNS = [
  { status: 'todo', label: 'To do', next: 'doing' },
  { status: 'doing', label: 'In progress', next: 'done' },
  { status: 'done', label: 'Done', next: null },
]

export default function Board({
  tasks,
  otherBoards,
  onAdd,
  onMove,
  onMoveToBoard,
  onRemove,
  onEdit,
}) {
  const [activeTask, setActiveTask] = useState(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  function handleDragStart(event) {
    const task = tasks.find((t) => t.id === event.active.id)
    setActiveTask(task ?? null)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    setActiveTask(null)
    if (!over) return
    const newStatus = over.id
    const task = tasks.find((t) => t.id === active.id)
    if (task && task.status !== newStatus) onMove(active.id, newStatus)
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="board">
        {COLUMNS.map((col) => (
          <Column
            key={col.status}
            status={col.status}
            label={col.label}
            next={col.next}
            tasks={tasks.filter((t) => t.status === col.status)}
            onAdd={col.status === 'todo' ? onAdd : null}
            onMove={onMove}
            otherBoards={otherBoards}
            onMoveToBoard={onMoveToBoard}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask && (
          <TaskCard task={activeTask} next={null} onMove={() => {}} onRemove={() => {}} onEdit={() => {}} dragging />
        )}
      </DragOverlay>
    </DndContext>
  )
}