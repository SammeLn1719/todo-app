import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useTaskStore } from '@/store/taskStore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SettingsScreen() {
  const clearCompleted = useTaskStore(state => state.clearCompleted);
  const clearAllTasks = useTaskStore(state => state.clearAllTasks);
  const [storageData, setStorageData] = useState<string>('');

  const viewStorageData = async () => {
    const data = await AsyncStorage.getItem('task-storage');
    setStorageData(data || 'No data found');
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Button 
          title="Clear completed tasks" 
          onPress={clearCompleted}
          color="gray"
        />
      </View>

      <View style={styles.settingItem}>
        <Button 
          title="Clear all tasks" 
          onPress={clearAllTasks}
          color="gray"
        />
      </View>

      <View style={styles.settingItem}>
        <Button 
          title="View Storage Data" 
          onPress={viewStorageData}
          color="gray"
        />
      </View>

      {storageData ? (
        <ScrollView style={styles.storageDataContainer}>
          <Text style={styles.storageData}>{storageData}</Text>
        </ScrollView>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.version}>v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFDE7', 
    paddingTop: 40,
  },
  settingItem: {
    marginBottom: 16,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  version: {
    color: '#999900', 
  },
  storageDataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFF9C4', 
    borderRadius: 8,
    maxHeight: 200,
  },
  storageData: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333300', 
  }
});
