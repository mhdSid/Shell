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

const styles = StyleSheet.create({
  userProfileContainer: {
    width: '100%',
    height: '100%',
  },
  userProfileInnerContainer: {
    ...flex,
  },
  userProfileBlurredImage: {
    width: '100%',
    height: '100%',
  },
  userProfileBlurredView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    top: 0,
    left: 0,
    zIndex: 1,
    opacity: 0.55,
  },
  userProfileHeaderContentContainer: {
    paddingTop: 20,
  },
  userProfileAvatarContainer: {
    marginBottom: 0,
  },
  userProfileImage: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: '#f7f5fe',
  },
  userProfileUserInfoText: {
    color: '#d9d9d9',
  },
});

export default styles;
