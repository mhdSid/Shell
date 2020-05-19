import {importAd, updateAd} from '../../services/Ads';
import {handleError, adActions} from './actions';
import invoke from 'lodash/invoke';
import {adDetailsActions} from '../AdDetails/actions';

const handleImportAd = payload => {
  return dispatch => {
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
    const onUpdateAdSuccess = newAd => {
      return data => {
        const {error, updatedAd} = data;
        if (error) {
          return handleError(error);
        }
        const newUpdatedAd = {
          ...newAd,
          images: [...(newAd.images || []), ...(updatedAd.images || [])],
        };
        dispatch({
          type: adActions.UPDATECURRENTAD,
          payload: newUpdatedAd,
        });
        return dispatch({
          type: adDetailsActions.SHOWADDETAILS,
          payload: newUpdatedAd,
        });
      };
    };
    const importAdSuccess = data => {
      const {error, newAd} = data;
      invoke(payload, 'onSuccess');
      if (error || !newAd) {
        return handleError(error);
      }
      dispatch({
        type: adActions.IMPORTAD,
        payload: newAd,
      });
      dispatch({
        type: adDetailsActions.SHOWADDETAILS,
        payload: newAd,
      });
      const newImages = imageFiles.filter(Boolean);
      return updateAd({
        id: newAd.id,
        image: newImages.slice(1, newImages.length),
      }).then(onUpdateAdSuccess(newAd), reason => {
        return handleError({error: reason, onError});
      });
    };
    return importAd({
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
    }).then(importAdSuccess, error => {
      return handleError({error, onError});
    });
  };
};

export {handleImportAd};
