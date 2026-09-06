import { useDraggable } from '@dnd-kit/core'

export default function TaskCard({ task, next, onMove, onRemove, dragging }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`task-card ${isDragging ? 'task-card--ghost' : ''} ${dragging ? 'task-card--dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      <p className="task-card__title">{task.title}</p>
      <div className="task-card__actions">
        {next && (
          <button type="button" onClick={() => onMove(task.id, next)}>
            Déplacer →
          </button>
        )}
        <button
          type="button"
          className="task-card__remove"
          onClick={() => onRemove(task.id)}
          aria-label={`Supprimer "${task.title}"`}
        >
          ✕
        </button>
      </div>
    </article>
  )
}