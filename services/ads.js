// import {apiRequest} from '../Constants/Api';
import {request} from './Request';
import Upload from 'react-native-background-upload';
import {apiRequest} from '../Constants/Api';
import CryptoJS from 'crypto-js';
import {decrypt, password} from './Encrypt';
// import {decrypt, password} from './Encrypt';
// import CryptoJS from 'crypto-js';

const getAds = async () => {
  const data = await request({
    endpoint: 'ads/get',
    method: 'GET',
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
    },
  });
  return data;
};

const getLotteries = async () => {
  const data = await request({
    endpoint: 'ads/lotteries',
    method: 'POST',
  });
  return data;
};

// const importAd = props => {
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
//   console.log(image);
//   // const formData = new FormData();
//   // formData.append('name', name);
//   // formData.append('description', description);
//   // formData.append('image', image);
//   // formData.append('category', category);
//   // formData.append('prefecture', prefecture);
//   // formData.append('currency', currency);
//   // formData.append('status', status);
//   // formData.append('price', price);
//   // formData.append('userId', userId);
//   // formData.append('country', country);
//   // const data = await request({
//   //   endpoint: 'ads/add',
//   //   method: 'POST',
//   //   body: {
//   //     name,
//   //     description,
//   //     category,
//   //     prefecture,
//   //     currency,
//   //     status,
//   //     price,
//   //     userId,
//   //     country,
//   //   },
//   // });
//   // return data;
//   const options = {
//     headers: {
//       Accept: 'application/json',
//     },
//     url: `${apiRequest.apiUri}${'ads/add'}`,
//     path: image.uri,
//     method: 'POST',
//     field: 'file',
//     type: 'multipart',
//     parameters: {
//       name,
//       description,
//       category,
//       prefecture,
//       currency,
//       status,
//       price,
//       userId,
//       country,
//     },
//   };
//   return new Promise((resolve, reject) => {
//     return Upload.startUpload(options).then(uploadId => {
//       Upload.addListener('error', uploadId, data => {
//         console.log('ErrorErrorError: ', data);
//         reject(data);
//       });
//       Upload.addListener('cancelled', uploadId, data => {
//         console.log('CancelledCancelledCancelledCancelled: ', data);
//         reject(data);
//       });
//       Upload.addListener('completed', uploadId, data => {
//         // // data includes responseCode: number and responseBody: Object
//         // console.log('Completed!');
//         console.log('completedcompletedcompletedcompleted: ', data);
//         if (data) {
//           const {responseBody} = data;
//           let response = JSON.parse(responseBody);
//           console.log('responseresponseresponseresponseresponse: ', response);
//           if (response.data || response.error || response.user) {
//             response = decrypt(
//               response.data || response.error || response.user,
//               password,
//             );
//             response = JSON.parse(response.toString(CryptoJS.enc.Utf8));
//             console.log('responseresponseresponseresponseresponse: ', response);
//             if (response.error) {
//               reject(response);
//             }
//             if (response && Object.keys(response).length > 0) {
//               resolve(response);
//             }
//           }
//           resolve(response);
//         }
//       });
//     });
//   });
// };

