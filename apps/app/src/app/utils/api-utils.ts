import axios from 'axios';
import { PostItem } from '../pages/inventory-input';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : 'https://bentosushi.herokuapp.com';

export async function getProductData(storeName: string, date: string) {
  try {
    const req = await axios.get(
      `${baseUrl}/api/v1/product/${storeName}/${date}`
    );
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function getAllStores() {
  try {
    const req = await axios.get(`${baseUrl}/api/v1/store/all-stores`);
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

export async function addMenuItemToStore(
  storeName: string,
  itemName: string,
  price: number
) {
  try {
    const req = await axios.post(`${baseUrl}/api/v1/store/${storeName}`, {
      menuItemName: itemName,
      price: price,
    });
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function changeMenuItemName(oldName: string, newName: string) {
  try {
    const req = await axios.patch(`${baseUrl}/api/v1/menu`, {
      oldName: oldName,
      newName: newName,
    });
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function updateProductCounts(
  storeName: string,
  post: Array<PostItem>,
  date: string
) {
  try {
    await axios.patch(`${baseUrl}/api/v1/product/${storeName}/${date}`, {
      productData: post,
    });
  } catch (error) {
    throw new Error('Server error');
  }
}
