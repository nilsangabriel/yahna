import type {ImageSourcePropType} from "react-native";

declare global {
    interface AppTab {
        name: string;
        title: string;
        icon: string;
    }

    interface TabIconProps {
        focused: boolean;
        icon: any;
    }
}
