import Column from './Column'

const COLUMNS = [
  { status: 'todo', label: 'To do', next: 'doing' },
  { status: 'doing', label: 'In progress', next: 'done' },
  { status: 'done', label: 'Done', next: null },
]

export default function Board({ tasks, onAdd, onMove, onRemove }) {
  return (
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
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}
