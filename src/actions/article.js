import axios from 'axios'

export const getArticle = (period) => {
  const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=FceDBc1X9OdDeEsxW3w5XS32hn3YlZ4X`
  return axios
    .get(url)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}
