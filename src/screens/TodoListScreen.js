import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import TodoItem from '../components/TodoItem';
import { saveTodos, loadTodos } from '../utils/storage';

class TodoListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
    };
  }

  componentDidMount() {
    this.loadTodosFromStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      saveTodos(this.state.todos);
    }
  }

  componentWillUnmount() {
    // Cleanup or save final state if needed
  }

  loadTodosFromStorage = async () => {
    const todos = await loadTodos();
    this.setState({ todos });
  };

  addTodo = () => {
    if (this.state.newTodo.trim() !== '') {
      this.setState(prevState => ({
        todos: [...prevState.todos, { id: Date.now(), text: prevState.newTodo, completed: false }],
        newTodo: '',
      }));
    }
  };

  toggleTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Daftar Tugas</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.newTodo}
            onChangeText={(text) => this.setState({ newTodo: text })}
            placeholder="Tambah tugas baru"
          />
          <Button title="Tambah" onPress={this.addTodo} />
        </View>
        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={() => this.toggleTodo(item.id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default TodoListScreen;