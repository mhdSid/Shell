import {request} from './Request';
import Upload from 'react-native-background-upload';
import {apiRequest} from '../Constants/Api';
import {decrypt, encrypt} from './Encrypt';
import sha256 from 'crypto-js/sha256';
import {password as hashkey} from './Encrypt';

const getAds = async () => {
  const data = await request({
    endpoint: 'ads/get',
    method: 'POST',
    body: {
      hash: sha256(hashkey).toString(),
    },
  });
  return data;
};

const getMyAds = async props => {
  const {userId} = props;
  const data = await request({
    endpoint: 'ads/myAds',
    method: 'POST',
    body: {
      userId,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const getMyLotteries = async props => {
  const {userId} = props;
  const data = await request({
    endpoint: 'ads/myLotteries',
    method: 'POST',
    body: {
      userId,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const getLotteries = async () => {
  const data = await request({
    endpoint: 'ads/lotteries',
    method: 'POST',
    body: {
      hash: sha256(hashkey).toString(),
    },
  });
  return data;
};

// const importAd = async props => {
//   const {
//     name,
//     description,
//     image,
//     category,
//     prefecture,
//     currency,
//     status,
//     price,
//     userId,
//     country,
//   } = props;
//   const formData = new FormData();
//   formData.append('name', name);
//   formData.append('description', description);
//   formData.append('image', image);
//   formData.append('category', category);
//   formData.append('prefecture', prefecture);
//   formData.append('currency', currency);
//   formData.append('status', status);
//   formData.append('price', price);
//   formData.append('userId', userId);
//   formData.append('country', country);
//   formData.append(
//     'hash',
//     sha256(
//       name +
//         description +
//         category +
//         prefecture +
//         currency +
//         status +
//         price +
//         userId +
//         country +
//         hashkey,
//     ).toString(),
//   );
//   const data = await request({
//     endpoint: 'ads/add',
//     method: 'POST',
//     body: formData,
//   });
//   return data;
// };

const addBackgroundUpload = async props => {
  const {
    name,
    description,
    image,
    category,
    prefecture,
    city,
    currency,
    status,
    price,
    userId,
    country,
    updateProgress,
  } = props;
  console.log(
    name,
    description,
    image,
    category,
    prefecture,
    city,
    currency,
    status,
    price,
    userId,
    country,
  );
  console.log(
    'hash: ',
    sha256(
      name +
        description +
        category +
        prefecture +
        city +
        currency +
        status +
        price +
        userId +
        country +
        hashkey,
    ).toString(),
  );
  const options = {
    url: `${apiRequest.apiUri}ads/add`,
    path: image.uri,
    method: 'POST',
    field: 'image',
    type: 'multipart',
    headers: {
      Accept: apiRequest.jsonContentType,
      'Content-Type': apiRequest.jsonContentType,
    },
    parameters: {
      name,
      description,
      category,
      prefecture,
      city,
      currency,
      status,
      price,
      userId,
      country,
      hash: sha256(
        name +
          description +
          category +
          prefecture +
          city +
          currency +
          status +
          price +
          userId +
          country +
          hashkey,
      ).toString(),
    },
  };
  return new Promise(resolve => {
    Upload.startUpload(options)
      .then(uploadId => {
        let progressSubscriber,
          errorSubscriber,
          completedSubscriber,
          cancelledSubscriber;
        progressSubscriber = Upload.addListener('progress', uploadId, data => {
          if (data.progress !== null && data.progress !== undefined) {
            updateProgress(Math.round(data.progress));
          }
          if (data.progress === 100) {
            progressSubscriber.remove();
          }
        });
        completedSubscriber = Upload.addListener(
          'completed',
          uploadId,
          data => {
            // data includes responseCode: number and responseBody: Object
            let response = {};
            if (data.responseBody) {
              response = decrypt(JSON.parse(data.responseBody).data, true);
            }
            resolve(response);
            errorSubscriber.remove();
            completedSubscriber.remove();
            cancelledSubscriber.remove();
            progressSubscriber.remove();
          },
        );
        cancelledSubscriber = Upload.addListener(
          'cancelled',
          uploadId,
          data => {
            resolve({error: data});
            errorSubscriber.remove();
            completedSubscriber.remove();
            cancelledSubscriber.remove();
            progressSubscriber.remove();
          },
        );
        errorSubscriber = Upload.addListener('error', uploadId, data => {
          resolve({error: data});
          errorSubscriber.remove();
          completedSubscriber.remove();
          cancelledSubscriber.remove();
          progressSubscriber.remove();
        });
      })
      .catch(err => {
        resolve({error: err});
      });
  });
};

const updateAdBackground = async props => {
  const {id, image, updateProgress} = props;

  const options = {
    url: `${apiRequest.apiUri}ads/update/v2`,
    path: image.uri,
    method: 'POST',
    field: 'image',
    type: 'multipart',
    headers: {
      Accept: apiRequest.jsonContentType,
      'Content-Type': apiRequest.jsonContentType,
    },
    parameters: {
      id,
      hash: sha256(id + hashkey).toString(),
    },
  };
  return new Promise(resolve => {
    Upload.startUpload(options)
      .then(uploadId => {
        let progressSubscriber,
          errorSubscriber,
          completedSubscriber,
          cancelledSubscriber;
        progressSubscriber = Upload.addListener('progress', uploadId, data => {
          if (data.progress !== null && data.progress !== undefined) {
            updateProgress(Math.round(data.progress));
          }
          if (data.progress === 100) {
            progressSubscriber.remove();
          }
        });
        completedSubscriber = Upload.addListener(
          'completed',
          uploadId,
          data => {
            // data includes responseCode: number and responseBody: Object
            let response = {};
            if (data.responseBody) {
              response = decrypt(JSON.parse(data.responseBody).data, true);
            }
            resolve(response);
            errorSubscriber.remove();
            completedSubscriber.remove();
            cancelledSubscriber.remove();
            progressSubscriber.remove();
          },
        );
        cancelledSubscriber = Upload.addListener(
          'cancelled',
          uploadId,
          data => {
            resolve({error: data});
            errorSubscriber.remove();
            completedSubscriber.remove();
            cancelledSubscriber.remove();
            progressSubscriber.remove();
          },
        );
        errorSubscriber = Upload.addListener('error', uploadId, data => {
          resolve({error: data});
          errorSubscriber.remove();
          completedSubscriber.remove();
          cancelledSubscriber.remove();
          progressSubscriber.remove();
        });
      })
      .catch(err => {
        resolve({error: err});
      });
  });
};

// const updateAd = async props => {
//   const {id, image} = props;
//   const formData = new FormData();
//   if (Array.isArray(image)) {
//     image.forEach(item => {
//       if (item && item.uri) {
//         formData.append('image', item);
//       }
//     });
//   }
//   formData.append('id', id);
//   formData.append('hash', sha256(id + hashkey).toString());
//   const data = await request({
//     endpoint: 'ads/update',
//     method: 'POST',
//     body: formData,
//   });
//   return data;
// };

const enterLottery = async props => {
  const {
    userId,
    adId,
    email,
    passwordHash,
    creditCardNumber,
    creditCardCVC,
    creditCardExpiryDate,
    creditCardType,
  } = props;
  const creditCardNumberEnc = encrypt(creditCardNumber);
  const creditCardCVCEnc = encrypt(creditCardCVC);
  const creditCardExpiryDateEnc = encrypt(creditCardExpiryDate);
  const creditCardTypeEnc = encrypt(creditCardType);

  const data = await request({
    endpoint: 'ads/enterLottery',
    method: 'POST',
    body: {
      userId,
      adId,
      email,
      passwordHash,
      hash: sha256(
        userId +
          adId +
          email +
          passwordHash +
          creditCardNumberEnc +
          creditCardCVCEnc +
          creditCardExpiryDateEnc +
          creditCardTypeEnc +
          hashkey,
      ).toString(),
      creditCardNumber: creditCardTypeEnc,
      creditCardCVC: creditCardCVCEnc,
      creditCardExpiryDate: creditCardExpiryDateEnc,
      creditCardType: creditCardTypeEnc,
    },
  });
  return data;
};

export {
  // importAd,
  getAds,
  getMyAds,
  getMyLotteries,
  // updateAd,
  enterLottery,
  getLotteries,
  addBackgroundUpload,
  updateAdBackground,
};
