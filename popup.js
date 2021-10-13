const container = document.getElementById("patterns-container");
const addButton = document.getElementById("add-button");
const submitButton = document.getElementById("submit-button");

const updateUI = () => {
  getItems()
    .then((oldData) => {
      if (!oldData) return;

      const content = Array.from(oldData)
        .map(
          (d) => `
        <div class="pattern">
          <input value="${d.path}" type="text" class="path" />
          <input value="${d.value}" type="text" class="value" />
          <input value="${d.color}" type="text" class="color" />
        </div>
        `
        )
        .join("\n");
      container.innerHTML = content;
    })
    .catch(console.error);
};

addButton.addEventListener("click", () => {
  container.innerHTML += `
      <div class="pattern">
        <input value="" placeholder="path" type="text" class="path" />
        <input value="" placeholder="value regex" type="text" class="value" />
        <input value="" placeholder="color" type="text" class="color" />
      </div>
    `;
});

submitButton.addEventListener("click", () => {
  const patterns = Array.from(document.querySelectorAll(".pattern"));
  const newData = patterns
    .map((pat) => {
      const path = pat.querySelector(".path").value;
      const value = pat.querySelector(".value").value;
      const color = pat.querySelector(".color").value;
      if (!path || !value || !color) return;

      return { path, value, color };
    })
    .filter(Boolean);

  setItems(newData).then(() => updateUI());
});

updateUI();
