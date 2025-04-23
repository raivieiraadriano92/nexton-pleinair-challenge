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
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Input } from "./ui/input";

export type TaskModalElement = { open(): void; close(): void };

type TaskModalProps = { onSave(task: string): void };

export const TaskModal = forwardRef<TaskModalElement, TaskModalProps>(
  (props, ref) => {
    const refTextValue = useRef<string>();

    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);

    const close = () => setIsOpen(false);

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
            <DialogTitle>New Task</DialogTitle>
            <Input
              className="min-w-full"
              placeholder="Write some stuff..."
              onChangeText={(value) => (refTextValue.current = value)}
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
            <Button className="flex-1" size="lg">
              <Text>Save</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);
