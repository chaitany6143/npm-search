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
      links: result.package.links
    })).sort((a, b) => b.score.final - a.score.final)
  } catch (e) {
    console.error(e)
  }
}