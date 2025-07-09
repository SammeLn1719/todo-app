import React, { useState } from 'react';
import { 
  View, 
  Text as RNText,
  TouchableOpacity, 
  StyleSheet, 
  Modal 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TaskStatus } from '@/store/types';
import { statusColors } from '@/utils/helpers';

const Text = (props: React.ComponentProps<typeof RNText>) => <RNText {...props} />;

interface SortControlProps {
  sortBy: 'date' | 'status';
  onSortChange: (value: 'date' | 'status') => void;
  selectedStatuses: TaskStatus[];
  onStatusFilterChange: (statuses: TaskStatus[]) => void;
}

const statusOptions: TaskStatus[] = ['Not Started', 'In Progress', 'Completed', 'Cancelled'];

const SortControl: React.FC<SortControlProps> = ({
  sortBy,
  onSortChange,
  selectedStatuses,
  onStatusFilterChange
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleStatus = (status: TaskStatus) => {
    if (selectedStatuses.includes(status)) {
      onStatusFilterChange(selectedStatuses.filter(s => s !== status));
    } else {
      onStatusFilterChange([...selectedStatuses, status]);
    }
  };

  const toggleAllStatuses = () => {
    if (selectedStatuses.length === statusOptions.length) {
      onStatusFilterChange([]);
    } else {
      onStatusFilterChange([...statusOptions]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.sortButton, sortBy === 'date' && styles.activeSortButton]}
        onPress={() => onSortChange('date')}
      >
        <Text style={styles.buttonText}>Date Added</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.sortButton, sortBy === 'status' && styles.activeSortButton]}
        onPress={() => onSortChange('status')}
      >
        <Text style={styles.buttonText}>Status</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="filter-list" size={24} color="#333" />
        {selectedStatuses.length < statusOptions.length && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{selectedStatuses.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Status</Text>
            
            <TouchableOpacity
              style={styles.filterOption}
              onPress={toggleAllStatuses}
            >
              <Text style={styles.filterText}>
                {selectedStatuses.length === statusOptions.length ? '✓' : '○'} All Statuses
              </Text>
            </TouchableOpacity>
            
            {statusOptions.map(status => (
              <TouchableOpacity
                key={status}
                style={styles.filterOption}
                onPress={() => toggleStatus(status)}
              >
                <View style={[styles.statusIndicator, { backgroundColor: statusColors[status] }]} />
                <Text style={styles.filterText}>
                  {selectedStatuses.includes(status) ? '✓' : '○'} {status}
                </Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDE7',
    borderRadius: 8,
    padding: 8,
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: '#FFFDE7', 
  },
  activeSortButton: {
    backgroundColor: '#FFEE58', 
  },
  buttonText: {
    fontSize: 14,
    color: '#665C00', 
  },
  filterButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#F57F17', 
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFDE7', 
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333300', 
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FDD835', 
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  filterText: {
    fontSize: 16,
    color: '#4E4300', 
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#FFF59D', 
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#665C00', 
    fontWeight: 'bold',
  },
});


export default SortControl;