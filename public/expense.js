const API_BASE_URL = "http://localhost:3000/expenses"; // Replace with your API URL

function handleFormSubmit(event) {
  event.preventDefault();

  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  // Ensure all fields are filled
  if (!amount || !description || !category) {
    alert("Please fill in all fields");
    return;
  }

  // Create expense object
  const expense = {
    amount,
    description,
    category,
  };

  // Send POST request to add expense to backend
  fetch('http://localhost:3000/expenses', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  })
    .then((response) => response.json())
    .then((savedExpense) => {
      // Display saved expense in the list
      displayExpense(savedExpense);

      // Reset form
      event.target.reset();
    })
    .catch((error) => {
      console.error("Error saving expense:", error);
    });
}

// Function to display an expense
function displayExpense(expense) {
  const expenseList = document.getElementById("expenseList");

  // Create list item
  const li = document.createElement("li");
  li.setAttribute("data-id", expense.id); // Use backend-provided ID
  li.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;

  // Create Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    // Send DELETE request to backend
    fetch(`http://localhost:3000/expenses/${expense.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          li.remove();
        } else {
          throw new Error("Failed to delete expense");
        }
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
      });
  });

  

  // Append buttons to list item
  li.appendChild(deleteButton);
 

  // Append list item to the list
  expenseList.appendChild(li);
}

// Load expenses from the backend on page load
document.addEventListener("DOMContentLoaded", () => {
  fetch(API_BASE_URL)
    .then((response) => response.json())
    .then((expenses) => {
      expenses.forEach((expense) => {
        displayExpense(expense);
      });
    })
    .catch((error) => {
      console.error("Error loading expenses:", error);
    });
});
