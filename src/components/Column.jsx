import TaskCard from './TaskCard'
import AddTaskForm from './AddTaskForm'

export default function Column({ status, label, next, tasks, onAdd, onMove, onRemove }) {
  return (
    <section className={`column column--${status}`}>
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
            onRemove={onRemove}
          />
        ))}
        {tasks.length === 0 && <p className="column__empty">Nothing here yet.</p>}
      </div>

      {onAdd && <AddTaskForm onAdd={onAdd} />}
    </section>
  )
}
