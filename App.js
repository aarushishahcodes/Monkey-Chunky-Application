import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './localDb';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phones: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaProvider>
          <Header
            backgroundColor="lavender"
            centerComponent={{
              text: 'Monkey Chunky',
              style: { color: 'purple', fontSize: 22 },
            }}
          />
          <Image style={styles.iconStyling}
          source = {{
            uri: "https://www.shareicon.net/download/2015/10/19/658367_monkey_512x512.png"
          }}/>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Text"
            placeholderTextColor="purple"
            onChangeText={(text) => {
              this.setState({ text: text });
            }}
            value={this.state.text}
          />
          <TouchableOpacity
            style = {styles.goButton}
            onPress={() => {
              var word = this.state.text.toLowerCase().trim();
              db [word] ? (
              this.setState({ chunks: db[word].chunks}),
              this.setState({ phonicSounds: db[word].phones})
              ):
              Alert.alert("The word does not exist in this database.")
            }}>
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
          <View>
            {this.state.chunks.map((item, index) => {
              return (
                <PhonicSoundButton
                wordChunk = {this.state.chunks[index]}
                soundChunk = {this.state.phones[index]}
                buttonIndex = {index}
                />
              );
            })}
          </View>
        </SafeAreaProvider>
      </View>
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
    alignSelf: 'center'
  }
});
