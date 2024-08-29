export default function Main({ $target, initialState, onAdd, onDelete, onCheck }) {
    this.$element = document.createElement("section")
    this.$element.className = "main"
    this.state = initialState
    $target.appendChild(this.$element)

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }

        this.render()
    }

    this.render = () => {
        this.$element.innerHTML = `
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">
                Mark all as complete
            </label>
            <ul class="todo-list">
                ${this.state.todolist.map((todo, i) => {
                    return `
                        <li data-id=${i} class="${todo.completed ? 'completed': ''}">
                            <div class="view">
                                <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
                                <label>${todo.text}</label>
                                <button class="destroy"></button>
                            </div>
                        </li>
                    `
                }).join('')}
            </ul>
        `
    }

    this.render()

    window.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') {
            onAdd({
                text: document.querySelector('.new-todo').value,
                completed: false
            })
            document.querySelector('.new-todo').value = ''
        }
    })

    this.$element.addEventListener('click', (e) => {
        const $button = e.target.closest("button")
        if($button && $button.className === 'destroy') {
            onDelete($button.previousElementSibling.textContent)
        }
        const $checkbox = e.target.closest("input[type=checkbox]")
        if($checkbox && $checkbox.className === 'toggle') {
            onCheck($checkbox.nextElementSibling.textContent)
        }
    })
}