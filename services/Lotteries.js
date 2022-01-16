import {request} from './Request';
import Upload from 'react-native-background-upload';
import {apiRequest} from '../Constants/Api';
import {decrypt, encrypt} from './Encrypt';
import sha256 from 'crypto-js/sha256';
import {password as hashkey} from './Encrypt';

const getAds = async props => {
  const {pageToken, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/getLotteries',
    method: 'POST',
    cancelTag,
    body: {
      pageToken,
      hash: sha256(`${pageToken}` + hashkey).toString(),
    },
  });
  return data;
};

const getMyLotteries = async props => {
  const {userId, pageToken, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/myLotteries',
    method: 'POST',
    cancelTag,
    body: {
      userId,
      pageToken,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const cancelLottery = async props => {
  const {userId, lotteryId, reAdd, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/cancelLottery',
    method: 'POST',
    cancelTag,
    body: {
      userId,
      lotteryId,
      reAdd,
      hash: sha256(`${userId}` + `${lotteryId}` + reAdd + hashkey).toString(),
    },
  });
  return data;
};

const getUserCreatedLotteries = async props => {
  const {userId, pageToken, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/myCreatedLotteries',
    method: 'POST',
    cancelTag,
    body: {
      userId,
      pageToken,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const getUserLikedLotteries = async props => {
  const {userId, pageToken, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/myLikedLotteries',
    method: 'POST',
    cancelTag,
    body: {
      userId,
      pageToken,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const likeLottery = async props => {
  const {userId, lotteryId, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/likeLottery',
    method: 'POST',
    cancelTag,
    body: {
      userId: `${userId}`,
      lotteryId: `${lotteryId}`,
      hash: sha256(`${userId}` + `${lotteryId}` + hashkey).toString(),
    },
  });
  return data;
};

const dislikeLottery = async props => {
  const {userId, lotteryId, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/dislikeLottery',
    cancelTag,
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
  const {userId, pageToken, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/myJoinedLotteries',
    method: 'POST',
    cancelTag,
    body: {
      userId,
      pageToken,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const getUserWonLotteries = async props => {
  const {userId, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/myWonLotteries',
    method: 'POST',
    cancelTag,
    body: {
      userId,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const getChattableLotteries = async props => {
  const {userId, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/myChattableLotteries',
    method: 'POST',
    cancelTag,
    body: {
      userId,
      hash: sha256(userId + hashkey).toString(),
    },
  });
  return data;
};

const markLotteryAsReceived = async props => {
  const {lotteryId, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/markLotteryAsReceived',
    method: 'POST',
    cancelTag,
    body: {
      lotteryId,
      hash: sha256(lotteryId + hashkey).toString(),
    },
  });
  return data;
};

const markLotteryAsShipped = async props => {
  const {lotteryId, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/markLotteryAsShipped',
    method: 'POST',
    cancelTag,
    body: {
      lotteryId,
      hash: sha256(lotteryId + hashkey).toString(),
    },
  });
  return data;
};

const getUserCreatedWonLotteries = async props => {
  const {userId, cancelTag} = props;
  const data = await request({
    endpoint: 'api/ads/myCreatedWonLotteries',
    method: 'POST',
    cancelTag,
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
    endpoint: 'api/ads/update/noImage',
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
    url: `${apiRequest.apiUri}api/ads/addLottery`,
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
              response = JSON.parse(data.responseBody).data;
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
    url: `${apiRequest.apiUri}api/ads/update`,
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
              response = JSON.parse(data.responseBody).data;
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
    endpoint: 'api/ads/enterLottery',
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

const search = async props => {
  const {searchFilters, pageToken} = props;
  const searchText = searchFilters.searchText ? searchFilters.searchText : '';
  const fromDate = searchFilters.fromDate
    ? `${new Date(searchFilters.fromDate)}`
    : '';
  const toDate = searchFilters.toDate
    ? `${new Date(searchFilters.toDate)}`
    : '';
  const city = searchFilters.city || '';
  const prefecture = searchFilters.prefecture || '';
  const category = searchFilters.category || '';
  const condition = searchFilters.condition || '';
  const data = await request({
    endpoint: 'api/ads/search',
    method: 'POST',
    body: {
      searchText,
      fromDate,
      toDate,
      city,
      prefecture,
      category,
      condition,
      // pageToken,
      hash: sha256(
        searchText +
          fromDate +
          toDate +
          prefecture +
          city +
          category +
          condition +
          hashkey,
      ).toString(),
    },
  });
  return data;
};

export {
  search,
  getAds,
  getMyLotteries,
  getUserCreatedLotteries,
  enterLottery,
  getUserJoinedLotteries,
  addBackgroundUpload,
  updateAdBackground,
  getUserLikedLotteries,
  likeLottery,
  dislikeLottery,
  updateLotteryWithoutImage,
  getUserWonLotteries,
  getUserCreatedWonLotteries,
  markLotteryAsReceived,
  markLotteryAsShipped,
  getChattableLotteries,
  cancelLottery,
};
