import { StoryType } from "@/constants/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HistoryProviderProps = {
    children: ReactNode;
}

type HistoryEntry = {
    timestamp: number;
    story: StoryType;
}

type HistoryContextType = {
    history: HistoryEntry[]
    recordView: (story: StoryType) => void;
    deleteHistory: (timestamp: number) => void;
    clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | null >(null);

export default function HistoryContextProvider({children}: HistoryProviderProps) {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Record and add to history
    const recordView = (story: StoryType) => {
        setHistory(prev => ([
            ...prev,
            {
                timestamp: Date.now(),
                story
            }
        ]));
    };

    // Delete one history at a time
    const deleteHistory = (timestamp: number) => {
        setHistory(prev => 
            prev.filter(entry => entry.timestamp !== timestamp)
        );
    };
    
    // Clears all history
    const clearHistory = () => {
        setHistory([]);
    }

    // Load history
    useEffect(() => {
        async function loadHistory() {
            const stored = await AsyncStorage.getItem("history");

            if (stored !== null)
                setHistory(JSON.parse(stored));

            setHasLoaded(true);
        };

        loadHistory();
    }, []);

    // Save history
    useEffect(() => {
        if (!hasLoaded)
            return;
        
        async function saveHistory() {
            await AsyncStorage.setItem("history", JSON.stringify(history));
        }

        saveHistory();
    }, [hasLoaded, history]);

    return (
        <HistoryContext.Provider value={{history, recordView, deleteHistory, clearHistory}}>
            {children}
        </HistoryContext.Provider>
    )
}

export function useHistoryContext() {
    const context = useContext(HistoryContext);

    if (context === null) {
        throw new Error (
            "useHistoryContext must be used within an HistoryContextProvider"
        );
    }

    return context;
}