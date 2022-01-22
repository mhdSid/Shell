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
  noAuthViewContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    ...flex,
    justifyContent: 'center',
    marginBottom: 100,
  },
  label: {
    fontWeight: '500',
    fontSize: 16,
    color: 'rgba(0,0,0,.5)',
  },
  noAuthButtonViewContainer: {
    marginTop: 20,
  },
});

export default styles;
