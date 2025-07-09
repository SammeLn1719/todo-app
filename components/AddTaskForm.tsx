import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTaskStore } from '@/store/taskStore';

const AddTaskForm = ({ onSubmit, onCancel }: { 
  onSubmit: () => void; 
  onCancel: () => void 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const addTask = useTaskStore(state => state.addTask);

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    addTask({
      title,
      description,
      date,
      address
    });
    
    // Сброс формы
    setTitle('');
    setDescription('');
    setAddress('');
    setDate(new Date());
    onSubmit();
  };

  const showPicker = () => {
    if (Platform.OS === 'ios') {
      setShowDatePicker(true);
    } else {
      // Для Android показываем пикер как модальное окно
      setShowDatePicker(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />
      
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor="#999"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        placeholderTextColor="#999"
      />
      
      <Button 
        title={`Date: ${date.toLocaleDateString()} Time: ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`} 
        onPress={showPicker} 
      />
      
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
          style={Platform.OS === 'ios' ? styles.iosPicker : {}}
        />
      )}
      
      <View style={styles.buttons}>
        <Button title="Cancel" onPress={onCancel} color="gray" />
        <Button 
          title="Add Task" 
          onPress={handleSubmit} 
          disabled={!title.trim()} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  iosPicker: {
    height: 200,
    marginTop: 10,
  }
});

export default AddTaskForm;