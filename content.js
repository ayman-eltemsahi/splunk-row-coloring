let patterns = [];
getItems().then((data) => {
  patterns = data.map(({ path, value, color }) => ({
    path,
    value: new RegExp(value),
    color,
  }));
});

const colorRow = (row, color) => {
  row.style.borderLeft = `15px solid ${color}`;
};

const processOneRow = (row) => {
  const elements = Array.from(row.querySelectorAll(".json-tree span.t")).map((el) => ({
    path: el.getAttribute("data-path"),
    value: el.innerHTML,
  }));

  const pattern = patterns.find((pat) => elements.find((el) => pat.path === el.path && pat.value.test(el.value)));
  if (!pattern) return;

  colorRow(row, pattern.color);
};

const startColoring = () => {
  console.log("Starting coloring ...");
  const trees = document.querySelectorAll(".shared-eventsviewer-list-body-row");
  Array.from(trees).forEach(processOneRow);
};

const throttle = (ms, fn) => {
  let timeout;
  const trigger = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };

  return { trigger };
};

const throttledCall = throttle(250, startColoring);

setTimeout(() => {
  const tabContent = document.querySelector(".tab-content");
  if (!tabContent) return;

  tabContent.addEventListener("DOMNodeInserted", () => {
    throttledCall.trigger();
  });

  throttledCall.trigger();
}, 2000);
