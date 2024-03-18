import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainView: {
    margin: 12,
    borderRadius: 24,
    backgroundColor: '#Fff',
    padding: 16,
    paddingVertical: 24,
  },
  ticketIdView: {
    alignItems: 'center',
  },
  ticketIdBackground: {
    backgroundColor: '#ff6b0025',
    padding: 16,
    borderRadius: 63,
    marginBottom: 24,
    width: 220,
  },
  ticketIdText: {
    textAlign: 'center',
    color: Colors?.darkOrange,
    fontFamily: 'Plus Jakarta Sans',
  },
  ticketTitleText: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  textRegular: {
    fontFamily: 'Plus Jakarta Sans Regular',
    color: '#808080',
  },
  textBold: {
    fontFamily: 'Plus Jakarta Sans Bold',
  },
  button: {
    borderColor: '#ff6b00',
    borderWidth: 1,
    padding: 16,
    marginTop: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6b00',
  },
  buttonText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  ticketActivityView: {
    marginTop: 24,
    backgroundColor: '#ff6b0025',
    borderRadius: 32,
    padding: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
    alignSelf: 'flex-start', // Adjusts width to fit content
  },
  ticketActivityText: {
    color: '#ff6b00',
    fontFamily: 'Plus Jakarta Sans',
  },
});
