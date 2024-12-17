export default class Footer {
    constructor({ $target, initialState, onClear, onFilter }) {
        this.$element = document.createElement("footer");
        this.$element.className = "footer";
        this.state = initialState;
        $target.appendChild(this.$element);
        this.$element.addEventListener('click', ((e) => {
            if (e.target instanceof HTMLElement) {
                const $button = e.target.closest('button');
                if ($button && $button.className === 'clear-completed') {
                    onClear();
                }
                const $a = e.target.closest('a');
                if ($a.className === 'selected') {
                    $a.classList.remove("selected");
                }
                else {
                    $a.closest('ul').querySelectorAll('a').forEach(a => a.classList.remove('selected'));
                    $a.classList.add("selected");
                }
                if (['All', 'Active', 'Completed'].includes($a.textContent)) {
                    onFilter($a.textContent);
                }
            }
        }));
        this.render();
    }
    setState(nextState) {
        this.state = nextState;
        this.render();
    }
    getTodoCount(todoList) {
        const notCompleted = todoList.filter((todo) => !todo.completed);
        const { length } = notCompleted;
        if (length === 1) {
            return '1 Item left';
        }
        return `${length} Items left`;
    }
    render() {
        this.$element.innerHTML = `
            <span class="todo-count">
                ${this.getTodoCount(this.state)}
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
        `;
    }
}
