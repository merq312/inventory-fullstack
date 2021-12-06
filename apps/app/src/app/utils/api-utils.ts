import axios from 'axios';
import { PostItem } from '../pages/inventory-input';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : 'https://mighty-atoll-05391.herokuapp.com';

export async function getProductData(date: string) {
  try {
    const req = await axios.get(`${baseUrl}/api/v1/product/rcss/${date}`);
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function getAllStoresWithMenu() {
  try {
    const req = await axios.get(`${baseUrl}/api/v1/store/all-stores-with-menu`);
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function getAllMenuItems() {
  try {
    const req = await axios.get(`${baseUrl}/api/v1/menu/all-menu-items`);
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function createNewMenuItem(newItemName: string) {
  try {
    const req = await axios.post(`${baseUrl}/api/v1/menu`, {
      name: newItemName,
    });
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function addMenuItemToStore(itemName: string, price: number) {
  try {
    const req = await axios.post(`${baseUrl}/api/v1/store/rcss`, {
      menuItemName: itemName,
      price: price,
    });
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function updateProductCounts(post: Array<PostItem>, date: string) {
  try {
    await axios.patch(`${baseUrl}/api/v1/product/rcss/${date}`, {
      productData: post,
    });
  } catch (error) {
    throw new Error('Server error');
  }
}
