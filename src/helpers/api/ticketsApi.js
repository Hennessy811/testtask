import {axios} from './config';

export const getSearchId = async () => {
  try {
    const {data: {searchId}} = await axios.get('/search');
    return searchId;
  } catch (e) {
    console.log(e)
  }
}

export const getTickets = async (searchId) => {
  try {
    const {data} = await axios.get(`/tickets`, {
        params: {
          searchId
        }
      }
    );
    return data;
  } catch (e) {
    console.log(e)
  }
}