import React from 'react';
import { View, ImageBackground, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

function GiveClasses() {
  /*
  const { goBack } = useNavigation();

  function handleNavigateBack() {
    goBack();
  }
  */
  function handleNavigateBack() {
    Linking.openURL('https://proffy-ecru.vercel.app/give-classes')
  }


  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        style={styles.content}
        source={giveClassesBackgroundImage}
      >
        <Text style={styles.title}>
          Quer ser um Proffy?
        </Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar em nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton
        onPress={handleNavigateBack}
        style={styles.okButton}
      >
        <Text style={styles.okButtonText}>
          Acessar versão web
        </Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses;