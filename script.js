const dueDateElement = document.getElementById("dueDate");
const timeRemainingElement = document.getElementById("timeRemaining");
const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const statusText = document.querySelector('[data-testid="test-todo-status"]');

const dueDate = new Date("2026-04-16T15:59:00");

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function updateTime() {
  const now = new Date();
  const diff = dueDate - now;

  dueDateElement.textContent = `Due ${formatDate(dueDate)}`;

  if (diff <= 0) {
    const minutes = Math.floor(Math.abs(diff) / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      timeRemainingElement.textContent = `Overdue by ${hours} hour(s)`;
    } else {
      timeRemainingElement.textContent = `Overdue by ${minutes} minute(s)`;
    }
    return;
  }

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    timeRemainingElement.textContent = `Due in ${days} day(s)`;
  } else if (hours > 0) {
    timeRemainingElement.textContent = `Due in ${hours} hour(s)`;
  } else {
    timeRemainingElement.textContent = `Due in ${minutes} minute(s)`;
  }
}

setInterval(updateTime, 30000);
updateTime();

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    statusText.textContent = "● Completed";
    statusText.classList.remove("pending");
    statusText.classList.add("completed");
  } else {
    statusText.textContent = "● Pending";
    statusText.classList.remove("completed");
    statusText.classList.add("pending");
  }
});