import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { FloatingButton } from "./FloatingButton";

type ArgTypes = ComponentProps<typeof FloatingButton>;

export default {
  title: "Components/FloatingButton",
  component: FloatingButton,
} as Meta<ArgTypes>;

export const Default: StoryObj<ArgTypes> = {};
