import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 40,
    backgroundColor: '#8257E5'
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFFFFF',
    lineHeight: 32,
    fontSize: 24,
    maxWidth: 160,
    marginVertical: 40,
  }
  
});

export default styles;