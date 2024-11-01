import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ListItem from './components/ListItem';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const TITLES = [
  'Take the garbage out',
  'Clean your room',
  'Code daily',
  'Take notes',
];

interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

const BACKGROUND_COLOR = '#FAFBFF';

export default function App() {
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index))
  }, [])

  const scrollRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <GestureHandlerRootView>
        <ScrollView style={{ flex: 1 }}>
          {tasks.map((task) => (
            <ListItem simultaneousHandlers={scrollRef} key={task.index} task={task} onDismiss={onDismiss} />
          ))}
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 45,
    marginVertical: 20,
    paddingLeft: '5%',
  }
});


export { TaskInterface };