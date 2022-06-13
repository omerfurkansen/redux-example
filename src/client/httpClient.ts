import axios from 'axios';

import { OMDB_BASE_URI } from '../common/constants';

export default axios.create({
  baseURL: OMDB_BASE_URI,
});
