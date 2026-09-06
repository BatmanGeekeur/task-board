import { useDroppable } from '@dnd-kit/core'
import TaskCard from './TaskCard'
import AddTaskForm from './AddTaskForm'

export default function Column({
  status,
  label,
  next,
  tasks,
  otherBoards,
  onAdd,
  onMove,
  onMoveToBoard,
  onRemove,
  onEdit,
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <section
      ref={setNodeRef}
      className={`column column--${status} ${isOver ? 'column--over' : ''}`}
    >
      <header className="column__header">
        <h2>{label}</h2>
        <span className="column__count">{String(tasks.length).padStart(2, '0')}</span>
      </header>

      <div className="column__list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            next={next}
            onMove={onMove}
            otherBoards={otherBoards}
            onMoveToBoard={onMoveToBoard}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))}
        {tasks.length === 0 && <p className="column__empty">Rien ici pour l'instant.</p>}
      </div>

      {onAdd && <AddTaskForm onAdd={onAdd} />}
    </section>
  )
}