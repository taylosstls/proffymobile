import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginTop: -14,
    marginBottom: 24,
  },

  label: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular'
  },

  pickerView: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 16,
    flexDirection: 'row'
  },

  selectPicker: {
    flex: 1,
    height: 54,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  selectArrowPicker: {
    zIndex: 9,
    position: 'absolute',
    right: 8,
    top: 15,
  },

  input: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 16,
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputBlock: {
    width: '47%'
  },

  submitButton: {
    backgroundColor: '#04D361',
    height: 56,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
  },

  empty: {
    marginTop: 80,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  emptyText: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    marginRight: 16,
  }

});

export default styles;