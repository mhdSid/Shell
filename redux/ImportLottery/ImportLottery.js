import {
  addBackgroundUpload,
  updateAdBackground,
} from '../../services/Lotteries';
import {handleError} from '../Home/actions';
import invoke from 'lodash/invoke';
import {lotteryDetailsActions} from '../LotteryDetails/actions';
import {uploadProgressActions} from '../UploadProgress/actions';
import {reject, uniq} from 'lodash';
import {homeActions} from '../Home/actions';

const handleImportLottery = payload => {
  return dispatch => {
    const uniqId = `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const {
      onError,
      name,
      description,
      image,
      prefecture,
      category,
      condition,
      price,
      city,
      userId,
      country,
      currency,
      imageFiles,
    } = payload;
    const importAdSuccessBackground = data => {
      const {error, newAd} = data;
      invoke(payload, 'onSuccess');
      if (error || !newAd) {
        dispatch({
          type: uploadProgressActions.removeProgressItem,
          payload: {
            id: uniqId,
          },
        });
        return handleError(
          error && error.error
            ? {error: error.error, onError}
            : {error, onError},
        );
      }
      if (imageFiles && imageFiles.length) {
        const newImages = imageFiles
          .filter(Boolean)
          .slice(1, imageFiles.length);
        const updatePromises = [];
        newImages.forEach((newImage, index) => {
          updatePromises.push(
            new Promise(resolve => {
              updateAdBackground({
                id: newAd.id,
                image: newImage,
              }).then(response => {
                const {error: err, updatedAd} = response;
                if (err || !updatedAd) {
                  dispatch({
                    type: uploadProgressActions.removeProgressItem,
                    payload: {
                      id: uniqId,
                    },
                  });
                  const errorObj =
                    err && err.error
                      ? {error: err.error, onError}
                      : {error: err, onError};
                  reject(errorObj);
                  return handleError(errorObj);
                }
                dispatch({
                  type: homeActions.setLotteries,
                  payload: updatedAd,
                });
                resolve(updatedAd);
              });
            }),
          );
        });
        return Promise.all(updatePromises).then(
          response => {
            console.log('Promise complete: ', updatePromises);
            if (Array.isArray(response) && response.length) {
              dispatch({
                type: uploadProgressActions.removeProgressItem,
                payload: {
                  id: uniqId,
                },
              });
              const importedLottery = {
                ...response[response.length - 1],
                images: uniq(
                  response
                    .map(lottery => lottery.images)
                    .join()
                    .split(','),
                ),
              };
              dispatch({
                type: homeActions.setLotteries,
                payload: importedLottery,
              });
              dispatch({
                type: lotteryDetailsActions.showLotteryDetails,
                payload: null,
              });
              return dispatch({
                type: lotteryDetailsActions.showLotteryDetails,
                payload: importedLottery,
              });
            }
          },
          reason => {
            dispatch({
              type: uploadProgressActions.removeProgressItem,
              payload: {
                id: uniqId,
              },
            });
            return handleError({error: reason, onError});
          },
        );
      }
      return dispatch({
        type: uploadProgressActions.removeProgressItem,
        payload: {
          id: uniqId,
          adId: newAd.id,
        },
      });
    };
    dispatch({
      type: uploadProgressActions.addNewProgressItem,
      payload: {
        id: uniqId,
        name,
        description,
        city,
        images: imageFiles && imageFiles.map(item => item.uri),
        prefecture,
        category,
        condition,
        price,
        userId,
        country,
        currency,
      },
    });
    return addBackgroundUpload({
      name,
      description,
      city,
      image,
      prefecture,
      category,
      condition,
      price,
      userId,
      country,
      currency,
    }).then(importAdSuccessBackground, error => {
      dispatch({
        type: uploadProgressActions.removeProgressItem,
        payload: {
          id: uniqId,
        },
      });
      return handleError({error, onError});
    });
  };
};

export {handleImportLottery};
