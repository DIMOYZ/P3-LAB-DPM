import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_STORAGE_KEY = '@MyTodoApp:todos';

export const saveTodos = async (todos) => {
  try {
    await AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos:', error);
  }
};

export const loadTodos = async () => {
  try {
    const todosString = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
    return todosString ? JSON.parse(todosString) : [];
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
};