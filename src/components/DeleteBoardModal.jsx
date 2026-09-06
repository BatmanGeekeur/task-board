export default function DeleteBoardModal({ board, destinationBoards, onDelete, onCancel }) {
  if (!board) return null

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="delete-board-title">
        <h2 id="delete-board-title">Supprimer « {board.name} » ?</h2>
        <p>Ce tableau contient {board.tasks.length} tâche(s). Que veux-tu en faire ?</p>
        <div className="modal__actions">
          <button type="button" onClick={() => onDelete(board.id)}>
            Supprimer le tableau et ses tâches
          </button>
          {destinationBoards.map((destinationBoard) => (
            <button
              key={destinationBoard.id}
              type="button"
              onClick={() => onDelete(board.id, destinationBoard.id)}
            >
              Déplacer vers « {destinationBoard.name} »
            </button>
          ))}
          <button type="button" className="modal__cancel" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </section>
    </div>
  )
}
