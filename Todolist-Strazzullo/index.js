import getTodos from './getTodos.js'
import todosView from './view/todos.js'
import countView from './view/count.js'
import filtersView from './view/filters.js'

import registry from './registry.js'
import applyDiff from './applyDiff.js'

registry.add('todos', todosView)
registry.add('counter', countView)
registry.add('filters', filtersView)

const state = {
    todos: getTodos(),
    currentFilter: 'All', // 'All', 'Active', 'Completed'
}

const render = () => {
    window.requestAnimationFrame(() => {
        const main = document.querySelector('.todoapp')
        const newMain = registry.renderRoot(main, state)
        applyDiff(document.body, main, newMain)
    })
}

window.setInterval(() => {
    state.todos = getTodos()
    render()
}, 5000)

render()