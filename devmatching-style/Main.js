export default function Main({ $target, initialState, onAdd, onDelete, onCheck, onToggleAll, onEdit }) {
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
            <input id="toggle-all" class="toggle-all" type="checkbox" ${this.state.toggleAll ? 'checked' : ''}>
            <label for="toggle-all">
                Mark all as complete
            </label>
            <ul class="todo-list">
                ${this.state.todolist.filter((todo) => {
                    return this.state.filter === 'Active'
                            ?  todo.completed === false 
                            : this.state.filter === 'Completed'
                            ? todo.completed === true 
                            : todo
                }).map((todo, i) => {
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
        if(e.key === 'Enter' && document.activeElement.classList.contains('edit')) {
            for(const $editInput of document.querySelectorAll('input.edit')) {
                const prevContent = $editInput.previousElementSibling.querySelector('label').textContent
                const nextContent = $editInput.value
                onEdit(prevContent, nextContent)
            }
        }
    })
    this.$element.addEventListener('dblclick', (e) => {
        const $label = e.target.closest("label")
        if($label) {
            const $li = e.target.closest("li")
            $li.classList.add('editing')

            const $div = e.target.closest("div")
            const $editInput = document.createElement('input')
            $editInput.className = 'edit'
            $editInput.value = $label.textContent
            $div.insertAdjacentElement('afterend', $editInput)
            $editInput.focus()
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
        const $input = e.target.closest("input")
        if($input && $input.className === 'toggle-all') {
            onToggleAll()
        }
    })
}