const initialState = {
  isDrawerOpen: false,
};
const DrawerReducer = (state = initialState, action) => {
  if (action.type === "CHANGE_DRAWER") {
    return {
      isDrawerOpen: !state.isDrawerOpen,
    };
  }
  return state;
};
export default DrawerReducer;
