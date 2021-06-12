import {addBackgroundUpload, updateAdBackground} from '../../services/Ads';
import {handleError, adActions} from './actions';
import invoke from 'lodash/invoke';
import {adDetailsActions} from '../AdDetails/actions';
import {uploadProgressActions} from '../UploadProgress/actions';
import {reject} from 'lodash';

const handleImportAd = payload => {
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
      status,
      price,
      userId,
      country,
      currency,
      imageFiles,
    } = payload;
    let progressItemsLength = imageFiles.length;
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
      if (imageFiles && imageFiles.length > 1) {
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
                updateProgress: progress => {
                  dispatch({
                    type: uploadProgressActions.updateProgressItem,
                    payload: {
                      id: uniqId,
                      progress,
                      progressItemsLength,
                    },
                  });
                },
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
                  type: adActions.importAd,
                  payload: updatedAd,
                });
                dispatch({
                  type: adDetailsActions.showAdDetails,
                  payload: updatedAd,
                });
                resolve(updatedAd);
              });
            }),
          );
        });
        return Promise.all(updatePromises).then(
          response => {
            if (Array.isArray(response) && response.length > 0) {
              const updatedAd = response[response.length - 1];
              dispatch({
                type: adActions.importAd,
                payload: updatedAd,
              });
              dispatch({
                type: adDetailsActions.showAdDetails,
                payload: updatedAd,
              });
              return dispatch({
                type: uploadProgressActions.removeProgressItem,
                payload: {
                  id: uniqId,
                },
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
        images: imageFiles && imageFiles.map(item => item.uri),
        prefecture,
        category,
        status,
        price,
        userId,
        country,
        currency,
      },
    });
    return addBackgroundUpload({
      name,
      description,
      image,
      prefecture,
      category,
      status,
      price,
      userId,
      country,
      currency,
      updateProgress: progress => {
        dispatch({
          type: uploadProgressActions.updateProgressItem,
          payload: {
            id: uniqId,
            progress,
            progressItemsLength,
          },
        });
      },
    }).then(importAdSuccessBackground, error => {
      if (imageFiles.length > 1) {
        --progressItemsLength;
      } else {
        dispatch({
          type: uploadProgressActions.removeProgressItem,
          payload: {
            id: uniqId,
          },
        });
      }
      return handleError({error, onError});
    });
  };
};

export {handleImportAd};
