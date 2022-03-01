import React, { createContext, useContext, useReducer, useCallback, useRef, useMemo } from 'react'
// import { useRouter } from 'next/router';


// Utils
const caps = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const unCaps = (str) => str.charAt(0).toLowerCase() + str.slice(1);


// Makes a re-nameable context provider and hook for accessing its value
export const makeContext = () => {
  const context = createContext();
  return [context.Provider, () => useContext(context)];
};


// Makes a re-nameable selector object and access hook
export const makeSelector = (func = () => undefined) => {
  const [Provider, useValue] = makeContext();
  const useSelector = (state) => func(state);
  return [{ Provider, useValue, useSelector }, useValue];
};


// Makes a set of named selectors out of an object using functions by key
// The "useValues" access hooks are returned in an object for named exporting
export const makeSelectors = (funcs = {}) => {
  const selectors = {},
        useValues = {};
  Object.entries(funcs).forEach(([key, func]) => {
    const [selector, useValue] = makeSelector(func);
    selectors[key] = selector;
    useValues[`use${caps(key)}`] = useValue;
  });
  return [selectors, useValues];
};


// Makes a selector and access hook for every key in an object recursively
export const makeObjectSelectors = (object, funcs = {}, parents = []) => {
  Object.entries(object).forEach(([key, val]) => {
    const keys = [...parents, key],
          keyStr = unCaps(keys.map((k) => caps(k)).join(''));
    funcs[keyStr] = (state) => keys.reduce((obj, k) => obj[k], state);
    if (val instanceof Object && !Array.isArray(val)) makeObjectSelectors(val, funcs, keys);
  });
  if (!parents.length) return makeSelectors(funcs);
};


// Makes a computed selector whose return value only updates when its selector dependencies do
export const makeComputedSelector = (
  deps = [/* useValue1, useValue2, ... */],
  func = (/* value1, value2, ... */) => undefined,
  base = undefined,
) => {
  const [Provider, useValue] = makeContext();
  const useSelector = () => {
    const argsOld = useRef([]); // Arg values previous render
    const argsNow = deps.map((d) => d()); // Arg values this render
    const args = useMemo(() => { // Arg values stable array
      var update = false; // Should update?
      update = update || argsOld.current.length !== argsNow.length; // Yes if first run and has args
      argsOld.current.forEach((arg, i) => { update = update || argsNow[i] !== arg; }); // Yes if any arg values changed
      if (update) { argsOld.current = argsNow; } // Commit updated args
      return argsOld.current; // Return old or new args
    }, [argsNow, argsOld]);
    return useMemo(() => func(...args) || base, [args, base]); // Recalculate value when args change
  };
  return [{ Provider, useValue, useSelector, deps }, useValue];
};


// Makes a set of named computed selectors out of an object using functions by key
export const makeComputedSelectors = (comps = {}) => {
  const selectors = {},
        useValues = {};
  Object.entries(comps).forEach(([key, comp = []]) => {
    const [selector, useValue] = makeComputedSelector(...comp);
    selectors[key] = selector;
    useValues[`use${caps(key)}`] = useValue;
  });
  return [selectors, useValues];
};


// Makes a slice of state for scoping larger projects
export const makeSlice = (conf = {}) => {
  
  const {
    initialState = {},
    actions = {},
    methods = {},
    selectors = {},
    computed = {},
  } = conf;

  const [stateSelectors, stateSelectorHooks] = makeObjectSelectors(initialState); // Default selectors based on initial state
  const [sliceSelectors, sliceSelectorHooks] = makeSelectors(selectors); // Additional selectors defined manually
  const [computedSelectors, computedSelectorHooks] = makeComputedSelectors(computed); // Computed selectors defined manually

  const slice = {
    initialState,
    actions,
    methods,
    selectors: {...stateSelectors, ...sliceSelectors, ...computedSelectors},
  };

  return { ...slice, ...stateSelectorHooks, ...sliceSelectorHooks, ...computedSelectorHooks };
};


