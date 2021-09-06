import {request} from './Request';
import Upload from 'react-native-background-upload';
import {apiRequest} from '../Constants/Api';
import {decrypt, encrypt} from './Encrypt';
import sha256 from 'crypto-js/sha256';
import {password as hashkey} from './Encrypt';

const getAds = async props => {
  const {userId} = props;
  const data = await request({
    endpoint: 'ads/get',
    method: 'POST',
    body: {
      userId,
      hash: sha256(`${userId}` + hashkey).toString(),
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

const getUserCreatedLotteries = async props => {
  const {userId} = props;
  const data = await request({
    endpoint: 'ads/myCreatedLotteries',
    method: 'POST',
    body: {
      userId,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const getUserLikedLotteries = async props => {
  const {userId} = props;
  const data = await request({
    endpoint: 'ads/myLikedLotteries',
    method: 'POST',
    body: {
      userId,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const likeLottery = async props => {
  const {userId, lotteryId} = props;
  const data = await request({
    endpoint: 'ads/likeLottery',
    method: 'POST',
    body: {
      userId: `${userId}`,
      lotteryId: `${lotteryId}`,
      hash: sha256(`${userId}` + `${lotteryId}` + hashkey).toString(),
    },
  });
  return data;
};

const dislikeLottery = async props => {
  const {userId, lotteryId} = props;
  const data = await request({
    endpoint: 'ads/dislikeLottery',
    method: 'POST',
    body: {
      userId: `${userId}`,
      lotteryId: `${lotteryId}`,
      hash: sha256(`${userId}` + `${lotteryId}` + hashkey).toString(),
    },
  });
  return data;
};

const getUserJoinedLotteries = async props => {
  const {userId} = props;
  const data = await request({
    endpoint: 'ads/myJoinedLotteries',
    method: 'POST',
    body: {
      userId,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const updateLotteryWithoutImage = async props => {
  const {
    prefecture,
    city,
    id,
    userId,
    price,
    condition,
    category,
    description,
    name,
  } = props;
  const data = await request({
    endpoint: 'ads/update/noImage',
    method: 'POST',
    body: {
      prefecture,
      city,
      price,
      condition,
      category,
      description,
      name,
      id,
      userId,
      hash: sha256(
        prefecture,
        city,
        id,
        userId,
        price,
        name,
        condition,
        category,
        description,
        hashkey,
      ).toString(),
    },
  });
  return data;
};

const addBackgroundUpload = async props => {
  const {
    name,
    description,
    image,
    category,
    prefecture,
    city,
    currency,
    condition,
    price,
    userId,
    country,
  } = props;
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
      condition,
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
          condition +
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
        let errorSubscriber, completedSubscriber, cancelledSubscriber;
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
          },
        );
        errorSubscriber = Upload.addListener('error', uploadId, data => {
          resolve({error: data});
          errorSubscriber.remove();
          completedSubscriber.remove();
          cancelledSubscriber.remove();
        });
      })
      .catch(err => {
        resolve({error: err});
      });
  });
};

const updateAdBackground = async props => {
  const {id, image} = props;

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
        let errorSubscriber, completedSubscriber, cancelledSubscriber;
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
          },
        );
        errorSubscriber = Upload.addListener('error', uploadId, data => {
          resolve({error: data});
          errorSubscriber.remove();
          completedSubscriber.remove();
          cancelledSubscriber.remove();
        });
      })
      .catch(err => {
        resolve({error: err});
      });
  });
};

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
      creditCardNumber: creditCardNumberEnc,
      creditCardCVC: creditCardCVCEnc,
      creditCardExpiryDate: creditCardExpiryDateEnc,
      creditCardType: creditCardTypeEnc,
    },
  });
  return data;
};

export {
  getAds,
  getMyAds,
  getUserCreatedLotteries,
  enterLottery,
  getUserJoinedLotteries,
  addBackgroundUpload,
  updateAdBackground,
  getUserLikedLotteries,
  likeLottery,
  dislikeLottery,
  updateLotteryWithoutImage,
};
