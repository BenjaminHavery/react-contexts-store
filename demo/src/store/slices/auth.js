
import { makeSelector } from '../../../../src/index';


// Locale methods
export const selectAuth = (state) => state.auth;
export const updateAuth = (state, auth) => ({ ...state, auth: { ...state.auth, ...auth } });


// Reducer
export const auth = {
  initialState: {
    auth: {
      loading: false,
      token: false,
      user: {},
    },
  },
  actions: {
    requestedAuth: (state) => updateAuth(state, { loading: true }),
    receivedUser: (state, action) => updateAuth(state, {
      loading: false,
      user: action.data.user || false,
    }),
  },
  methods: {
    whoAmI: (action, dispatch) => {
      dispatch('requestedAuth');
      const { state: { auth: { token }}} = action;
      var data = {}, error;
      fetch(`/api/user/whoami`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token } })
        .then((response) => response.json())
        .then((d) => { data = d; })
        .catch((e) => { error = e; })
        .finally(() => {
          dispatch({ type: 'receivedUser', data });
          dispatch({ type: 'shownError', error: error || data.error });
        });
    },
  },
};


// Selectors
const [useAuth, selectorDefault] = makeSelector(selectAuth);
const [useAuthLoading, selectorAuthLoading] = makeSelector((state) => state.auth.loading);
const [useAuthRole, selectorAuthRole] = makeSelector((state) => state.auth.user.role);


auth.selectors = [
  selectorDefault,
  selectorAuthLoading,
  selectorAuthRole,
];

export { useAuth, useAuthLoading, useAuthRole };
