import axios from 'axios';

export async function getData(date: string) {
  try {
    const req = await axios.get(`http://localhost:3333/api/v1/product/rcss/${date}`);
    return req.data.data;
  } catch (error) {
    throw new Error("Server error")
  }
}
