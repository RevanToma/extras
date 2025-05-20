import TaskInput from '@/components/task-components/TaskInput';
import TaskItem from '@/components/task-components/TaskItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const STORAGE_KEY = 'TASKS';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks) setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.error('Failed to load tasks');
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = () => {
    if (!title.trim()) return;

    if (editingTaskId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId ? { ...task, title, description } : task
        )
      );
      setEditingTaskId(null);
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        completed: false,
      };
      setTasks((prev) => [newTask, ...prev]);
    }

    setTitle('');
    setDescription('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const startEdit = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description || '');
    setEditingTaskId(task.id);
  };

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          padding: 10,
          flex: 1,
        }}
      >
        <Text style={styles.heading}>Todo-List</Text>

        <TaskInput
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          onSubmit={addOrUpdateTask}
          editing={!!editingTaskId}
        />

        <Text style={styles.sectionTitle}>
          Pending Tasks ({pendingTasks.length})
        </Text>
        <FlatList
          data={pendingTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={startEdit}
            />
          )}
        />

        <Text style={styles.sectionTitle}>
          Completed Tasks ({completedTasks.length})
        </Text>
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={startEdit}
            />
          )}
          style={{ marginVertical: 15 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#444',
  },
});
