import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../providers';

const useStore = () => {
  const { storeName } = useContext(StoreContext);
  const [errorMsg, setErrorMsg] = useState('Loading...');

  useEffect(() => {
    if (!storeName) {
      setErrorMsg('Please select a store');
    }
  }, [storeName]);

  return { storeName, errorMsg, setErrorMsg };
};

export default useStore;
