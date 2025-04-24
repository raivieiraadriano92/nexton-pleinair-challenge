import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ListFilter, LIST_FILTER } from "~/components/ListFilter";

describe("ListFilter", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it("renders all filter buttons", () => {
    render(
      <ListFilter onPress={mockOnPress} selectedFilter={LIST_FILTER.ALL} />
    );

    expect(screen.getByText("All")).toBeTruthy();
    expect(screen.getByText("To Do")).toBeTruthy();
    expect(screen.getByText("Done")).toBeTruthy();
  });

  it("renders three buttons, one for each filter option", () => {
    render(
      <ListFilter onPress={mockOnPress} selectedFilter={LIST_FILTER.ALL} />
    );

    // Verify 3 buttons are rendered
    const buttons = screen.getAllByText(/(All|To Do|Done)/);
    expect(buttons.length).toBe(3);
  });

  it("calls onPress with correct filter value when each button is pressed", () => {
    render(
      <ListFilter onPress={mockOnPress} selectedFilter={LIST_FILTER.ALL} />
    );

    // Press ALL button
    fireEvent.press(screen.getByText("All"));
    expect(mockOnPress).toHaveBeenCalledWith(LIST_FILTER.ALL);
    mockOnPress.mockClear();

    // Press TODO button
    fireEvent.press(screen.getByText("To Do"));
    expect(mockOnPress).toHaveBeenCalledWith(LIST_FILTER.TODO);
    mockOnPress.mockClear();

    // Press DONE button
    fireEvent.press(screen.getByText("Done"));
    expect(mockOnPress).toHaveBeenCalledWith(LIST_FILTER.DONE);
  });

  it("applies custom className to the container view", () => {
    render(
      <ListFilter
        onPress={mockOnPress}
        selectedFilter={LIST_FILTER.ALL}
        className="mt-4 px-2"
        testID="filter-container"
      />
    );

    const container = screen.getByTestId("filter-container");
    expect(container.props.className).toBe("flex-row mt-4 px-2");
  });

  it("passes additional props to the container view", () => {
    const testID = "custom-filter-container";
    const accessibilityLabel = "Filter options";

    render(
      <ListFilter
        onPress={mockOnPress}
        selectedFilter={LIST_FILTER.ALL}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      />
    );

    const container = screen.getByTestId(testID);
    expect(container).toBeTruthy();
    expect(container.props.accessibilityLabel).toBe(accessibilityLabel);
  });
});
