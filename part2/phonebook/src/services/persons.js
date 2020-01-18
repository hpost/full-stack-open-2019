import axios from 'axios'

const baseUrl = 'https://morning-reef-28818.herokuapp.com/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newObject => axios.post(baseUrl, newObject).then(response => response.data)

const remove = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data)

const updateNumber = (id, updatedObject) => axios.put(`${baseUrl}/${id}`, updatedObject).then(response => response.data)

export default { getAll, create, remove, updateNumber }
