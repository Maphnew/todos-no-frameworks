import { State, Todo } from "./types"

type MainContext = { 
    $target: HTMLElement
    initialState: State
    onDelete: (text: string) => void
    onCheck: (text: string) => void
    onToggleAll: () => void
    onEdit: (prevText: string, nextText: string) => void
}

export default class Main {
    private state: State
    private $element: HTMLElement
    constructor({ $target, initialState, onDelete, onCheck, onToggleAll, onEdit }: MainContext) {
        this.$element = document.createElement('section')
        this.$element.className = 'main'
        this.state = initialState
        $target.appendChild(this.$element)

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if(document.activeElement instanceof HTMLElement) {
                if(e.key === 'Enter' && document.activeElement.classList.contains('edit')) {
                    for(const $editInput of document.querySelectorAll('input.edit')) {
                        const prevContent = $editInput.previousElementSibling?.querySelector('label')?.textContent as string
                        const nextContent = ($editInput as HTMLInputElement).value as string
                        onEdit(prevContent, nextContent)
                    }
                }
            }
        })
        this.$element.addEventListener('dblclick', (e: MouseEvent) => {
            if(e.target instanceof HTMLElement) {
                const $label = e.target.closest("label")
                if($label) {
                    const $li = e.target.closest("li")
                    $li?.classList.add('editing')
        
                    const $div = e.target.closest("div")
                    const $editInput = document.createElement('input')
                    $editInput.className = 'edit'
                    $editInput.value = $label.textContent as string
                    $div?.insertAdjacentElement('afterend', $editInput)
                    $editInput.focus()
                }
            }
        })
        this.$element.addEventListener('click', (e: MouseEvent) => {
            if(e.target instanceof HTMLElement) {
                const $button = e.target.closest("button")
                if($button && $button.className === 'destroy') {
                    onDelete($button.previousElementSibling?.textContent as string)
                }
                const $checkbox = e.target.closest("input[type=checkbox]")
                if($checkbox && $checkbox.className === 'toggle') {
                    onCheck($checkbox.nextElementSibling?.textContent as string)
                }
                const $input = e.target.closest("input")
                if($input && $input.className === 'toggle-all') {
                    onToggleAll()
                }
            }
        })

        this.render()
    };

    setState(nextState: State) {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    };
    
    render() {
        this.$element.innerHTML = `
            <input id="toggle-all" class="toggle-all" type="checkbox" ${this.state.toggleAll ? 'checked' : ''}>
            <label for="toggle-all">
                Mark all as complete
            </label>
            <ul class="todo-list">
                ${this.state.todoList.filter((todo: Todo) => {
                    return this.state.filter === 'Active'
                            ?  todo.completed === false 
                            : this.state.filter === 'Completed'
                            ? todo.completed === true 
                            : todo
                }).map((todo: Todo, i: number) => {
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
    };
};