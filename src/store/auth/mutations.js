export function setUser(state, { user }) {
  state.user = user;
}

export function out(state) {
  state.user = null;
}
