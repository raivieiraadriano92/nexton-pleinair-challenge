import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

interface TaskActions {
  createTask: (title: string) => Promise<void>;
  updateTask: (task: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

type TaskStore = TaskState & TaskActions;

const initialTaskState: TaskState = {
  tasks: [],
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      ...initialTaskState,

      createTask: async (title) => {
        const newTask: Task = {
          id: Math.random(),
          title,
          completed: false,
        };

        set((state) => ({
          tasks: [...state.tasks, newTask].sort((a, b) =>
            a.title.localeCompare(b.title)
          ),
        }));
      },

      updateTask: async (task) => {
        set((state) => {
          return {
            tasks: state.tasks
              .map((t) => (t.id === task.id ? { ...t, ...task } : t))
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
