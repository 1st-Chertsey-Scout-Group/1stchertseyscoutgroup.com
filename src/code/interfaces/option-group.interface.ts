import type { Option } from "./option.interface";

export interface OptionGroup {
    type: "group";
    label: string;
    options: Option[]
}