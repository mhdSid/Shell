import {request} from './request';

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

export {importAd, getAds, getMyAds, getMyLotteries, updateAd};
