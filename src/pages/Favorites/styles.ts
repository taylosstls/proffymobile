import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
  },

  teacherList: {
    marginTop: -40,
    flex: 1,
  },

  favoriteIcon: {
    marginLeft: 20
  },

  favoriteText: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular'
  },

  empty: {
    marginTop: 40,
    minHeight: 450,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    marginBottom: 20,
  }

});

export default styles;