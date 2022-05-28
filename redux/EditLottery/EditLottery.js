import {
  updateAdBackground,
  updateLotteryWithoutImage,
} from '../../services/Lotteries';
import {handleError} from '../Home/actions';
import invoke from 'lodash/invoke';
import {lotteryDetailsActions} from '../LotteryDetails/actions';
import {reject, uniq} from 'lodash';
import {homeActions} from '../Home/actions';
import {shipLotteryActions} from '../ShipLottery/actions';
import {lotteriesActions} from '../Lotteries/actions';
import {chatActions} from '../Chat/actions';

export const handleUpdateLottery = payload => {
  return (dispatch, getState) => {
    const {
      onError,
      name,
      description,
      shippingInformation,
      lotteryRules,
      prefecture,
      category,
      condition,
      id,
      price,
      city,
      userId,
      imageFiles,
      textDataChanged,
    } = payload;
    if (
      textDataChanged &&
      (prefecture ||
        city ||
        price ||
        condition ||
        category ||
        description ||
        shippingInformation ||
        lotteryRules ||
        name)
    ) {
      const onUpdateUserSuccess = data => {
        let {error, updatedLottery} = data;
        if (error) {
          return handleError({error, onError}, getState);
        }
        invoke(payload, 'onSuccess');
        dispatch({
          type: homeActions.setLotteries,
          payload: updatedLottery,
        });
        dispatch({
          type: lotteryDetailsActions.showLotteryDetails,
          payload: {
            ...updatedLottery,
            resetState: false,
          },
        });
        if (imageFiles && imageFiles.length) {
          const updatePromises = [];
          imageFiles.forEach(newImage => {
            updatePromises.push(
              new Promise(resolve => {
                updateAdBackground({
                  id,
                  image: newImage,
                }).then(response => {
                  const {error: err, updatedAd} = response;
                  if (err || !updatedAd) {
                    const errorObj =
                      err && err.error
                        ? {error: err.error, onError}
                        : {error: err, onError};
                    reject(errorObj);
                    return handleError(errorObj, getState);
                  }
                  resolve(updatedAd);
                });
              }),
            );
          });
          return Promise.all(updatePromises).then(
            response => {
              if (Array.isArray(response) && response.length) {
                updatedLottery = {
                  ...updatedLottery,
                  ...response[response.length - 1],
                  images: uniq(
                    response
                      .map(lottery => lottery.images)
                      .join()
                      .split(','),
                  ),
                };
                dispatch({
                  type: homeActions.editLottery,
                  payload: updatedLottery,
                });
                dispatch({
                  type: chatActions.editLottery,
                  payload: updatedLottery,
                });
                dispatch({
                  type: shipLotteryActions.editLottery,
                  payload: updatedLottery,
                });
                dispatch({
                  type: lotteriesActions.editLottery,
                  payload: updatedLottery,
                });
                return dispatch({
                  type: lotteryDetailsActions.showLotteryDetails,
                  payload: {
                    ...updatedLottery,
                    resetState: false,
                  },
                });
              }
            },
            reason => {
              return handleError({error: reason, onError}, getState);
            },
          );
        } else {
          return;
        }
      };
      return updateLotteryWithoutImage({
        name,
        description,
        lotteryRules,
        shippingInformation,
        city,
        id,
        prefecture,
        category,
        condition,
        price,
        userId,
      }).then(onUpdateUserSuccess, error => {
        return handleError({error, onError}, getState);
      });
    } else if (imageFiles && imageFiles.length) {
      const updatePromises = [];
      imageFiles.forEach(newImage => {
        updatePromises.push(
          new Promise(resolve => {
            updateAdBackground({
              id,
              image: newImage,
            }).then(response => {
              const {error: err, updatedAd} = response;
              if (err || !updatedAd) {
                const errorObj =
                  err && err.error
                    ? {error: err.error, onError}
                    : {error: err, onError};
                reject(errorObj);
                return handleError(errorObj, getState);
              }
              resolve(updatedAd);
            });
          }),
        );
      });
      return Promise.all(updatePromises).then(
        response => {
          if (Array.isArray(response) && response.length) {
            const updatedLottery = {
              ...response[response.length - 1],
              images: uniq(
                response
                  .map(lottery => lottery.images)
                  .join()
                  .split(','),
              ),
            };
            invoke(payload, 'onSuccess');
            dispatch({
              type: homeActions.editLottery,
              payload: updatedLottery,
            });
            dispatch({
              type: chatActions.editLottery,
              payload: updatedLottery,
            });
            dispatch({
              type: shipLotteryActions.editLottery,
              payload: updatedLottery,
            });
            dispatch({
              type: lotteriesActions.editLottery,
              payload: updatedLottery,
            });
            return dispatch({
              type: lotteryDetailsActions.showLotteryDetails,
              payload: {
                ...updatedLottery,
                resetState: false,
              },
            });
          }
        },
        reason => {
          return handleError({error: reason, onError}, getState);
        },
      );
    }
  };
};
