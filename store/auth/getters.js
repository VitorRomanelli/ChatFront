import moment from 'moment';

export default {
  authenticated(state) {
    const token = state.token;
    const validTo = state.expires;

    if (token !== '' && token !== null) {
      if (moment().isBefore(moment(validTo))) {
        return true
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
}
