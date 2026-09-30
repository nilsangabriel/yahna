import { FlatList, Text, View, Button, Touchable, TouchableOpacity } from "react-native";
import { useHistoryContext } from "@/context/history-context"
import Lucide from "@react-native-vector-icons/lucide";


export default function HistoryView() {
    const { history, deleteHistory, clearHistory } = useHistoryContext();

    if (history.length === 0)
        return (
        <View className="flex-1 items-center justify-center">
            <Text className="mt-2 text-sm text-white">
                No history yet. View a story to add one!
            </Text>
        </View>
    );

    return (
        <View className="mt-3 mb-2 mx-3">
            <View className="items-end">
                <Button
                    title="Clear history"
                    onPress={clearHistory}
                />
            </View>
            <FlatList
                data={history}
                keyExtractor={(item) => item.timestamp.toString()}
                renderItem={({item}) => (
                    <View className="mt-5 flex-row items-center justify-between">
                        <Text className="text-sm text-gray-200">{item.story.title}</Text>
                        <TouchableOpacity
                            onPress={() => deleteHistory(item.timestamp)}
                        >
                            <Text>
                                <Lucide name="trash" size={20} color="#e5e7eb" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}