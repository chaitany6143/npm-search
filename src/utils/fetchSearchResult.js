import {ROOT_URL, SEARCH_PATH} from './constants';

function getSearchUri(searchString) {
  const queryString = `?q=${searchString}`;

  return encodeURI(`${ROOT_URL}${SEARCH_PATH}${queryString}`)
}

export async function fetchSearchResult(searchString) {
  const source = getSearchUri(searchString);

  try {
    const response = await fetch(source, {
      crossDomain: true,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.json()
  } catch (e) {
    console.error(e)
  }
}