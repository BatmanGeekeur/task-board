import { useEffect, useRef, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'

export default function TaskCard({
  task,
  next,
  otherBoards = [],
  onMove,
  onMoveToBoard,
  onRemove,
  onEdit,
  dragging,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(task.title)
  const inputRef = useRef(null)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    disabled: isEditing,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  function startEdit() {
    setDraftTitle(task.title)
    setIsEditing(true)
  }

  function commitEdit() {
    const trimmed = draftTitle.trim()
    if (trimmed && trimmed !== task.title) {
      onEdit(task.id, trimmed)
    }
    setIsEditing(false)
  }

  function cancelEdit() {
    setDraftTitle(task.title)
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      commitEdit()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancelEdit()
    }
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`task-card ${isDragging ? 'task-card--ghost' : ''} ${dragging ? 'task-card--dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          className="task-card__edit-input"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => e.stopPropagation()}
        />
      ) : (
        <p className="task-card__title" onDoubleClick={startEdit}>
          {task.title}
        </p>
      )}

      <div className="task-card__actions">
        {!isEditing && (
          <button
            type="button"
            className="task-card__edit"
            onClick={startEdit}
            aria-label={`Modifier "${task.title}"`}
          >
            ✎
          </button>
        )}
        {next && (
          <button type="button" onClick={() => onMove(task.id, next)}>
            Déplacer →
          </button>
        )}
        {otherBoards.length > 0 && (
          <select
            className="task-card__board-select"
            value=""
            onChange={(event) => {
              if (event.target.value) onMoveToBoard(task.id, event.target.value)
            }}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label={`Déplacer "${task.title}" vers un autre tableau`}
          >
            <option value="">Tableau…</option>
            {otherBoards.map((board) => (
              <option key={board.id} value={board.id}>{board.name}</option>
            ))}
          </select>
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