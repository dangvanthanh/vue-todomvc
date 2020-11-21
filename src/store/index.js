const STORAGE_KEY = 'todos-vue';

export default {
  fetch: () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  save: todos => localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}