import { ref, reactive, computed } from 'vue'

export const useTodo = () => {
  const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const filters = {
    all: (todos) => todos,
    active: (todos) => todos.filters((todo) => !todo.completed),
    completed: (todos) => todos.filter((todo) => todo.completed),
  }

  const filtersList = [
    { value: 'all', text: 'All' },
    { value: 'active', text: 'Active' },
    { value: 'completed', text: 'Completed' },
  ]

  let newTodo = reactive('')
  let editedTodo = reactive('')
  let todos = reactive([])
  let visibility = reactive('all')
  let filteredTodos = computed(() => filters[visibility](todos))

  const addTodo = () => {
    todos.push({
      id: uuid(),
      title: newTodo,
      completed: false,
    })

    newTodo = ''
  }

  const editTodo = (todo) => {
    state.editTodo = todo
  }

  const removeTodo = (todo) => {
    const index = todos.indexOf(todo)
    todos.splice(index, 1)
  }

  const selectedFilter = (filter) => {
    visibility = filter
  }

  return {
    newTodo,
    editedTodo,
    visibility,
    filtersList,
    filteredTodos,
    addTodo,
    editTodo,
    removeTodo,
    selectedFilter,
  }
}
