import { InjectionKey } from "vue";
import { TodosStore } from "@/composables/use-todos-store";

const TodosStoreKey: InjectionKey<TodosStore> = Symbol("TodosStore");
export default TodosStoreKey;
