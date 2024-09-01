export const handleWindowRoute = (path: string) => {
  window.location.href = path;
};

export const isMenuItemActive = (path: string) => {
  return location.pathname === path;
};
