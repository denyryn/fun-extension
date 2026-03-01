let popup;

async function loadData() {
  const response = await fetch(chrome.runtime.getURL("data.json"));
  return await response.json();
}

function createPopup(text, x, y) {
  if (popup) popup.remove();

  popup = document.createElement("div");
  popup.className = "highlight-popup";
  popup.textContent = text;
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 10000);
}

document.addEventListener("mouseup", async (event) => {
  const selection = window.getSelection().toString().trim();
  if (!selection) return;

  const data = await loadData();

  const match = data.find((item) =>
    selection.toLowerCase().includes(item.trigger_sentence.toLowerCase()),
  );

  if (match) {
    createPopup(match.word, event.pageX, event.pageY);
  }
});
