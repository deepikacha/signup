const Expense = require('../models/expense');

// Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    if (!amount || !description || !category) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newExpense = await Expense.create({ amount, description, category });
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "An error occurred while adding the expense." });
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
    try {
      // Fetch all expenses from the database
      const expenses = await Expense.findAll();
  
      // Render the 'expense.ejs' view and pass the expenses data
      res.render('expense', {
        pageTitle: 'Expense Tracker',
        expenses: expenses, // Pass expenses to the view
      });
    } catch (error) {
      console.error("Error fetching expenses:", error);
      res.status(500).render('error', { 
        pageTitle: 'Error',
        errorMessage: "An error occurred while fetching expenses."
      });
    }
  };
  

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found." });
    }

    await expense.destroy();
    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "An error occurred while deleting the expense." });
  }
};
