<template>
  <div class="w-100">
    <div class="card">
      <ul class="list-group list-group-flush todo-list">
        <li
          class="list-group-item d-flex justify-content-between align-items-center todo-item"
          v-for="item in items"
          v-bind:key="item.id"
        >
          <div :class="item.complete ? 'py-2 completed' : 'py-2'">
            <input
              class="form-check-input mt-0"
              type="Checkbox"
              :checked="item.complete"
              @change.prevent="markDone(item.id)"
            />
            <label class="form-check-label mx-3">{{ item.name }}</label>
          </div>
          <button
            type="button"
            class="btn btn-close"
            aria-label="Close"
            @click.prevent="delItem(item.id)"
          ></button>
        </li>
      </ul>
      <div class="card-footer bg-white">
        <div class="w-100 d-flex justify-content-between">
          <p>
            {{
              items.filter((item) => {
                return !item.complete;
              }).length
            }}
            {{
              items.filter((item) => {
                return !item.complete;
              }).length > 1
                ? "items"
                : "item"
            }}
            left
          </p>
          <div>
            <button
              type="button"
              class="btn mx-2 p-0"
              @click.prevent="delComplete"
            >
              All
            </button>
            <button
              type="button"
              class="btn mx-2 p-0"
              @click.prevent="delComplete"
            >
              Active
            </button>
            <button
              type="button"
              class="btn mx-2 p-0"
              @click.prevent="delComplete"
            >
              Completed
            </button>
          </div>
          <div>
            <button
              type="button"
              class="btn m-0 p-0"
              @click.prevent="delComplete"
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todoItems"],
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.items = this.todoItems;
  },
  watch: {
    todoItems: function (newval) {
      this.items = newval;
    },
  },
  methods: {
    delItem(id) {
      try {
        const newList = this.items.filter((item) => {
          return item.id != id;
        });
        localStorage.setItem("todo", JSON.stringify(newList));
        this.items = newList;
      } catch (error) {
        console.log(error);
      }
    },
    delComplete() {
      try {
        const newList = this.items.filter((item) => {
          return !item.complete;
        });
        localStorage.setItem("todo", JSON.stringify(newList));
        this.items = newList;
      } catch (error) {
        console.log(error);
      }
    },
    markDone(id) {
      try {
        const newList = this.items.map((item) => {
          if (item.id === id) {
            return { ...item, complete: !item.complete };
          }
          return { ...item };
        });
        localStorage.setItem("todo", JSON.stringify(newList));
        this.items = newList;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
