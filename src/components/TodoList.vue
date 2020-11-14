<template>
  <ul class="todo-list">
    <li
      class="todo"
      v-for="todo in todos"
      :key="todo.id"
      :class="{ completed: todo.completed }"
    >
      <div class="view">
        <input type="checkbox" class="toggle" v-model="todo.completed" />
        <label @dblclick="editTodo(t)">{{ todo.title }}</label>
        <button class="destroy" @click="removeTodo(t)"></button>
      </div>
      <input type="text" class="edit" v-model="todo.title" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
}
</script>