# Task Board

Un tableau kanban fait pour apprendre React : plusieurs tableaux, chacun avec ses colonnes (À faire, En cours, Terminé). On peut ajouter des tâches, les faire avancer (clic ou glisser-déposer), modifier leur titre, les déplacer vers un autre tableau, ou les supprimer. Tout est sauvegardé dans le `localStorage`, donc un rafraîchissement de la page ne perd rien.

**[Démo en ligne →](https://task-board-pi-peach.vercel.app/)**

## Fonctionnalités

- Créer plusieurs tableaux et basculer entre eux via des onglets ("Afficher tous" pour tous les voir en même temps)
- Ajouter une tâche dans la colonne "À faire" d'un tableau
- Faire avancer une tâche vers la colonne suivante en un clic, ou la glisser-déposer directement dans une autre colonne
- Modifier le titre d'une tâche (double-clic sur le texte, ou le bouton ✎)
- Déplacer une tâche vers un autre tableau via un menu déroulant
- Supprimer une tâche
- Supprimer un tableau : si celui-ci contient encore des tâches, une fenêtre demande quoi en faire (les supprimer, ou les déplacer vers un autre tableau)
- L'état survit à un rechargement de page (sauvegardé dans `localStorage`)

## Stack technique

- [React](https://react.dev/) 19 (composants fonctionnels + hooks)
- [Vite](https://vitejs.dev/) comme outil de build
- [@dnd-kit/core](https://dndkit.com/) pour le glisser-déposer
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) pour le linting
- CSS simple, sans librairie UI

## Ce que j'ai appris en le construisant

- Gérer un state partagé avec `useState` et le faire remonter dans le parent (`App`) pour que les composants enfants puissent communiquer entre eux
- Faire descendre des données et des fonctions callback via les props (`App → Board → Column → TaskCard`)
- Modéliser plusieurs entités liées (des tableaux, chacun avec ses propres tâches) et faire évoluer le state en conséquence sans tout casser
- Afficher des listes en toute sécurité avec `.map()` et des `key` stables
- Les formulaires contrôlés (`AddTaskForm`)
- Synchroniser le state avec `localStorage` grâce à `useEffect`, avec une migration en douceur de l'ancien format de données (un seul tableau) vers le nouveau (plusieurs tableaux)
- Implémenter le glisser-déposer avec `@dnd-kit/core` (`useDraggable`, `useDroppable`, `DndContext`, `DragOverlay`)
- Gérer une fenêtre modale conditionnelle (`DeleteBoardModal`) pour les actions qui ont des conséquences (suppression)

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
│   ├── Board.jsx              # dispose les trois colonnes d'un tableau, gère le drag and drop
│   ├── BoardsNav.jsx           # onglets pour choisir/ajouter/supprimer un tableau
│   ├── Column.jsx              # une colonne (statut) + ses cartes
│   ├── TaskCard.jsx            # une tâche : édition, déplacement (colonne ou tableau), suppression
│   ├── AddTaskForm.jsx         # champ contrôlé pour ajouter une tâche
│   └── DeleteBoardModal.jsx    # confirmation avant de supprimer un tableau non vide
├── utils/
│   └── boardStorage.js         # lecture/écriture des tableaux dans localStorage
├── App.jsx                     # le state vit ici : tableaux, tableau(x) affiché(s)
├── App.css
├── BoardManagement.css         # styles des onglets et de la modale
├── index.css
└── main.jsx
```

## Idées pour la suite

- [x] Glisser-déposer entre les colonnes (`@dnd-kit/core`)
- [x] Éditer le titre d'une tâche directement
- [x] Plusieurs tableaux
- [ ] Synchroniser avec un backend au lieu de `localStorage`
- [ ] Réordonner les tâches à l'intérieur d'une même colonne