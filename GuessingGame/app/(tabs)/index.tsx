import { Image } from 'expo-image';
import { Button, StyleSheet, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() {
  const [guess, setGuess] = useState(''),
    [feedback, setFeedback] = useState(''),
    [goalNum, setGoalNum] = useState(() => Math.floor(Math.random() * 100) + 1),
    [newGame, setNewGame] = useState(false),
    [attempts, setAttempts] = useState(0);

  const handleGuessedNum = () => {
    const numGuessed = parseInt(guess, 10);

    if (isNaN(numGuessed)) {
      setFeedback('Please enter a number');
    } else if (numGuessed < goalNum) {
      setFeedback('Too low!');
      setAttempts((prev) => prev + 1);
    } else if (numGuessed > goalNum) {
      setFeedback('Too high!');
      setAttempts((prev) => prev + 1);
    } else {
      setFeedback('Correct!');
      setGuess('');
      setNewGame(false);
    }
  };
  const handleNewGame = () => {
    setGoalNum(Math.floor(Math.random() * 100) + 1);
    setNewGame(true);
    setAttempts(0);
    setGuess('');
    setFeedback('');
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Guessing Game</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Enter your guess (1–100):</ThemedText>
        {feedback && (
          <>
            <ThemedText>{attempts} attempts</ThemedText>
            <ThemedText>{feedback}</ThemedText>
          </>
        )}
        <ThemedText type='default'>
          {!newGame ? `The number was ${goalNum}` : 'Good luck!'}
        </ThemedText>

        {newGame && (
          <>
            <TextInput
              style={styles.input}
              keyboardType='numeric'
              value={guess}
              onChangeText={setGuess}
              placeholder='Your guess'
            />
            <Button title='Submit Guess' onPress={handleGuessedNum} />
          </>
        )}
        {!newGame && <Button title='Start New Game' onPress={handleNewGame} />}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
});
