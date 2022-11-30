<template>
  <!-- new task component -->
  <div class="w-100">
    <div class="new-task input-group mb-2 mt-4">
      <div class="input-group-text p-3 bg-white">
        <input
          class="form-check-input mt-0 mx-2"
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
        @keydown.enter="addTodo"
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
    // callled when user presses enter key
    addTodo() {
      try {
        // check if there is valid input
        if (this.item != "") {
          // check for exisiting items in local storage
          let currentList = JSON.parse(localStorage.getItem("todo")) || [];
          // our new item to the existing array list
          currentList.push({
            id: Math.ceil((Math.random() + Math.random()) * 1000000), // generate item id
            name: this.item,
            complete: false,
          });
          // update list in local storage
          localStorage.setItem("todo", JSON.stringify(currentList));
          this.item = ""; // reset input value
        }
        // update items displayed on app ui
        this.$emit("getItems");
      } catch (error) {
        return;
      }
    },
  },
};
</script>