// Makes a store out of slices, and/or a root slice if slice options (initialState etc) are passed
// Returns a Provider component, access hooks for root state and dispatch plus any rootSlice selectors
export const makeStore = (conf = {}) => {

  // Core contexts
  const [ProviderStore, useStore] = makeContext(); // Inefficient to sub to this directly but handy for logging during dev
  const [ProviderDispatch, useDispatch] = makeContext();
  // const [ProviderMethod, useMethod] = makeContext();

  // Default slice, if provided (for making a store without slices)
  const rootSlice = makeSlice(conf);

  // Combine all slices into one slice for combined conf
  const { initialState, actions, methods, selectors  } = mergeSlices([rootSlice, ...(conf.slices || [])]);
  
  // Sort selectors into an array for outputting providers
  const selectorsArray = mapSelectors(selectors);

  // Provider(s)
  const StoreProvider = ({
    children,
    initialState: providerState = {},
    mergeStates = (initial, provided) => ({ ...initial, ...provided }),
    methodRefs = {},
  }) => {
    const [state, _dispatch] = useActionsReducer(actions, mergeStates(initialState, providerState));
    const computed = {};
    const dispatch = useMethodicDispatch(methods, _dispatch, { ...methodRefs, state, computed });

    const providers = [
      [ProviderStore, () => state],
      ...selectorsArray.map((s) => [s.Provider, s.useSelector, !!s.deps && s.key]),
      [ProviderDispatch, () => dispatch],
    ];

    return <Providers {...{ providers, state, computed }}>{ children }</Providers>;
  };


  return {
    ...rootSlice,
    StoreProvider,
    useStore,
    useDispatch,
    // useMethod,
  };
};


// Renders a nest of Provider components which extract their values from state using a selector function
export const Providers = ({ providers, children, state, computed }) => {
  const [[Provider, useSelector = () => undefined, computedKey] = []] = providers || [],
        value = useSelector(state);
  if (computedKey) { computed[computedKey] = value; }
  return !Provider ? children : (
    <Provider {...{ value }}>
      <Providers providers={providers.filter((_,i) => !!i)} {...{ state, computed }}>{ children }</Providers>
    </Provider>
  );
};


// Merges slices, not scoped by default but intuitive to do so in slice config by nesting your initial state value
export const mergeSlices = (slices = []) => {
  var initialState = {},
      actions = {},
      methods = {},
      selectors = {};
  slices.forEach((s) => {
    initialState = { ...initialState, ...(s.initialState || {}) };
    actions = { ...actions, ...(s.actions || {}) };
    methods = { ...methods, ...(s.methods || {}) };
    selectors = { ...selectors, ...(s.selectors || []) };
  });
  return { initialState, actions, methods, selectors };
};


// Maps named selectors object onto an array sorted by computed selector dependency requirements
const mapSelectors = (selectors) => {
  const selectorsArray = Object.entries(selectors).map(([key, selector]) => {
    selector.key = key;
    if (Array.isArray(selector.deps)) {
      selector.deps.forEach((dep, i) => {
        if (typeof dep === 'string' && selectors[dep]) selector.deps[i] = selectors[dep].useValue;
      });
    }
    return selector;
  });

  const checkDeps = (selector, _finding) => { // Check there are no circular references in the computed selectors
    const finding = _finding || selector;
    const depSelectors = selectorsArray.filter((s) => selector.deps?.includes(s.useValue));
    if (depSelectors.includes(finding)) console.error(`Context store: ${finding.key} and ${selector.key} computed selectors form a circular dependency`);
    else depSelectors.forEach((s) => checkDeps(s, finding));
  };
  selectorsArray.forEach((s) => !!s.deps && checkDeps(s));

  return selectorsArray.sort((a, b) => {
    if (!a.deps && !b.deps) return 0;
    if (!a.deps) return -1;
    if (!b.deps) return 1;
    const [aDepsOnB, bDepsOnA] = [[a,b],[b,a]].map(([c,d]) => c.deps.includes(d.useValue));
    if (!aDepsOnB && bDepsOnA) return -1;
    if (!bDepsOnA && aDepsOnB) return 1;
    return 0;
  });
};



// Makes a React stateful reducer based on simple actions and initialState objects
export const useActionsReducer = (actions = {}, initialState) => {
  const reducer = useCallback((state, action) => !!actions[action.type]
    ? actions[action.type](state, action)
    : console.error('Unknown dispatch:', action) || state
  , [actions]);
  return useReducer(reducer, initialState);
};


// Extends reducer dispatch with methods
export const useMethodicDispatch = (methods = {}, dispatch, refs) => {
  const ref = useRef();
  ref.current = refs;
  return useCallback((a) => {
    const action = a.type ? a : { type: a };
    return !!methods[action.type] ? methods[action.type](dispatch, action, ref) : dispatch(action);
  }, [methods, dispatch, ref]);
};
