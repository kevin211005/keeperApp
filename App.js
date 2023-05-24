/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

export default function App() {
  const [notes, setNotes] = React.useState([]);
  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }
  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
  }
  function updateNote(note) {
    const newNotes = notes.filter((noteItem) => {
      return noteItem.id !== note.id;
    });
    setNotes([...newNotes, note]);
  }
  async function createNewItem() {
    const todo = { name: "My first todo", description: "Hello world!" };
    try {
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
      console.log('item created!');
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }
  return (
    <SafeAreaView>
      <View style = {styles.viewMain}>
        <CreateArea onAdd={addNote}/>
        <Text style= {styles.textStyle}>Tasks</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={createNewItem}
          >
          <Text style={styles.buttonTextStyle}>Test</Text>
        </TouchableOpacity>

        <FlatList
              contentContainerStyle={styles.contentContainer}
              horizontal={false}
              data={notes}
              renderItem={(item) => 
              <Note 
              title= {item.item.title} 
              content = {item.item.content}   
              id = {item.item.id}   
              deleteNote = {deleteNote}  
              updateNote = {updateNote}
              />}
            />
      </View>
    </SafeAreaView>

  );
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

