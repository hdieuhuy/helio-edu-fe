import { useLocation } from 'react-router-dom';

const useCheckPathName = () => {
  const location = useLocation();
  const pathname = location?.pathname;

  const listOnlyLogoPath = ['/signin', '/signup', '/forgot'];

  return listOnlyLogoPath?.includes(pathname);
};

export default useCheckPathName;
