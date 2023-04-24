import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import db from '../localDb';

export default class PhonicSoundButton extends React.Component {
  constructor (props) {
  super (props)
  this.state = {
    pressButtonIndex: '',
  };
  }
  playSound = async (soundChunk) => {
    var soundLink =
      'https://s3-whitehatjrcontent.whjr.online/phones/' + soundChunk + '.mp3';
    await Audio.Sound.createAsync({ uri: soundLink }, { shouldPlay: true });
  };

  render() {
    return (
        <TouchableOpacity 
        style = {this.props.buttonIndex === this.state.pressButtonIndex ? [styles.chunkButton, {backgroundColor: 'white'}]:
        [styles.chunkButton, {backgroundColor: 'purple'}]}
        onPress = {() => {
          this.setState({pressButtonIndex: this.props.buttonIndex});
          this.playSound(this.props.soundChunk);
        }} >
          <Text style={
            this.props.buttonIndex === this.state.pressButtonIndex ?
            [styles.displayText, {color: 'purple'}]:
            [styles.displayText, {color: 'white'}]
          }>
          {this.props.wordChunk}
          </Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputBox: {
    width: 200,
    borderWidth: 3,
    height: 50,
    alignSelf: 'center',
    borderColor: 'purple',
    marginTop: 30,
    backgroundColor: 'lavender',
    fontSize: 19,
    textAlign: 'center',
  },
  goButton: {
    width: '50%',
    height: 20,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 20,
  },
  chunkButton: {
    width: 150,
    borderWidth: 3,
    height: 29,
    alignSelf: 'center',
    borderColor: 'purple',
    marginTop: 20,
    backgroundColor: 'lavender',
    fontSize: 19,
    textAlign: 'center',
  },
  iconStyling: {
    width: 150,
    height: 150,
    marginTop: 30,
    alignSelf: 'center',
  },
});
