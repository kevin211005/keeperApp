/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CreateArea from './CreateArea';
import Note from './Note';
import { API, graphqlOperation} from 'aws-amplify';
import * as mutations from './src/graphql/mutations';
import * as queries from './src/graphql/queries';
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.getAllNotes = this.getAllNotes.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);

  }
  /**
   * Get all the notes from the database when the component is mounted
   */
  componentDidMount() {
    this.getAllNotes();
  }
  /**
   * 
   * @param {*} newNote: New Item to be added to the list
   */
  async addNote(newNote) {
    try {
      await API.graphql(graphqlOperation(mutations.createTodo, { input: newNote }));
      console.log('item created!');
      this.setState(prevState => ({
        notes: [...prevState.notes, newNote]
      }));
    }
    catch (err) {
      console.log('error creating todo:', err);
    }
  }
  /**
   * Call the delete mutation and update the state
   * @param {*} id : Id of the item to be deleted
   */
  async deleteNote(id) {
    try {
      await API.graphql(graphqlOperation(mutations.deleteTodo, { input: { id: id } }));
      console.log('item deleted!');
      this.setState(prevState => ({
        notes: prevState.notes.filter((noteItem) => {
          return noteItem.id !== id;
        })
      }));
    } catch (err) {
      console.log('error deleting todo:', err);
    }
  }
  /**
   * 
   * @param {*} note : Updated note to be updated in the list
   */
  async updateNote(note) {
    try {
      await API.graphql({query: mutations.updateTodo, variables: {input: note}});
      console.log('item updated!');
      this.setState(prevState => ({
        notes: prevState.notes.map((noteItem) => {
          return noteItem.id === note.id ? note : noteItem;
        }
        )
      }));
    } catch (err) {
      console.log('error updating todo:', err);
    }
  }
  /**
   * Get all the notes from the database
   */
  async getAllNotes() {
    try {
      const allTodo = await API.graphql(graphqlOperation(queries.listTodos));
      const notes = allTodo.data.listTodos.items.map((item) => {
        return { name: item.name, description: item.description, id: item.id };
      });
      this.setState({notes: notes});
    }
    catch (err) {
      console.log('error fetching todos', err);
    }
  }
  render () {
    return (
      <SafeAreaView>
        <View style = {styles.viewMain}>
          <CreateArea onAdd={this.addNote}/>
          <Text style= {styles.textStyle}>Tasks</Text>
          <FlatList
                contentContainerStyle={styles.contentContainer}
                horizontal={false}
                data={this.state.notes}
                renderItem={(item) => 
                <Note 
                name= {item.item.name} 
                description = {item.item.description}   
                id = {item.item.id}   
                deleteNote = {this.deleteNote}  
                updateNote = {this.updateNote}
                />}
              />
        </View>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  viewMain : {
    backgroundColor: '#eee',
  },
  textStyle : {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default App;