import { Feather, FontAwesome } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TaskItemProps = {
  task: {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: TaskItemProps['task']) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  return (
    <View style={[styles.card, task.completed && styles.cardCompleted]}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onToggle(task.id)}
          style={styles.checkbox}
        >
          <FontAwesome
            name={task.completed ? 'check-circle' : 'circle-thin'}
            size={22}
            color={task.completed ? '#4caf50' : '#aaa'}
          />
        </TouchableOpacity>

        <View style={styles.textWrapper}>
          <Text style={[styles.title, task.completed && styles.completed]}>
            {task.title}
          </Text>
          {task.description ? (
            <Text style={styles.description}>{task.description}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task)}>
          <Feather name='edit-3' size={24} color='#f59e0b' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Delete Task',
              'Are you sure you want to delete this task?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => onDelete(task.id),
                },
              ]
            )
          }
        >
          <Feather name='trash-2' size={24} color='#ef4444' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fefefe',
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardCompleted: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#c6f6d5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: 12,
    paddingTop: 2,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  description: {
    marginTop: 4,
    color: '#666',
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 16,
  },
});
