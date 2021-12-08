
import { makeSelector } from '../../../../src/index';

// Locale methods
export const selectModals = (state) => state.modals;
export const updateModals = (state, modals) => ({ ...state, modals });

// Selectors
const [useModals, selectorDefault] = makeSelector(selectModals);
const [useModal, selectorModal] = makeSelector((state) => state.modals[0]);
export { useModals, useModal };

// Slice
export const modals = {
  initialState: {
    modals: [],
  },
  selectors: [
    selectorDefault,
    selectorModal,
  ],
  actions: {
    closedModal: (state) => updateModals(state, state.modals.filter((_,i) => !!i)),
    shownModal: (state, action) => {
      const modal = [].find((m) => m.id === action.id);
      return !modal ? state : updateModals(state, [{ ...modal }, ...state.modals]);
    },
    shownError: (state, action) => {
      const modal = [].find((m) => m.id === 'error'),
            { error } = action;

      // Check error length, as API now returns errors wrapped in an array to support multiple errors
      return !error?.length > 0 || !modal ? state : updateModals(state, [{ ...modal, error }, ...state.modals]);
    },
  },
  methods: {
    shownError: (action, dispatch) => !!action.error && dispatch({ type: 'shownModal', id: 'error', error: action.error }),
  },
};
