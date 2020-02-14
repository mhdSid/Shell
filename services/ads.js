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
    // email,
    // password,
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
  // formData.append('file', {
  //   ...image[0],
  // });
  formData.append('image', {
    ...image[0],
  });
  // formData.append('file', {
  //   ...image[0],
  // });
  formData.append('category', category);
  formData.append('perfecture', perfecture);
  formData.append('currency', currency);
  formData.append('status', status);
  formData.append('price', price);
  formData.append('userId', userId);
  formData.append('country', country);
  console.log(formData);
  console.log(formData.getParts());

  const data = await request({
    endpoint: 'ads/add',
    method: 'POST',
    body: formData,
    /*{
      name,
      description,
      image,
      currency,
      category,
      perfecture,
      status,
      price,
      userId,
      country,
    },*/
  });

  return data;
};

export {importAd, getAds};
