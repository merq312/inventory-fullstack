import axios from 'axios';

export async function getData(date: string) {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'https://mighty-atoll-05391.herokuapp.com';
    const req = await axios.get(`${baseUrl}/api/v1/product/rcss/${date}`);
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}
