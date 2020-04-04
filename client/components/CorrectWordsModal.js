import React from 'react';
import { StyleSheet, View, Modal, TouchableHighlight } from 'react-native';
import {
  Button,
  Container,
  Text,
  Content,
  Accordion,
  Input
} from 'native-base';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#f8cd05',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

const WordsGuessedModal = ({
  correctWords,
  correctWordsjoined,
  modalVisible,
  setModalVisible
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Content padder>
              <Input>{correctWordsjoined}</Input>
              {/* <Accordion dataArray={correctWordsArray} expanded={0} /> */}
            </Content>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#f8cd05' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Back To Game</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>
          {correctWords.length} Correct Words
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default WordsGuessedModal;
