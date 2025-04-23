import { View, ViewProps } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

type ListFilter = ViewProps & {
  onPress(filter: LIST_FILTER): void;
  selectedFilter: LIST_FILTER;
};

export enum LIST_FILTER {
  ALL,
  TODO,
  DONE,
}

const filters = [
  {
    label: "All",
    value: LIST_FILTER.ALL,
  },
  {
    label: "To Do",
    value: LIST_FILTER.TODO,
  },
  {
    label: "Done",
    value: LIST_FILTER.DONE,
  },
];

export const ListFilter = ({
  className,
  onPress,
  selectedFilter,
  ...props
}: ListFilter) => {
  return (
    <View className={`flex-row ${className}`} {...props}>
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onPress={() => onPress(filter.value)}
          size="sm"
          variant={filter.value === selectedFilter ? "secondary" : "ghost"}
        >
          <Text>{filter.label}</Text>
        </Button>
      ))}
    </View>
  );
};
