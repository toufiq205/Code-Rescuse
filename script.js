const errorInput = document.getElementById("errorInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");

let searchHistory =
  JSON.parse(localStorage.getItem("searchHistory")) || [];

const errorDatabase = {
  "Cannot read properties of null": {
    severity: "🟡 Medium",
    meaning: "Element nahi mila",
    cause: "Wrong ID ya DOM load nahi hua",
    fix: "getElementById check karo",
    learn: "DOM Manipulation",
  },

  "map is not a function": {
    severity: "🟢 Easy",
    meaning: "map() sirf arrays pe chalta hai",
    cause: "Object ya string pe map() chala rahe ho",
    fix: "Check karo data array hai ya nahi",
    learn: "Arrays & map()",
  },

  "404 Not Found": {
    severity: "🟡 Medium",
    meaning: "Requested resource nahi mila",
    cause: "Wrong URL ya API endpoint",
    fix: "URL aur endpoint check karo",
    learn: "HTTP Status Codes",
  },
};

function renderHistory() {
  historyList.innerHTML = "";

  searchHistory.forEach((item) => {
    const li = document.createElement("li");

    li.textContent = item;

    historyList.appendChild(li);
  });
}

renderHistory();

analyzeBtn.addEventListener("click", () => {
  const error = errorInput.value;

  if (error.trim() === "") {
    result.innerHTML = `
      <h2>⚠ Warning</h2>
      <p>Please enter an error first.</p>
    `;
    return;
  }

  result.innerHTML = `
    <h2>🔍 Scanning Error...</h2>
    <p>Please wait while AI analyzes your error...</p>
  `;

  setTimeout(() => {
    let data = null;

    for (let key in errorDatabase) {
      if (error.includes(key)) {
        data = errorDatabase[key];
        break;
      }
    }

    if (data) {
      searchHistory.unshift(error);

      searchHistory = searchHistory.slice(0, 5);

      localStorage.setItem(
        "searchHistory",
        JSON.stringify(searchHistory)
      );

      renderHistory();

      result.innerHTML = `
        <h2>🚨 Error Detected</h2>

        <p><strong>Severity:</strong> ${data.severity}</p>

        <p>
          <strong>Meaning:</strong><br>
          ${data.meaning}
        </p>

        <p>
          <strong>Cause:</strong><br>
          ${data.cause}
        </p>

        <p>
          <strong>Fix:</strong><br>
          ${data.fix}
        </p>

        <p>
          <strong>Learn Next:</strong><br>
          ${data.learn}
        </p>
      `;
    } else {
      result.innerHTML = `
        <h2>⚠ Error Not Found</h2>

        <p>
          Sorry, this error is not available in our database yet.
        </p>
      `;
    }
  }, 1000);
});

clearHistoryBtn.addEventListener("click", () => {
  searchHistory = [];

  localStorage.removeItem("searchHistory");

  renderHistory();

  result.innerHTML = `
    <h2>🗑 History Cleared</h2>
    <p>All recent searches have been removed.</p>
  `;
});