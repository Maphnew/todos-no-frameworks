const TEMPLATE = '<ul class="todo-list"></ul>'

export const EVENTS = {
  DELETE_ITEM: 'DELETE_ITEM'
}

export default class List extends HTMLElement {
  static get observedAttributes () {
    return [
      'todos'
    ]
  }

  get todos () {
    if (!this.hasAttribute('todos')) {
      return []
    }

    return JSON.parse(this.getAttribute('todos'))
  }

  set todos (value) {
    this.setAttribute('todos', JSON.stringify(value))
  }

  onDeleteClick (index) {
    const event = new CustomEvent(
      EVENTS.DELETE_ITEM,
      {
        detail: {
          index
        }
      }
    )

    this.dispatchEvent(event)
  }

  createNewTodoNode () {
    return this.itemTemplate
      .content
      .firstElementChild
      .cloneNode(true)
  }

  getTodoElement (todo, index) {
    const {
      text,
      completed
    } = todo

    const element = this.createNewTodoNode()

    element.querySelector('input.edit').value = text
    element.querySelector('label').textContent = text

    if (completed) {
      element.classList.add('completed')
      element
        .querySelector('input.toggle')
        .checked = true
    }

    element
      .querySelector('button.destroy')
      .dataset
      .index = index

    return element
  }

  updateList () {
    this.list.innerHTML = ''

    this.todos
      .map((todo, index) => this.getTodoElement(todo, index))
      .forEach(element => {
        this.list.appendChild(element)
      })
  }

  connectedCallback () {
    this.innerHTML = TEMPLATE
    this.itemTemplate = document
      .getElementById('todo-item')

    this.list = this.querySelector('ul')

    this.list.addEventListener('click', e => {
      if (e.target.matches('button.destroy')) {
        this.onDeleteClick(e.target.dataset.index)
      }
    })

    this.updateList()
  }

  attributeChangedCallback () {
    this.updateList()
  }
}
