import {importAd, updateAd} from '../../services/Ads';
import {handleError, adActions} from './actions';
import invoke from 'lodash/invoke';
import {adDetailsActions} from '../AdDetails/actions';
import {uploadProgressActions} from '../UploadProgress/actions';
import uniq from 'lodash/uniq';

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
    const onUpdateAdSuccess = newAd => {
      return data => {
        const {error, updatedAd} = data;
        if (error) {
          return handleError(error);
        }
        const newUpdatedAd = {
          ...newAd,
          images: uniq([...(newAd.images || []), ...(updatedAd.images || [])]),
        };
        dispatch({
          type: adActions.UPDATECURRENTAD,
          payload: newUpdatedAd,
        });
        dispatch({
          type: uploadProgressActions.REMOVEPROGRESSITEM,
          payload: uniqId,
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
      if (imageFiles && imageFiles.length > 1) {
        const newImages = imageFiles.filter(Boolean).slice(1, newImages.length);
        return updateAd({
          id: newAd.id,
          image: newImages,
        }).then(onUpdateAdSuccess(newAd), reason => {
          return handleError({error: reason, onError});
        });
      }
      return dispatch({
        type: uploadProgressActions.REMOVEPROGRESSITEM,
        payload: uniqId,
      });
    };
    dispatch({
      type: uploadProgressActions.ADDNEWPROGRESSITEM,
      payload: uniqId,
    });
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
