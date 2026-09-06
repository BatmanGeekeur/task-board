# Task Board

Un petit tableau kanban fait pour apprendre React : trois colonnes (À faire, En cours, Terminé), on peut ajouter des tâches, les faire avancer, les supprimer. Les tâches sont sauvegardées dans le `localStorage`, donc un rafraîchissement de la page ne vide pas le tableau.

**[Démo en ligne →](https://task-board-pi-peach.vercel.app/)**

## Fonctionnalités

- Ajouter une tâche dans la colonne "À faire"
- Faire avancer une tâche vers la colonne suivante en un clic, ou la glisser-déposer directement dans une autre colonne
- Supprimer n'importe quelle tâche
- L'état survit à un rechargement de page (sauvegardé dans `localStorage`)

## Stack technique

- [React](https://react.dev/) 19 (composants fonctionnels + hooks)
- [Vite](https://vitejs.dev/) comme outil de build
- [@dnd-kit/core](https://dndkit.com/) pour le glisser-déposer
- CSS simple, sans librairie UI

## Ce que j'ai appris en le construisant

- Gérer un state partagé avec `useState` et le faire remonter dans le parent (`App`) pour que les colonnes puissent communiquer entre elles
- Faire descendre des données et des fonctions callback via les props (`Board → Column → TaskCard`)
- Afficher des listes en toute sécurité avec `.map()` et des `key` stables
- Les formulaires contrôlés (`AddTaskForm`)
- Synchroniser le state avec `localStorage` grâce à `useEffect`
- Implémenter le glisser-déposer avec `@dnd-kit/core` (`useDraggable`, `useDroppable`, `DndContext`, `DragOverlay`)

## Lancer le projet en local

```bash
git clone https://github.com/BatmanGeekeur/task-board
cd task-board
npm install
npm run dev
```

Ouvre ensuite l'URL locale affichée par Vite (généralement `http://localhost:5173`).

## Structure du projet

```
src/
├── components/
│   ├── Board.jsx        # dispose les trois colonnes
│   ├── Column.jsx        # une colonne (statut) + ses cartes
│   ├── TaskCard.jsx       # une tâche avec ses actions (déplacer/supprimer)
│   └── AddTaskForm.jsx    # champ contrôlé pour ajouter une tâche
├── App.jsx                # le state vit ici : tâches, ajout/déplacement/suppression
├── App.css
├── index.css
└── main.jsx
```

## Idées pour la suite

- [x] Glisser-déposer entre les colonnes (`@dnd-kit/core`)
- [x] Éditer le titre d'une tâche directement
- [ ] Plusieurs tableaux
- [ ] Synchroniser avec un backend au lieu de `localStorage`