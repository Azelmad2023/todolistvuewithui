<script setup>
import { computed, onMounted } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import { reactive } from "vue";
import { ref } from "vue";

const dialogFormVisible = ref(false);
const centerDialogVisibleForDelete = ref(false);
const centerDialogVisibleForDetails = ref(false);
const taskDetails = ref(null);
const editTaskId = ref(null);
const deleteTaskId = ref(null);
const progressValue = ref("All");
const priorityValue = ref("all");
const formLabelWidth = "140px";

const todoStore = useTodoStore();

const formAdd = reactive({
  taskTitle: "",
});

const formEdit = reactive({
  taskTitle: "",
});

const priorityOptions = [
  {
    value: "high",
    label: "High",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
];

const filterPriorityOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
];

const filterProgressOptions = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Completed Tasks",
    label: "Completed Tasks",
  },
  {
    value: "Not Completed Tasks",
    label: "Not Completed Tasks",
  },
];

const addTask = () => {
  if (!formAdd.taskTitle === "") {
    todoStore.addTask(formAdd);
  }
};

// toggeling the comletion of a task with an a checkbox input
const toggleComletedTask = (task) => {
  todoStore.editTask(task.id, { completed: !task.completed });
};

const openEditDialog = (task) => {
  editTaskId.value = task.id;
  formEdit.taskTitle = task.title;
  dialogFormVisible.value = true;
};

const confirmEdit = async () => {
  if (editTaskId.value !== null) {
    await todoStore.editTask(editTaskId.value, { title: formEdit.taskTitle });
    dialogFormVisible.value = false;
    formEdit.taskTitle = "";
    editTaskId.value = null;
  }
};

const openDeleteDialog = (taskId) => {
  deleteTaskId.value = taskId;
  centerDialogVisibleForDelete.value = true;
};

const confirmDelete = async () => {
  if (deleteTaskId.value !== null) {
    await todoStore.deleteTask(deleteTaskId.value);
    centerDialogVisibleForDelete.value = false;
    deleteTaskId.value = null;
  }
};

const openDetailsDialog = (task) => {
  centerDialogVisibleForDetails.value = true;
  taskDetails.value = task;
};

const handlePeriorityChange = (taskId, value) => {
  todoStore.editTask(taskId, { priority: value });
};

// filter progress of Tasks
const filteredProgressTasks = computed(() => {
  if (progressValue.value === "All") {
    return filteredPriorityTasks.value;
  } else if (progressValue.value === "Completed Tasks") {
    return filteredPriorityTasks.value.filter((task) => task.completed);
  } else if (progressValue.value === "Not Completed Tasks") {
    return filteredPriorityTasks.value.filter((task) => !task.completed);
  }
});

// filter priority of Tasks
const filteredPriorityTasks = computed(() => {
  if (priorityValue.value === "all") {
    return todoStore.tasks;
  } else {
    return todoStore.tasks.filter(
      (task) => task.priority === priorityValue.value
    );
  }
});

onMounted(async () => {
  await todoStore.fetchTasks();
});
</script>
<template>
  <el-main>
    <el-scrollbar>
      <div class="container p-6 mx-auto">
        <!-- New Task Input -->
        <el-form :model="formAdd" class="flex items-center space-x-4">
          <el-form-item class="flex-grow">
            <el-input
              placeholder="New Task"
              clearable
              v-model="formAdd.taskTitle"
              class="w-full"
            />
          </el-form-item>
          <el-form-item class="shrink-0">
            <el-button type="primary" @click="addTask">Add</el-button>
          </el-form-item>
        </el-form>
        <div class="mb-2">
          <!-- for progress  -->
          <el-select
            v-model="progressValue"
            placeholder="Select Progress"
            size="large"
            class="mr-2"
            style="width: 240px"
          >
            <el-option
              v-for="item in filterProgressOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- for priority -->
          <el-select
            v-model="priorityValue"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in filterPriorityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <!-- Task List -->
        <div v-for="task in filteredProgressTasks" :key="task.id">
          <div
            class="flex items-center p-4 mb-2 bg-white border-2 rounded"
            :class="{
              'border-red-500': task.priority === 'high',
              'border-yellow-500': task.priority === 'medium',
              'border-green-500': task.priority === 'low',
            }"
          >
            <el-checkbox
              @click="toggleComletedTask(task)"
              v-model="task.completed"
              size="large"
            ></el-checkbox>
            <span class="ml-3" :class="task.completed && 'line-through'">{{
              task.title
            }}</span>
            <div class="flex ml-auto">
              <el-select
                v-model="task.priority"
                class="w-32 mr-4"
                size="small"
                @change="(value) => handlePeriorityChange(task.id, value)"
              >
                <el-option
                  v-for="priority in priorityOptions"
                  :key="priority.value"
                  :label="priority.label"
                  :value="priority.value"
                />
              </el-select>
              <el-button @click="openEditDialog(task)" type="primary" circle>
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button
                @click="openDeleteDialog(task.id)"
                type="danger"
                circle
              >
                <el-icon><Delete /></el-icon>
              </el-button>
              <el-button @click="openDetailsDialog(task)" type="success" circle>
                <el-icon><Tickets /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
        <!-- The Pop Up For Edeting a A Task -->
        <el-dialog v-model="dialogFormVisible" title="Edit Task" width="500">
          <el-form :model="formEdit" @submit.prevent="confirmEdit">
            <el-form-item label="New Task Title" :label-width="formLabelWidth">
              <el-input v-model="formEdit.taskTitle" autocomplete="off" />
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
          v-model="centerDialogVisibleForDelete"
          title="Warning"
          width="500"
          align-center
        >
          <span>Are you sure you want to delete this task?</span>
          <template #footer>
            <div class="dialog-footer">
              <el-button
                type="success"
                @click="centerDialogVisibleForDelete = false"
                >Cancel</el-button
              >
              <el-button type="danger" @click="confirmDelete">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
        <!-- this pop up for details of a task -->
        <el-dialog
          v-model="centerDialogVisibleForDetails"
          title="Warning"
          width="500"
          align-center
        >
          <span>{{ taskDetails.title }}</span>
          <div>{{ taskDetails.priority }}</div>
          <div>{{ taskDetails.completed }}</div>
          <template #footer>
            <div class="dialog-footer">
              <el-button
                type="primary"
                @click="centerDialogVisibleForDetails = false"
              >
                Done
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<style>
.layout-container-demo .el-main {
  padding: 0;
}
</style>
