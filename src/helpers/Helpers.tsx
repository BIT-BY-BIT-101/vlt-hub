export const handleWindowRoute = (path: string) => {
  window.location.href = path;
};

export const isMenuItemActive = (path: string) => {
  return location.pathname === path;
};

export const textIndexToArray = (str: string) => {
  const string = str.trim().replace(/ +(?= )/g, "");
  let arr = [];
  for (let i = 0; i < string.trim().length; i++) {
    arr.push(string.substr(0, i + 1).toLowerCase());
  }
  return arr;
};

export function keywordsToArray(str: string) {
  console.log(str);

  // str.toLowerCase();
  const keywordsArray = str
    .toLowerCase()
    .split(",")
    .map((word) => word.trim());
  return keywordsArray;
}

export function arrayToString(arr: string[]): string {
  console.log(arr);

  if (!arr || !Array.isArray(arr)) {
    return "";
  }
  return arr.join(", ");
}

// export const keywordsToArray = (str: string) => {
//   str.toLowerCase();
//   const keywordsArray = str.split(",").map((word) => word.trim());
//   return keywordsArray;
// };

export const defaultImg =
  "https://ionicframework.com/docs/img/demos/thumbnail.svg";
