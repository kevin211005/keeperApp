import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
export default function Note(props) {
    const [note, setNote] = React.useState({
        name: props.name ,
        description: props.description,
        id: props.id
    });
    function handleDelte() {
        console.log(note.id);
        props.deleteNote(props.id);
    }
    function handleTitleChange(title) {
      setNote(prevNote => {
          return {
              ...prevNote,
              name: title
          };
      }
      );
    }
    function handleContentChange(content) {
        setNote(prevNote => {
            return {
                ...prevNote,
                description: content
            };
        }
        );
    }
    function submit() {
      props.updateNote(note);
    }
    return (
        <SafeAreaView>
          <View style = {styles.viewMain}>
            <View style= {styles.view}>
              <View style = {styles.viewTitle}>
              <TextInput sytle = {styles.textInputTitle} 
                    placeholder="Title" 
                    textAlignVertical="top"
                    textAlign="left"
                    value={note.name}
                    onChangeText={handleTitleChange}
              />
              <TouchableOpacity
                visible={false}
                style={styles.deleteButton}
                onPress={handleDelte}
                >
                <Text style={styles.buttonTextStyle}>X</Text>
              </TouchableOpacity>
              </View>
              <View style = {styles.viewTitle}>
                <TextInput sytle = {styles.textInputDescription} 
                      placeholder="Description" 
                      multiline={true}
                      numberOfLines={2}
                      textAlignVertical="top"
                      textAlign="left"
                      value={note.description}
                      onChangeText={handleContentChange}
                      />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={submit}
                    >
                    <Text style={styles.buttonTextStyle}>Update</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
    
        </SafeAreaView>
      );
    }
const styles = StyleSheet.create({
    viewMain : {
        backgroundColor: '#eee',
    },
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
        width: 75,
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