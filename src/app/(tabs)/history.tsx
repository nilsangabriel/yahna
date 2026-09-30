import HistoryView from "@/components/layout/history-view";
import {Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
    return (
        <View className="flex-1 bg-gray-800">
            <View className="flex-1 h-screen w-screen overflow-y-scroll">
                <SafeAreaView>
                    <View className="flex-row items-center justify-center px-4 mt-2">
                        <Text className="text-2xl font-semibold text-white">Your History</Text>
                    </View>
                </SafeAreaView>
                <View className="flex">
                    <HistoryView />
                </View>
            </View>
        </View>
    )
}