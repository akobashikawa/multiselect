# Multiselect

Idea de interfaz para búsqueda de opciones.

Base: [akobashikawa/template-tdd-vue-cdn: Base para usar TDD con Vue de CDN (sin builder)](https://github.com/akobashikawa/template-tdd-vue-cdn)

## Idea

Implement a multiselector with 3 levels (A, B, C) where selection propagates bidirectionally as "auto-selection".

- Selected items are checked.
- Auto-selected items are bold.
- Rules:
    - Select A -> Auto-select B (children) -> Auto-select C (children of those B items).
    - Select B -> Auto-select C (children).
    - Select B -> Auto-select A (parents).
    - Select C -> Auto-select B (parents) -> Auto-select A (parents of those B items).