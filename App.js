import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TodoListScreen from './src/screens/TodoListScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TodoListScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default App;