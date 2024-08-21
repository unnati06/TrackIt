import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://trackit-wme6.onrender.com/api/v1',
});

export default customFetch;
