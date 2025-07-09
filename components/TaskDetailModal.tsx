import React from 'react';
import { View, Text, Modal, StyleSheet, Button, ScrollView } from 'react-native';
import { Task, TaskStatus } from '@/store/types';
import { statusColors } from '@/utils/helpers';
import { useTaskStore } from '@/store/taskStore';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose }) => {
  const updateTaskStatus = useTaskStore(state => state.updateTaskStatus);
  const deleteTask = useTaskStore(state => state.deleteTask);

  const statusOptions: TaskStatus[] = ['Not Started', 'In Progress', 'Completed', 'Cancelled'];

  return (
    <Modal visible={true} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{task.title}</Text>
          
          <ScrollView>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.value}>{task.description || 'No description'}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.label}>Date & Time:</Text>
              <Text style={styles.value}>{task.date.toLocaleString()}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{task.address}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.label}>Status:</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusColors[task.status] }]}>
                <Text style={styles.statusText}>{task.status}</Text>
              </View>
            </View>
            
            <View style={styles.statusContainer}>
              {statusOptions.map(status => (
                <Button
                  key={status}
                  title={status}
                  onPress={() => updateTaskStatus(task.id, status)}
                  disabled={task.status === status}
                  color={statusColors[status]}
                />
              ))}
            </View>
          </ScrollView>
          
          <View style={styles.actions}>
            <Button title="Close" onPress={onClose} />
            <Button 
              title="Delete" 
              onPress={() => {
                deleteTask(task.id);
                onClose();
              }} 
              color="red"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    width: 100,
    fontSize: 16,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: 'white',
    fontSize: 14,
  },
  statusContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default TaskDetailModal;