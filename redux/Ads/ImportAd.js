import {
  importAd,
  updateAd,
  addBackgroundUpload,
  updateAdBackground,
} from '../../services/Ads';
import {handleError, adActions} from './actions';
import invoke from 'lodash/invoke';
import {adDetailsActions} from '../AdDetails/actions';
import {uploadProgressActions} from '../UploadProgress/actions';
import uniq from 'lodash/uniq';
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
    // const onUpdateAdSuccess = (newAd, canRemoveProgressItem) => {
    //   return data => {
    //     let response;
    //     if (Array.isArray(data) && data.length > 0) {
    //       response = data[data.length - 1];
    //     }
    //     console.log(
    //       'onUpdateAdSuccessonUpdateAdSuccessonUpdateAdSuccess: ',
    //       data,
    //     );
    //     const {error, updatedAd} = response;
    //     if (error || !updatedAd) {
    //       dispatch({
    //         type: uploadProgressActions.removeProgressItem,
    //         payload: uniqId,
    //       });
    //       return handleError(
    //         error && error.error
    //           ? {error: error.error, onError}
    //           : {error, onError},
    //       );
    //     }
    //     const newUpdatedAd = {
    //       ...newAd,
    //       images: uniq(
    //         [...(newAd.images || []), ...(updatedAd.images || [])].filter(
    //           Boolean,
    //         ),
    //       ),
    //     };
    //     dispatch({
    //       type: adActions.updateCurrentAd,
    //       payload: newUpdatedAd,
    //     });
    //     if (canRemoveProgressItem) {
    //       dispatch({
    //         type: uploadProgressActions.removeProgressItem,
    //         payload: uniqId,
    //       });
    //     }
    //     return dispatch({
    //       type: adDetailsActions.showAdDetails,
    //       payload: newUpdatedAd,
    //     });
    //   };
    // };
    // const importAdSuccess = data => {
    //   const {error, newAd} = data;
    //   invoke(payload, 'onSuccess');
    //   if (error || !newAd) {
    //     return handleError(error);
    //   }
    //   dispatch({
    //     type: adActions.importAd,
    //     payload: newAd,
    //   });
    //   dispatch({
    //     type: adDetailsActions.showAdDetails,
    //     payload: newAd,
    //   });
    //   if (imageFiles && imageFiles.length > 1) {
    //     const newImages = imageFiles
    //       .filter(Boolean)
    //       .slice(1, imageFiles.length);
    //     return updateAd({
    //       id: newAd.id,
    //       image: newImages,
    //     }).then(onUpdateAdSuccess(newAd), reason => {
    //       return handleError({error: reason, onError});
    //     });
    //   }
    //   return dispatch({
    //     type: uploadProgressActions.removeProgressItem,
    //     payload: uniqId,
    //   });
    // };
    const importAdSuccessBackground = data => {
      const {error, newAd} = data;
      invoke(payload, 'onSuccess');
      console.log('importAdSuccessBackground: ', data);
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
      // dispatch({
      //   type: adActions.importAd,
      //   payload: newAd,
      // });
      // dispatch({
      //   type: adDetailsActions.showAdDetails,
      //   payload: newAd,
      // });
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
                      progressItemsLength: imageFiles.length,
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
    // dispatch({
    //   type: adActions.importAd,
    //   payload: {
    //     name,
    //     description,
    //     images: imageFiles && imageFiles.map(item => item.uri),
    //     prefecture,
    //     category,
    //     status,
    //     price,
    //     userId,
    //     country,
    //     currency,
    //     id: uniqId,
    //     uniqId,
    //     publishDate: new Date(),
    //   },
    // });
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
    // return false;
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
            // progress: progress * 100,
            progressItemsLength: imageFiles.length,
          },
        });
      },
    }).then(importAdSuccessBackground, error => {
      console.log('addBackgroundUpload error: ', error);
      dispatch({
        type: uploadProgressActions.removeProgressItem,
        payload: {
          id: uniqId,
        },
      });
      return handleError({error, onError});
    });
    // return importAd({
    //   name,
    //   description,
    //   image,
    //   prefecture,
    //   category,
    //   status,
    //   price,
    //   userId,
    //   country,
    //   currency,
    // }).then(importAdSuccess, error => {
    //   return handleError({error, onError});
    // });
  };
};

// const handleImportAd = payload => {
//   return dispatch => {
//     const uniqId = `_${Math.random()
//       .toString(36)
//       .substr(2, 9)}`;
//     const {
//       onError,
//       name,
//       description,
//       image,
//       prefecture,
//       category,
//       status,
//       price,
//       userId,
//       country,
//       currency,
//       imageFiles,
//     } = payload;
//     const onUpdateAdSuccess = newAd => {
//       return data => {
//         if (!data) {
//           return handleError({});
//         }
//         const {error, updatedAd} = data;
//         if (error) {
//           return handleError(error);
//         }
//         const newUpdatedAd = {
//           ...newAd,
//           images: uniq(
//             [...(newAd.images || []), ...(updatedAd.images || [])].filter(
//               Boolean,
//             ),
//           ),
//         };
//         dispatch({
//           type: adActions.updateCurrentAd,
//           payload: newUpdatedAd,
//         });
//         dispatch({
//           type: uploadProgressActions.removeProgressItem,
//           payload: uniqId,
//         });
//         return dispatch({
//           type: adDetailsActions.showAdDetails,
//           payload: newUpdatedAd,
//         });
//       };
//     };
//     const importAdSuccess = data => {
//       const {error, newAd} = data;
//       invoke(payload, 'onSuccess');
//       if (error || !newAd) {
//         return handleError(error);
//       }
//       dispatch({
//         type: adActions.importAd,
//         payload: newAd,
//       });
//       dispatch({
//         type: adDetailsActions.showAdDetails,
//         payload: newAd,
//       });
//       if (imageFiles && imageFiles.length > 1) {
//         const newImages = imageFiles
//           .filter(Boolean)
//           .slice(1, imageFiles.length);

//         // LOOP through images and backgroud update one by one
//         const promises = [];
//         newImages.forEach(newImage => {
//           promises.push(
//             updateAd({
//               id: newAd.id,
//               image: newImage,
//             }),
//           );
//         });
//         return Promise.all(promises).then(onUpdateAdSuccess(newAd), reason => {
//           return handleError({error: reason, onError});
//         });

//         // return updateAd({
//         //   id: newAd.id,
//         //   image: newImages,
//         // }).then(onUpdateAdSuccess(newAd), reason => {
//         //   return handleError({error: reason, onError});
//         // });
//       }
//       return dispatch({
//         type: uploadProgressActions.removeProgressItem,
//         payload: uniqId,
//       });
//     };
//     dispatch({
//       type: uploadProgressActions.addNewProgressItem,
//       payload: uniqId,
//     });
//     return importAd({
//       name,
//       description,
//       image,
//       prefecture,
//       category,
//       status,
//       price,
//       userId,
//       country,
//       currency,
//     }).then(importAdSuccess, error => {
//       return handleError({error, onError});
//     });
//   };
// };

export {handleImportAd};
