import dynamicIconImports from "lucide-react/dynamicIconImports";

export enum TodoType {
  New = 1,
  Important = 2,
}

interface TodoTypeProps {
  value: number;
  label: string;
  icon: keyof typeof dynamicIconImports;
}

export const todoTypeList: TodoTypeProps[] = [
  { value: TodoType.New, label: "New", icon: "sun" },
  { value: TodoType.Important, label: "Important", icon: "star" },
];
