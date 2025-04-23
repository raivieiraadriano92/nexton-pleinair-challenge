import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { TaskModal, TaskModalElement } from "~/components/TaskModal";
import { useRef } from "react";

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

export default function HomeScreen() {
  const refTaskModal = useRef<TaskModalElement>(null);

  return (
    <>
      <FlashList
        data={DATA}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        estimatedItemSize={200}
      />
      <View className="p-6 border-t-border border-t-hairline">
        <Button onPress={() => refTaskModal.current?.open()} size="lg">
          <Text>New Task</Text>
        </Button>
      </View>
      <TaskModal onSave={() => {}} ref={refTaskModal} />
    </>
  );
}
