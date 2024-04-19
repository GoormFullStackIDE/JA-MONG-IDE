import { fetchUserInfo } from '../../api/user/fetchUserInfo';
import useTokenStore from '../../store/useTokenStore';

export const reloadTokenSetting = (storedAccessToken) => {
    if (storedAccessToken) {
        useTokenStore.getState().setAccessToken(storedAccessToken);
        useTokenStore.getState().setLogin(true);
        fetchUserInfo();
    }
};