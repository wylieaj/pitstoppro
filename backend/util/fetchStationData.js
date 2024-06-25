const fetchStationData = async (dbBrands) => {
  let urls = [];
  let data = [];
  urls = dbBrands.map((el) => {
    return [...urls, el.url];
  });

  for (let index = 0; index < urls.length; index++) {
    const response = await fetch(urls[index]);
    const resData = await response.json();
    data = [...data, resData];
  }
  return data;
};

module.exports = fetchStationData;
