<template>
  <div class="w-100">
    <div class="input-group mb-2 mt-4">
      <div class="input-group-text p-3 bg-white">
        <input
          class="form-check-input mt-0"
          type="radio"
          value=""
          disabled
          aria-label="Checkbox for following text input"
        />
      </div>
      <input
        type="text"
        class="form-control px-3"
        aria-label="Text input with checkbox"
        placeholder="Create a new todo..."
        v-model="item"
        @keyup.enter="addTodo"
      />
    </div>
  </div>
</template>

<script>
export default {
  emits: ["getItems"],
  data() {
    return {
      item: "",
    };
  },
  methods: {
    addTodo() {
      try {
        let currentList = JSON.parse(localStorage.getItem("todo")) || [];
        currentList.push({
          id: Math.ceil((Math.random() + Math.random()) * 1000000),
          name: this.item,
          complete: false,
        });
        localStorage.setItem("todo", JSON.stringify(currentList));
        this.item = "";
        this.$emit("getItems");
      } catch (error) {
        alert("Some Error");
      }
    },
  },
};
</script>
