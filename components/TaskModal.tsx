import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Task } from "~/store/taskStore";

export type TaskModalElement = { open(task?: Task): void; close(): void };

type TaskModalProps = { onSave(task: Partial<Task>): void };

export const TaskModal = forwardRef<TaskModalElement, TaskModalProps>(
  ({ onSave }, ref) => {
    const refTextValue = useRef<string>();

    const [isOpen, setIsOpen] = useState(false);

    const [selectedTask, setSelectedTask] = useState<Task>();

    const open: TaskModalElement["open"] = (task) => {
      setIsOpen(true);

      setSelectedTask(task);
    };

    const close = () => {
      setIsOpen(false);

      setSelectedTask(undefined);
      refTextValue.current = undefined;
    };

    const handleOnSave = () => {
      let payload = {
        title: refTextValue.current,
      };

      if (selectedTask?.id) {
        payload = {
          ...selectedTask,
          title: refTextValue.current,
        };
      }

      onSave(payload);
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          open,
          close,
        };
      },
      []
    );

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedTask?.id ? "Edit" : "New"} Task</DialogTitle>
            <Input
              autoFocus
              className="min-w-full"
              defaultValue={selectedTask?.title}
              onChangeText={(value) => (refTextValue.current = value)}
              placeholder="Write some stuff..."
            />
          </DialogHeader>
          <DialogFooter className="flex-row">
            <Button
              className="flex-1"
              onPress={close}
              size="lg"
              variant="outline"
            >
              <Text>Cancel</Text>
            </Button>
            <Button className="flex-1" onPress={handleOnSave} size="lg">
              <Text>Save</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);
