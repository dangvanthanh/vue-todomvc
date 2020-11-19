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
    active: (todos) => todos.filter((todo) => !todo.completed),
    completed: (todos) => todos.filter((todo) => todo.completed),
  }

  const filtersList = [
    { value: 'all', text: 'All' },
    { value: 'active', text: 'Active' },
    { value: 'completed', text: 'Completed' },
  ]

  let newTodo = ref('')
  let editedTodo = reactive({ id: uuid(), title: '', completed: false })
  let todos = reactive([])
  let visibility = ref('all')
  let filteredTodos = computed(() => filters[visibility.value](todos))
  let remaining = computed(() => filters['active'](todos).length)

  const addTodo = () => {
    todos.push({
      id: uuid(),
      title: newTodo.value,
      completed: false,
    })

    newTodo.value = ''
  }

  const editTodo = (todo) => {
    editedTodo = todo
  }

  const removeTodo = (todoId) => {
    const todoIndex = todos.findIndex((t) => t.id === todoId)
    if (todoIndex < 0) return
    todos.splice(todoIndex, 1)
  }

  const selectedFilter = (filter) => {
    visibility.value = filter
  }

  const clearCompleted = () => {
    todos = filters['active'](todos)
  }

  return {
    newTodo,
    editedTodo,
    todos,
    visibility,
    filtersList,
    filteredTodos,
    remaining,
    addTodo,
    editTodo,
    removeTodo,
    selectedFilter,
    clearCompleted,
  }
}
