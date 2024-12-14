export default function Header({ $target, onAdd }) {
    this.$element = document.createElement('header')
    this.$element.className = 'header'

    $target.appendChild(this.$element)

    this.render = () => {
        this.$element.innerHTML = `
            <h1>todos</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus>
        `
    }

    this.render()

    window.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') {
            if(document.activeElement.classList.contains('new-todo')) {
                if(document.querySelector('.new-todo').value === '') {
                    return
                }
                onAdd({
                    text: document.querySelector('.new-todo').value,
                    completed: false
                })
                document.querySelector('.new-todo').value = ''
            }
        }
    })
}