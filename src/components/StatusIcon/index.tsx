import { CircleDashed, CircleCheck } from "lucide-react-native";
import { FilterStatus } from "@/types/FilterStatus";

export const StatusIcon = ({ status }: { status: FilterStatus }) => {
  return status === FilterStatus.DONE ? (
    <CircleCheck size={18} color="#2c46b1" />
  ) : (
    <CircleDashed size={18} color="#000" />
  );
};
