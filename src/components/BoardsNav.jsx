export default function BoardsNav({
  boards,
  visibleBoardIds,
  onToggle,
  onShowAll,
  onAdd,
  onDelete,
}) {
  return (
    <nav className="boards-nav" aria-label="Tableaux">
      <div className="boards-nav__tabs">
        {boards.map((board) => (
          <div className="board-tab" key={board.id}>
            <button
              type="button"
              className={visibleBoardIds.includes(board.id) ? 'board-tab__button board-tab__button--active' : 'board-tab__button'}
              onClick={() => onToggle(board.id)}
            >
              {board.name}
            </button>
            <button
              type="button"
              className="board-tab__remove"
              onClick={() => onDelete(board)}
              disabled={boards.length === 1}
              aria-label={`Supprimer ${board.name}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="boards-nav__show-all" onClick={onShowAll}>
        Afficher tous
      </button>
      <button type="button" className="boards-nav__add" onClick={onAdd}>
        + Nouveau tableau
      </button>
    </nav>
  )
}
