import { getJwtExpiration } from '../utils/token/tokenExpiryTimeUtils';
import { create } from 'zustand';

const initAccessToken = () => {
    var _a;
    if (typeof window === 'undefined') {
        return '';
    }
    return (_a = window.localStorage.getItem('accessToken')) !== null && _a !== void 0 ? _a : '';
};
const useTokenStore = create(set => ({
    accessToken: initAccessToken(),
    tokenExpiryTime: null,
    setAccessToken: accessToken => {
        const expiryTime = getJwtExpiration(accessToken);
        set({ accessToken, tokenExpiryTime: expiryTime });
    },
    isLoggedIn: false,
    setLogin: (state) => set({ isLoggedIn: state }),
}));
export default useTokenStore;