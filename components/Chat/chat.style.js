import {StyleSheet} from 'react-native';

const fullWidthHeight = {
  width: '100%',
  height: '100%',
};

const flex = {
  ...fullWidthHeight,
  flex: 1,
  flexDirection: 'column',
  display: 'flex',
};

const toolbarStyles = {
  height: 55,
  zIndex: 1555,
};

const styles = StyleSheet.create({
  rootSafeAreaView: {
    backgroundColor: '#b69cf6',
    zIndex: 1000,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'flex-start',
  },
  innerSafeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  toolbarContainer: {
    ...toolbarStyles,
  },
  chatAnimatedKeyboardAvoidingView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  chatViewContainer: {
    ...flex,
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  chatVirtualizedListContentContainer: {
    paddingTop: 20,
    width: '100%',
  },
  emptyChatViewContainer: {
    width: '100%',
    height: '89%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  emptyChatViewContainerText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'rgba(0,0,0,.5)',
    textAlign: 'center',
  },
  chatBottomToolbar: {
    ...toolbarStyles,
    textAlign: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#b69cf6',
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 70,
  },
  chatMessageTextInput: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.4)',
    backgroundColor: 'white',
    height: 55,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  chatConversationListItemViewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginBottom: 20,
    maxWidth: '80%',
  },
  chatConversationListItemViewContainerPullRight: {
    alignSelf: 'flex-end',
  },
  chatConversationTextMessageDate: {
    display: 'flex',
    fontSize: 12,
    marginTop: 5,
  },
  chatConversationTextMessage: {
    width: '100%',
    fontSize: 18,
  },
  chatConversationTextMessageViewContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,.1)',
    padding: 10,
    width: '100%',
  },
  chatConversationTextMessageViewContainerPullRight: {
    backgroundColor: '#b69cf6',
    alignSelf: 'flex-end',
  },
});

export default styles;
