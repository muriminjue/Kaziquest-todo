import { shallowMount } from "@vue/test-utils";
import TodoList from "@/components/todoList.vue";

const todos = [{
    id: 1,
    name: "complete online javascript course",
    complete: true
}, {
    id: 2,
    name: "Jpg around the park 3x",
    complete: false
}, {
    id: 3,
    name: "10 minutes meditation",
    complete: false
}, {
    id: 4,
    name: "Read for 1 hour",
    complete: false
}, {
    id: 5,
    name: "Pick up groceries",
    complete: false
}]


describe("TodoList.vue", () => {
    it("props are passed to commponent", () => {
        const wrapper = shallowMount(TodoList, {
            props: { todoItems: todos },
        });
        expect(wrapper.vm.displayItems).toHaveLength(todos.length); // items to be displayed lisst is updated from props
        expect(wrapper.vm.items).toHaveLength(todos.length);
    });
}); 
