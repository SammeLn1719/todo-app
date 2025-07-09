import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useTaskStore } from '@/store/taskStore';
import TaskItem from '@/components/TaskItem';
import SortControl from '@/components/SortControl';
import AddTaskForm from '@/components/AddTaskForm';
import TaskDetailModal from '@/components/TaskDetailModal';

import { Task, TaskStatus } from '@/store/types';
import { FAB } from 'react-native-paper';

export default function HomeScreen() {

  const tasks = useTaskStore(state => state.tasks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'status'>('date');
  
  // Состояние для фильтрации по статусам
  const [selectedStatuses, setSelectedStatuses] = useState<TaskStatus[]>([
    'Not Started', 
    'In Progress', 
    'Completed', 
    'Cancelled'
  ]);

  // Фильтрация задач по выбранным статусам
  const filteredTasks = tasks.filter(task => 
    selectedStatuses.includes(task.status)
  );

  // Сортировка задач
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      const statusOrder: Record<TaskStatus, number> = {
        'Not Started': 0,
        'In Progress': 1,
        'Completed': 2,
        'Cancelled': 3
      };
      return statusOrder[a.status] - statusOrder[b.status];
    }
  });

  // Проверка если все статусы отключены
  useEffect(() => {
    if (selectedStatuses.length === 0) {
      setSelectedStatuses([
        'Not Started', 
        'In Progress', 
        'Completed', 
        'Cancelled'
      ]);
    }
  }, [selectedStatuses]);

  return (
    <View style={styles.container}>
      {showAddForm ? (
        <AddTaskForm 
          onSubmit={() => setShowAddForm(false)} 
          onCancel={() => setShowAddForm(false)}
        />
      ) : (
        <>
          <View style={styles.header}>
            <SortControl 
              sortBy={sortBy} 
              onSortChange={setSortBy}
              selectedStatuses={selectedStatuses}
              onStatusFilterChange={setSelectedStatuses}
            />
          </View>
          
          {filteredTasks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {tasks.length === 0 
                  ? "No tasks yet. Add your first task!" 
                  : "No tasks match the selected statuses."}
              </Text>
            </View>
          ) : (
            <FlatList
              data={sortedTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskItem 
                  task={item} 
                  onPress={() => setSelectedTask(item)} 
                />
              )}
              contentContainerStyle={styles.listContent}
            />
          )}
        </>
      )}
      
      {!showAddForm && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setShowAddForm(true)}
          color="white"
        />
      )}
      
      {selectedTask && (
        <TaskDetailModal 
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7', 
  },
  header: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#FFF59D', 
    borderBottomWidth: 1,
    borderBottomColor: '#FDD835', 
  },
  listContent: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FBC02D', 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#999900',
    textAlign: 'center',
  },
});