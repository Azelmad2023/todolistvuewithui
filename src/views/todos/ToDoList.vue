<template>
  <el-main>
        <el-scrollbar>
          <div class="container p-6 mx-auto">
            <!-- New Task Input -->
            <div class="flex items-center mb-4">
                <el-input
                  v-model="newTaskTitle"
                  class="flex-grow mr-4 rounded"
                  placeholder="Please input"
                  clearable />
                <el-button @click="todoStore.addTask" type="primary" 
                  >Add Task</el-button>
            </div>
            <!-- Filter Tasks -->
            <div class="mb-3">
              <el-select
                v-model="value"
                placeholder="Select"
                size="large"
                class="w-1/6">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <!-- Task List -->
            <div
              v-for="task in filteredTasks"
              :key="task.id"
              @click="toggleTask(task.id)"
              class="task-item"
            >
              <div
                class=" flex items-center p-4 mb-2 bg-white rounded shadow"
                :class="{ 'opacity-50': task.completed }"
              >
                <!-- <input type="checkbox" class="mr-3" :checked="task.completed" /> -->
                <el-checkbox v-model="task.completed" size="large" @click="toggleTask(task.id)" ></el-checkbox>
                <span :class="{ 'line-through': task.completed }" class="ml-3">{{
                  task.title
                }}</span>
                <div class="ml-auto">
                  <el-button @click.stop="openEditDialog(task)" type="primary" :icon="Edit" circle />
                  <el-button @click.stop="openDeleteDialog(task.id)"  type="danger" :icon="Delete" circle />
                  <el-button type="success" circle>
                    <el-icon><Tickets /></el-icon>
                  </el-button>
                  <!-- <el-button @click.stop="deleteTask(task.id)"  type="danger" :icon="Delete" circle /> -->
                </div>
              </div>
            </div>
            <!-- The Pop Up For Edeting a A Task -->
            <el-dialog v-model="dialogFormVisible" title="Edit Task" width="500">
                  <el-form :model="form">
                    <el-form-item label="New Task Title" :label-width="formLabelWidth">
                      <el-input v-model="form.name" autocomplete="off" />
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <div class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">Cancel</el-button>
                      <el-button type="primary" @click="confirmEdit">
                        Confirm
                      </el-button>
                    </div>
                  </template>
            </el-dialog>
            <!-- The Pop Up For Deleting a A Task -->
            <el-dialog
                v-model="centerDialogVisible"
                title="Warning"
                width="500"
                align-center
              >
                <span>Are you sure you want to delete this task?</span>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button type="success" @click="centerDialogVisible = false">Cancel</el-button>
                    <el-button type="danger" @click="confirmDelete">
                      Confirm
                    </el-button>
                  </div>
                </template>
            </el-dialog>
          </div>
        </el-scrollbar>
  </el-main>
</template>

<script setup>
import { computed, onMounted, reactive, ref, toRef } from "vue";
import {Edit ,Delete} from '@element-plus/icons-vue'
import { useTodoStore } from "@/stores/todoStore";

const todoStore = useTodoStore();
const tasks = toRef(todoStore, "tasks");
const newTaskTitle = toRef(todoStore, "newTaskTitle");
const dialogFormVisible = ref(false)
const centerDialogVisible = ref(false)
const editTaskId = ref(null);
const deleteTaskId = ref(null);
const value = ref('All')
const formLabelWidth = '140px'

const form = reactive({
  name: '',
})

const options = [
  {
    value: 'All',
    label: 'All Tasks',
  },
  {
    value: 'Completed',
    label: 'Completed Tasks',
  },
  {
    value: 'NotCompleted',
    label: 'Not Comleted Tasks',
  }
]

const openEditDialog = (task) => {
  editTaskId.value = task.id;
  form.name = task.title;
  dialogFormVisible.value = true;
};

const confirmEdit = () => {
  if (editTaskId.value !== null) {
    todoStore.editTask(editTaskId.value, form.name);
    dialogFormVisible.value = false;
    form.name = '';
    editTaskId.value = null;
  }
};

const toggleTask = (id) => {
  todoStore.toggleComplete(id);
};

const openDeleteDialog = (taskId) => {
  deleteTaskId.value = taskId;
  centerDialogVisible.value = true;
};

const confirmDelete = () => {
  if (deleteTaskId.value !== null) {
    todoStore.deleteTask(deleteTaskId.value);
    centerDialogVisible.value = false;
    deleteTaskId.value = null;
  }
};

const filteredTasks = computed(() => {
  if (value.value === 'All') {
    return tasks.value;
  } else if (value.value === 'Completed') {
    return tasks.value.filter(task => task.completed);
  } else if (value.value === 'NotCompleted') {
    return tasks.value.filter(task => !task.completed);
  }
  return tasks.value;
});

onMounted(() => {
  todoStore.fetchTasks();
});

</script>

<style>
.line-through {
  text-decoration: line-through;
}
.layout-container-demo .el-main {
  padding: 0;
}
</style>