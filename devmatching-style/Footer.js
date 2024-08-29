export default function Footer({ $target, initialState, onClear }) {
    this.$element = document.createElement("footer")
    this.$element.className = "footer"
    this.state = initialState
    $target.appendChild(this.$element)

    this.setState = (nextState) => {
        this.state = nextState
        this.render();
    }

    this.getTodoCount = todolist => {
        const notCompleted = todolist
            .filter(todo => !todo.completed)
        const { length } = notCompleted
        if (length === 1) {
            return '1 Item left'
        }

        return `${length} Items left`
    }


    this.render = () => {
        this.$element.innerHTML = `
            <span class="todo-count">
                ${this.getTodoCount(this.state.todolist)}
            </span>
            <ul class="filters">
                <li>
                    <a href="#/">All</a>
                </li>
                <li>
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
            <button class="clear-completed">
                Clear completed
            </button>
        `
    }
    this.render()

    this.$element.addEventListener('click', (e) => {
        const $button = e.target.closest('button')
        if($button && $button.className === 'clear-completed') {
            onClear()
        }
        const $a = e.target.closest('a')
        if($a) {
            if( $a.className === 'selected' ) {
                $a.classList.remove("selected")
            }else{
                $a.closest('ul').querySelectorAll('a').forEach(a => a.classList.remove('selected'))
                $a.classList.add("selected")
            }
        }
    })
}