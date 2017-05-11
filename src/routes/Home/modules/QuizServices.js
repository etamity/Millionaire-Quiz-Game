// fetch questions from server
export function fetchQuestionsService() {
  const URL = '/data.json';
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}
// fetch answers from server
// in this sample, the answers already included inside questions data
// for demostration purpose, so just load it again
export function submitAnswersService() {
  // extract answers into 'answers.json' if you want seprate questions and answers
  const URL = '/data.json';
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}
