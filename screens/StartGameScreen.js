import React, {useState} from 'react';
import {Button, StyleSheet, Text, Keyboard, TouchableWithoutFeedback, View, ViewComponent, Alert} from 'react-native';
import Card from "../components/Card";
import color from "../constants/color";
import Input from "../components/Input";
import NumberComponent from "../components/NumberComponent";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Enter number between 1 and 99',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            )
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card styles={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberComponent>{selectedNumber}</NumberComponent>
                <Button title="start game" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }
        }>
            <View style={styles.screen}>
                <Text style={styles.title}>The Game Screen</Text>
                <Card styles={styles.container}>
                    <Text>Select a Number</Text>
                    <Input
                        styles={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        maxLenfth={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                        keyboardType='number-pad'
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title='Reset' onPress={resetInputHandler} color={color.accent}/>
                        </View>
                        <View style={styles.button}>
                            <Button title='Confirm' onPress={confirmInputHandler} color={color.primary}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    container: {
        width: 300,
        maxWidth: '80%',
    },
    input: {
        width: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,

    },
    summaryContainer: {
        marginTop: 30,
        alignItems: 'center'
    },
})

export default StartGameScreen;