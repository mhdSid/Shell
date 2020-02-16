import {request} from './request';

const getAds = async () => {
  const data = await request({
    endpoint: 'ads/get',
    method: 'GET',
  });

  return data;
};

const importAd = async props => {
  const {
    name,
    description,
    image,
    category,
    perfecture,
    currency,
    status,
    price,
    userId,
    country,
  } = props;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);

  if (Array.isArray(image)) {
    image.forEach(item => {
      formData.append('image', item);
    });
  }

  formData.append('category', category);
  formData.append('perfecture', perfecture);
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

export {importAd, getAds};
