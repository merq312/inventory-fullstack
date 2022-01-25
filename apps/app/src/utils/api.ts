import axios from 'axios';
import { PostItem } from '../features/InventoryInput/types';

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

export async function createNewStore(storeName: string, authToken: string) {
  try {
    const req = await axios.post(
      `${baseUrl}/api/v1/store/create-store/${storeName}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
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

export async function createNewMenuItem(
  newItemName: string,
  authToken: string
) {
  try {
    const req = await axios.post(
      `${baseUrl}/api/v1/menu`,
      {
        name: newItemName,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function addMenuItemToStore(
  storeName: string,
  itemName: string,
  price: number,
  authToken: string
) {
  try {
    const req = await axios.post(
      `${baseUrl}/api/v1/store/${storeName}`,
      {
        menuItemName: itemName,
        price: price,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function changeMenuItemName(
  oldName: string,
  newName: string,
  authToken: string
) {
  try {
    const req = await axios.patch(
      `${baseUrl}/api/v1/menu`,
      {
        oldName: oldName,
        newName: newName,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return req.data.data;
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function updateProductCounts(
  storeName: string,
  post: Array<PostItem>,
  date: string,
  authToken: string
) {
  try {
    await axios.patch(
      `${baseUrl}/api/v1/product/${storeName}/${date}`,
      {
        productData: post,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  } catch (error) {
    throw new Error('Server error');
  }
}

export async function retireStoreItem(
  storeName: string,
  menuItemName: string,
  retire: boolean,
  authToken: string
) {
  try {
    await axios.patch(
      `${baseUrl}/api/v1/store/${storeName}/retire-item`,
      {
        menuItemName: menuItemName,
        retire: retire,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  } catch (error) {
    throw new Error('Server error');
  }
}
