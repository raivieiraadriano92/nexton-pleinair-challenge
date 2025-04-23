import { FlashList } from "@shopify/flash-list";
import { Alert, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { TaskModal, TaskModalElement } from "~/components/TaskModal";
import { useMemo, useRef, useState } from "react";
import { Task, useTaskStore } from "~/store/taskStore";
import { LIST_FILTER, ListFilter } from "~/components/ListFilter";
import { ListItem } from "~/components/ListItem";

export default function HomeScreen() {
  const refTaskModal = useRef<TaskModalElement>(null);

  const [selectedListFilter, setSelectedListFilter] = useState<LIST_FILTER>(
    LIST_FILTER.ALL
  );

  const { createTask, deleteTask, tasks, updateTask } = useTaskStore();

  const taskList = useMemo(
    () =>
      tasks.filter((task) => {
        switch (selectedListFilter) {
          case LIST_FILTER.DONE:
            return task.completed;
          case LIST_FILTER.TODO:
            return !task.completed;
          default:
            return true;
        }
      }),
    [selectedListFilter, tasks]
  );

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
        data={taskList}
        ListEmptyComponent={
          <View>
            <Text className="text-center">No data!</Text>
          </View>
        }
        ListHeaderComponent={
          <ListFilter
            className="p-6"
            onPress={(value) => setSelectedListFilter(value)}
            selectedFilter={selectedListFilter}
          />
        }
        renderItem={({ item }) => (
          <ListItem
            onPress={() => refTaskModal.current?.open(item)}
            onDelete={() => handleDelete(item.id)}
            onToggle={(value) => updateTask({ ...item, completed: value })}
            task={item}
          />
        )}
        estimatedItemSize={64}
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
