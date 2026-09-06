export default function TaskCard({ task, next, onMove, onRemove }) {
  return (
    <article className="task-card">
      <p className="task-card__title">{task.title}</p>
      <div className="task-card__actions">
        {next && (
          <button type="button" onClick={() => onMove(task.id, next)}>
            Move →
          </button>
        )}
        <button
          type="button"
          className="task-card__remove"
          onClick={() => onRemove(task.id)}
          aria-label={`Delete "${task.title}"`}
        >
          ✕
        </button>
      </div>
    </article>
  )
}
