import { mount } from "@vue/test-utils";
import NewTask from "@/components/newTask.vue";


describe("NewTask.vue", () => {
    it("Add new todo item", async () => {
        const textinput = "my new task"
        const wrapper = mount(NewTask)
        const input = wrapper.find('.form-control') //  find the inout
        await input.setValue(textinput) // set the value of the input
        expect(input.element.value).toBe(textinput) // confirm change in inout value
        expect(wrapper.vm.item).toBe(textinput) // confirm input points to the correct data value
        await input.trigger('keydown.enter') // trigger submit on enter key press down
        expect(JSON.parse(localStorage.getItem("todo"))).toHaveLength(1) // confirm new entry on local storage
    })
})