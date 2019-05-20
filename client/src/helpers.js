export const getUniqueObjectsFromArray = (arr, key) => {
  const unique = arr
    .map(e => e[key])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
};

export const deleteItemFromArray = (arr, item, value = "") => {
  let array = arr;
  let index = array.findIndex(el => {
    if (typeof el === String) {
      return el === item;
    }
    return el[value] === item;
  });
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};

export const getSelectOptions = options => {
  return options.map(item => ({
    key: item,
    text: item,
    value: item
  }));
};

export const sortItems = (data, sortColumn = "") => {
  let sortedData = [];

  if (!sortColumn) {
    sortedData = data.sort((a, b) => (a.toUpperCase() < b.toUpperCase() ? -1 : 1));

    return sortedData;
  }

  if (sortColumn === "date") {
    sortedData = data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  } else {
    sortedData = data.sort((a, b) =>
      a[sortColumn].toUpperCase() < b[sortColumn].toUpperCase() ? -1 : 1
    );
  }

  return sortedData;
};

export const displayError = error => {
  if (error.includes("_client")) {
    return "Bitte eine Kunden auswählen";
  } else if (error.includes("name")) {
    return "Bitte Namen vergeben";
  } else {
    return error;
  }
};

export const displayDate = (date, withTime = false) => {
  if (!date) {
    return "tbd";
  }
  const day = `0${new Date(date).getDate()}`.substr(-2);
  const month = `0${new Date(date).getMonth() + 1}`.substr(-2);
  const year = new Date(date).getFullYear();
  const hours = `0${new Date(date).getHours()}`.substr(-2);
  const minutes = `0${new Date(date).getMinutes()}`.substr(-2);

  if (withTime) {
    return `${day}.${month}.${year} um ${hours}:${minutes}`;
  }
  return `${day}.${month}.${year}`;
};

export const nofValues = obj => {
  let size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) size++;
  }
  return size;
};
