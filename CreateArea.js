import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function CreateArea(props) {
    const [note, setNote] = React.useState({
        title: "",
        content: "",
        id: uuidv4()
    });
    function handleTitleChange(title) {
        setNote(prevNote => {
            return {
                ...prevNote,
                title: title
            };
        }
        );
    }
    function handleContentChange(content) {
        setNote(prevNote => {
            return {
                ...prevNote,
                content: content
            };
        }
        );
    }

    function submit(event) {
        props.onAdd(note);
        setNote({
            title: "",
            content: "",
            id: uuidv4()
        });
        event.preventDefault();
    }
    return (
            <View style= {styles.view}>
              <View style = {styles.viewTitle}>
              <TextInput sytle = {styles.textInputTitle} 
                    placeholder="Title" 
                    textAlignVertical="top"
                    textAlign="left"
                    name = "title"
                    onChangeText={handleTitleChange}
                    value = {note.title}
              />
              </View>
              <View style = {styles.viewTitle}>
                <TextInput sytle = {styles.textInputDescription} 
                      placeholder="Description" 
                      multiline={true}
                      numberOfLines={2}
                      textAlignVertical="top"
                      textAlign="left"
                      name = "content"
                      onChangeText = {handleContentChange}
                      value = {note.content}
                      />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={submit}
                    >
                    <Text style={styles.buttonTextStyle}>Add</Text>
                  </TouchableOpacity>
              </View>
            </View>
      );
    }
const styles = StyleSheet.create({
    viewTitle : {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    view : {
        position: 'relative',
        backgroundColor: 'white',
        marginStart: 30,
        marginEnd: 30,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 10,
        boxShadow: '0 1 5 rgb(138, 137, 137)',
    },
    textInputTitle: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: 200,
        height: 5,
        marginStart: 10,
    },
    deleteButton: {
        backgroundColor: 'yellow',
        width: 25,
        height: 25,
        marginEnd: -10,
        marginTop: -10,
        borderRadius: 10,
        textAlign: 'center',
    },
    buttonTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: 'yellow',
        width: 50,
        height: 25,
        marginEnd: 1,
        marginTop: 30,
        borderRadius: 10,
        textAlign: 'center',
    },
    textInputDescription: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: 200,
        height: 50,
        marginStart: 10,
    }
    });