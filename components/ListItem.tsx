import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Task } from "~/store/taskStore";
import { TrashIcon } from "~/lib/icons/Trash";
import { Checkbox } from "~/components/ui/checkbox";

type ListItemProps = TouchableOpacityProps & {
  onDelete(): void;
  onToggle(value: boolean): void;
  task: Task;
};

export const ListItem = ({
  className,
  onDelete,
  onToggle,
  task,
  ...props
}: ListItemProps) => {
  return (
    <TouchableOpacity
      className={`h-16 border-b-border border-b-hairline px-6 items-center flex-row ${className}`}
      {...props}
    >
      <Checkbox checked={task.completed} onCheckedChange={onToggle} />
      <View className="flex-1 px-6">
        <Text className={task.completed ? "line-through" : ""}>
          {task.title}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onDelete()}>
        <TrashIcon className="text-destructive h-8 w-8" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
