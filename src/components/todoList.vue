<template>
  <!-- to do list diplay component -->
  <div class="w-100 mt-3">
    <div class="card border-0">
      <draggable
        tag="ul"
        item-key="id"
        ghost-class="ghost"
        :list="displayItems"
        class="list-group border-0 todo-list"
      >
        <template #item="{ element }">
          <li
            class="list-group-item d-flex justify-content-between align-items-center todo-item py-3"
          >
            <div
              :class="element.complete ? 'py-2 completed' : 'py-2 incomplete'"
            >
              <input
                class="form-check-input mt-0"
                type="Checkbox"
                :checked="element.complete"
                @change.prevent="markDone(element.id)"
              />
              <label class="form-check-label mx-3">{{ element.name }}</label>
            </div>
            <button
              type="button"
              class="button"
              aria-label="Close"
              @click.prevent="deleteItem(element.id)"
            ></button>
          </li>
        </template>
      </draggable>
      <div class="card-footer bg-white pt-3">
        <div class="lighter w-100 d-flex justify-content-between">
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
          <div class="footer-menu d-flex">
            <button
              type="button"
              :class="
                filterValue === 2
                  ? 'active button mx-2 p-0'
                  : 'button mx-2 p-0 '
              "
              @click.prevent="sortItems(2)"
            >
              All
            </button>
            <button
              type="button"
              :class="
                filterValue === 0
                  ? 'active button mx-2 p-0'
                  : 'button mx-2 p-0 '
              "
              @click.prevent="sortItems(0)"
            >
              Active
            </button>
            <button
              type="button"
              :class="
                filterValue === 1
                  ? 'active button mx-2 p-0'
                  : 'button mx-2 p-0 '
              "
              @click.prevent="sortItems(1)"
            >
              Completed
            </button>
          </div>
          <div>
            <button
              type="button"
              class="lighter button m-0 p-0"
              @click.prevent="deleteCompleted"
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- card footer menu visible only on small screens -->
  <div class="w-100">
    <div class="card my-3 py-2 border-0 mobile-footer">
      <div class="mobile-footer-menu d-flex justify-content-center">
        <button
          type="button"
          :class="
            filterValue === 2 ? 'active button mx-2 p-0' : 'button mx-2 p-0'
          "
          @click.prevent="sortItems(2)"
        >
          All
        </button>
        <button
          type="button"
          :class="
            filterValue === 0 ? 'active button mx-2 p-0' : 'button mx-2 p-0'
          "
          @click.prevent="sortItems(0)"
        >
          Active
        </button>
        <button
          type="button"
          :class="
            filterValue === 1 ? 'active button mx-2 p-0' : 'button mx-2 p-0'
          "
          @click.prevent="sortItems(1)"
        >
          Completed
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props: ["todoItems"],
  data() {
    return {
      filterValue: 2,
      items: [],
      displayItems: [],
    };
  },
  mounted() {
    // once app has been mounted, to set value of item and displayItems from props
    this.items = this.todoItems;
    this.displayItems = this.todoItems;
  },
  watch: {
    /* 
    - check for changes in todoItems passed in props to update ui
    - makes ui reactive when a new item is added
    */
    todoItems: function (newval) {
      this.items = newval;
    },
    /*
    - checks changes in items to update ui
    - these changes are triggered by events like delete or mark as done
    */
    items: function (newval) {
      this.displayItems = newval.filter((item) => {
        if (this.filterValue === 0) {
          return item.complete === false;
        } else if (this.filterValue === 1) {
          return item.complete === true;
        } else {
          return item;
        }
      });
    },

    // Enables filter through complete and active elements
    filterValue: function (newval) {
      this.displayItems = this.items.filter((item) => {
        if (newval === 0) {
          return item.complete === false;
        } else if (newval === 1) {
          return item.complete === true;
        } else {
          return item;
        }
      });
    },
  },
  methods: {
    deleteItem(id) {
      try {
        // fetch existing list
        const itemList = JSON.parse(localStorage.getItem("todo"));
        // filter out deleted item by id and create new list
        const newList = itemList.filter((item) => {
          return item.id != id;
        });
        // update list in local storage and items value in component
        localStorage.setItem("todo", JSON.stringify(newList));
        this.items = newList;
      } catch (error) {
        return;
      }
    },
    deleteCompleted() {
      try {
        // fetch existing list from local storage
        const itemList = JSON.parse(localStorage.getItem("todo"));
        // filter out completed items
        const newList = itemList.filter((item) => {
          return !item.complete;
        });
        // update list in local storage and items value in component
        localStorage.setItem("todo", JSON.stringify(newList));
        this.items = newList;
      } catch (error) {
        return;
      }
    },
    markDone(id) {
      try {
        // fetch existing list from local storage
        const itemList = JSON.parse(localStorage.getItem("todo"));
        // loop through items, adding them to new array with task at the id marked complete
        const newList = itemList.map((item) => {
          if (item.id === id) {
            return { ...item, complete: !item.complete };
          }
          return { ...item };
        });
        // updateS list iN local storage and items value in component
        localStorage.setItem("todo", JSON.stringify(newList));
        this.items = newList;
      } catch (error) {
        return;
      }
    },
    /* 
    - updates items to display filter
    - val 2 passed displays all items
    - val 1 passed displays completed items
    - val 0 passed displays active items
    */
    sortItems(val) {
      this.filterValue = val;
    },
  },
  components: {
    draggable,
  },
};
</script>
