import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type TaskInputProps = {
  title: string;
  description: string;
  setTitle: (t: string) => void;
  setDescription: (d: string) => void;
  onSubmit: () => void;
  editing: boolean;
};

export default function TaskInput({
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
  editing,
}: TaskInputProps) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder='Task title'
        placeholderTextColor={'#999'}
        value={title}
        onChangeText={setTitle}
        enterKeyHint='done'
      />
      <TextInput
        style={[styles.input, styles.description]}
        placeholder='Optional description'
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={'#999'}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{editing ? 'Update' : 'Add'} Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  description: {
    minHeight: 40,
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
