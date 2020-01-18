import axios from 'axios'

const baseUrl = 'https://mysterious-refuge-93949.herokuapp.com/notes'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newObject => axios.post(baseUrl, newObject).then(response => response.data)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)

export default {
  getAll,
  create,
  update
}
