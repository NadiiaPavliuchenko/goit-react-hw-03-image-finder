import api from './api';

const API_KEY = '40312621-8bffe4628de16cbb05ae069a5';

const imageFinder = async (searchQuery, page) => {
  const { data } = await api(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};

export default imageFinder;
