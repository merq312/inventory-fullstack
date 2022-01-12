import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../providers';

const useStore = () => {
  const { storeName } = useContext(StoreContext);
  const [errorMsg, setErrorMsg] = useState('Loading...');

  useEffect(() => {
    if (!storeName) {
      setErrorMsg('__store');
    }
  }, [storeName]);

  return { storeName, errorMsg, setErrorMsg };
};

export default useStore;
