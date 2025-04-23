import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

interface TaskActions {
  createTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleCompletedTask: (id: number) => Promise<void>;
}

type TaskStore = TaskState & TaskActions;

const initialTaskState: TaskState = {
  tasks: [],
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      ...initialTaskState,

      createTask: async (newTask) => {
        set((state) => ({
          tasks: [...state.tasks, newTask].sort((a, b) =>
            a.title.localeCompare(b.title)
          ),
        }));
      },

      updateTask: async (updatedTask) => {
        set((state) => {
          return {
            tasks: state.tasks
              .map((task) => (task.id === updatedTask.id ? updatedTask : task))
              .sort((a, b) => a.title.localeCompare(b.title)),
          };
        });
      },

      deleteTask: async (id) => {
        set((state) => {
          return {
            tasks: state.tasks.filter((task) => task.id !== id),
          };
        });
      },

      toggleCompletedTask: async (id) => {
        set((state) => {
          return {
            tasks: state.tasks
              .map((task) => ({
                ...task,
                completed: task.id === id ? !task.completed : task.completed,
              }))
              .sort((a, b) => a.title.localeCompare(b.title)),
          };
        });
      },
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ tasks }) => ({
        tasks,
      }),
    }
  )
);
