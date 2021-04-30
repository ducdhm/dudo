import { createBrowserHistory } from 'history';
import { BASE_NAME } from './constants';

export default createBrowserHistory({
    basename: BASE_NAME,
});
