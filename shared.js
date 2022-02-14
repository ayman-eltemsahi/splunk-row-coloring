const KEY = "SPLUNK_ROW_COLORING";
const DEFAULT_DATA = [
  { path: "line.response.statusCode", value: "5..", color: "red" },
  { path: "line.response.statusCode", value: "4..", color: "#f15555" },
  { path: "line.level", value: "error", color: "#f15555" },
  { path: "line.level", value: "warn", color: "yellow" },
];

const setItems = (value) =>
  new Promise((resolve) => {
    chrome.storage.local.set({ [KEY]: value }, resolve);
  });

const getItems = () =>
  new Promise((resolve) => {
    chrome.storage.local.get([KEY], (result) => resolve(result[KEY]));
  });

const setDefaultData = () => {
  getItems().then((data) => {
    if (data) return;
    setItems(DEFAULT_DATA);
  });
};

setDefaultData();
