<template>
  <div class="container">
    <div
      class="main d-flex flex-column align-items-center justify-content-center"
    >
      <Header />
      <NewTask @getItems="getItems" />
      <TodoList :todoItems="todoItems" />
      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/topBar.vue";
import NewTask from "@/components/newTask.vue";
import TodoList from "@/components/todoList.vue";
import Footer from "@/components/bottomFooter.vue";
export default {
  name: "HomeView",
  data() {
    return {
      todoItems: [],
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      this.todoItems = JSON.parse(localStorage.getItem("todo")) || [];
    },
  },
  components: {
    Header,
    NewTask,
    TodoList,
    Footer,
  },
};
</script>