const importAd = async props => {
  const {
    name,
    description,
    image,
    category,
    prefecture,
    currency,
    status,
    price,
    userId,
    country,
  } = props;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('image', image);
  formData.append('category', category);
  formData.append('prefecture', prefecture);
  formData.append('currency', currency);
  formData.append('status', status);
  formData.append('price', price);
  formData.append('userId', userId);
  formData.append('country', country);
  const data = await request({
    endpoint: 'ads/add',
    method: 'POST',
    body: formData,
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
    currency,
    status,
    price,
    userId,
    country,
    updateProgress,
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
      currency,
      status,
      price,
      userId,
      country,
    },
  };
  console.log(options);
  return new Promise(resolve => {
    Upload.startUpload(options)
      .then(uploadId => {
        console.log('Upload started');
        let progressSubscriber,
          errorSubscriber,
          completedSubscriber,
          cancelledSubscriber;
        progressSubscriber = Upload.addListener('progress', uploadId, data => {
          console.log(`Progress: ${data.progress}%`);
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
            updateProgress(100);
            // data includes responseCode: number and responseBody: Object
            let response = {};
            if (data.responseBody) {
              response = decrypt(JSON.parse(data.responseBody).data, password);
              response = JSON.parse(response.toString(CryptoJS.enc.Utf8));
            }
            console.log('Completed!', data, response);
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
            console.log('Cancelled!');
            resolve({error: data});
            errorSubscriber.remove();
            completedSubscriber.remove();
            cancelledSubscriber.remove();
            progressSubscriber.remove();
          },
        );
        errorSubscriber = Upload.addListener('error', uploadId, data => {
          console.log(`Error: ${data.error}%`);
          resolve({error: data});
          errorSubscriber.remove();
          completedSubscriber.remove();
          cancelledSubscriber.remove();
          progressSubscriber.remove();
        });
      })
      .catch(err => {
        console.log('Upload error!', err);
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
    },
  };
  console.log(options);
  return new Promise(resolve => {
    return Upload.startUpload(options)
      .then(uploadId => {
        console.log('Upload started');
        let progressSubscriber,
          errorSubscriber,
          completedSubscriber,
          cancelledSubscriber;
        progressSubscriber = Upload.addListener('progress', uploadId, data => {
          console.log(`Progress: ${data.progress}%`);
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
            updateProgress(100);
            // data includes responseCode: number and responseBody: Object
            let response = {};
            if (data.responseBody) {
              response = decrypt(JSON.parse(data.responseBody).data, password);
              response = JSON.parse(response.toString(CryptoJS.enc.Utf8));
            }
            console.log('Completed!', data, response);
            console.log(
              'completedSubscriber: ',
              completedSubscriber.remove,
              progressSubscriber.remove,
              errorSubscriber.remove,
              cancelledSubscriber.remove,
            );
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
            console.log('Cancelled!');
            resolve({error: data});
            errorSubscriber.remove();
            completedSubscriber.remove();
            cancelledSubscriber.remove();
            progressSubscriber.remove();
          },
        );
        errorSubscriber = Upload.addListener('error', uploadId, data => {
          console.log(`Error: ${data.error}%`);
          resolve({error: data});
          errorSubscriber.remove();
          completedSubscriber.remove();
          cancelledSubscriber.remove();
          progressSubscriber.remove();
        });
      })
      .catch(err => {
        console.log('Upload error!', err);
        resolve({error: err});
      });
  });
};

// const updateAd = props => {
//   const {id, image} = props;
//   const options = {
//     headers: {
//       Accept: 'application/json',
//     },
//     url: `${apiRequest.apiUri}${'ads/update'}`,
//     path: image.uri,
//     method: 'POST',
//     field: 'file',
//     type: 'multipart',
//     parameters: {
//       id,
//     },
//   };
//   return new Promise((resolve, reject) => {
//     return Upload.startUpload(options).then(uploadId => {
//       // Upload.addListener('progress', uploadId, data => {
//       //   console.log(`Progress: ${data.progress}%`);
//       // });
//       Upload.addListener('error', uploadId, data => {
//         console.log('ErrorErrorError: ', data);
//         reject(data);
//       });
//       Upload.addListener('cancelled', uploadId, data => {
//         console.log('CancelledCancelledCancelledCancelled: ', data);
//         reject(data);
//       });
//       Upload.addListener('completed', uploadId, data => {
//         // // data includes responseCode: number and responseBody: Object
//         // console.log('Completed!');
//         console.log('completedcompletedcompletedcompleted: ', data);
//         if (data) {
//           const {responseBody} = data;
//           let response;
//           if (responseBody.data || responseBody.error || responseBody.user) {
//             response = decrypt(
//               responseBody.data || responseBody.error || responseBody.user,
//               password,
//             );
//             response = JSON.parse(response.toString(CryptoJS.enc.Utf8));
//             if (response.error) {
//               reject(response);
//             }
//             if (response && Object.keys(response).length > 0) {
//               resolve(response);
//             }
//           }
//           resolve(response);
//         }
//       });
//     });
//   });
//   // const formData = new FormData();
//   // if (Array.isArray(image)) {
//   //   image.forEach(item => {
//   //     if (item && item.uri) {
//   //       formData.append('image', item);
//   //     }
//   //   });
//   // }
//   // formData.append('id', id);
//   // const data = await request({
//   //   endpoint: 'ads/update',
//   //   method: 'POST',
//   //   body: formData,
//   // });
//   // return data;
// };

const updateAd = async props => {
  const {id, image} = props;
  const formData = new FormData();
  if (Array.isArray(image)) {
    image.forEach(item => {
      if (item && item.uri) {
        formData.append('image', item);
      }
    });
  }
  formData.append('id', id);
  const data = await request({
    endpoint: 'ads/update',
    method: 'POST',
    body: formData,
  });
  return data;
};

const enterLottery = async props => {
  const {userId, adId, email, password} = props;
  const data = await request({
    endpoint: 'ads/enterLottery',
    method: 'POST',
    body: {
      userId,
      adId,
      email,
      password,
    },
  });
  return data;
};

export {
  importAd,
  getAds,
  getMyAds,
  getMyLotteries,
  updateAd,
  enterLottery,
  getLotteries,
  addBackgroundUpload,
  updateAdBackground,
};
