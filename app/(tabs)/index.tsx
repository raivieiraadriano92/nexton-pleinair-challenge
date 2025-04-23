import { FlashList } from "@shopify/flash-list";
import { Alert, TouchableOpacity, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { TaskModal, TaskModalElement } from "~/components/TaskModal";
import { useRef } from "react";
import { Task, useTaskStore } from "~/store/taskStore";
import { TrashIcon } from "~/lib/icons/Trash";
import { Checkbox } from "~/components/ui/checkbox";

export default function HomeScreen() {
  const refTaskModal = useRef<TaskModalElement>(null);

  const { createTask, deleteTask, tasks, updateTask } = useTaskStore();

  const handleOnSave = (payload: Partial<Task>) => {
    if (payload.id) {
      updateTask(payload);
    } else {
      createTask(payload.title!);
    }

    refTaskModal.current?.close();
  };

  const handleDelete = (id: number) => {
    Alert.alert("Delete task", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTask(id),
      },
    ]);
  };

  return (
    <>
      <FlashList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="h-16 border-b-border border-b-hairline px-6 items-center flex-row"
            onPress={() => refTaskModal.current?.open(item)}
          >
            <Checkbox
              checked={item.completed}
              onCheckedChange={(value) =>
                updateTask({ ...item, completed: value })
              }
            />
            <View className="flex-1 px-6">
              <Text>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <TrashIcon className="text-destructive h-8 w-8" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        estimatedItemSize={200}
      />
      <View className="p-6 border-t-border border-t-hairline">
        <Button onPress={() => refTaskModal.current?.open()} size="lg">
          <Text>New Task</Text>
        </Button>
      </View>
      <TaskModal onSave={handleOnSave} ref={refTaskModal} />
    </>
  );
}
