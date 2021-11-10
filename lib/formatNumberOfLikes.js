const formatedNumberOfLikes = numberOfLikes => {
  if (numberOfLikes >= 1000000) {
    return `${Number(numberOfLikes / 1000000).toFixed(1)}M`;
  } else if (numberOfLikes >= 1000) {
    return `${Number(numberOfLikes / 1000).toFixed(1)}K`;
  }
  return `${numberOfLikes}`;
};

export default formatedNumberOfLikes;
