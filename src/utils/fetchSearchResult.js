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

    const jsonResponse = await response.json();

    return jsonResponse.results.map(result => ({
      name: result.package.name,
      description: result.package.description,
      score: result.score,
      link: result.package.links.homepage
    }))
  } catch (e) {
    console.error(e)
  }
}