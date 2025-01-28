import getTodos from './getTodos.js'
import todosView from './view/todos.js'
import countView from './view/count.js'
import filtersView from './view/filters.js'

import registry from './registry.js'

registry.add('todos', todosView)
registry.add('counter', countView)
registry.add('filters', filtersView)

const state = {
    todos: getTodos(),
    currentFilter: 'All', // 'All', 'Active', 'Completed'
}

window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp')
    const newMain = registry.renderRoot(main, state)
    main.replaceWith(newMain)
})