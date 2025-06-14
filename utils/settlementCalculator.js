class SettlementCalculator {
  static calculateBalances(expenses) {
    const balances = new Map();

    // Calculate net balance for each person
    expenses.forEach(expense => {
      // Add to paid amount
      const paidBy = expense.paidBy;
      balances.set(paidBy, (balances.get(paidBy) || 0) + expense.amount);

      // Subtract from owed amount for each person in split
      expense.splitDetails.forEach((amount, person) => {
        balances.set(person, (balances.get(person) || 0) - amount);
      });
    });

    return balances;
  }

  static calculateSettlements(balances) {
    const debtors = [];
    const creditors = [];

    // Separate debtors and creditors
    balances.forEach((balance, person) => {
      const roundedBalance = Number(balance.toFixed(2));
      if (roundedBalance < -0.01) {
        debtors.push({ person, amount: Math.abs(roundedBalance) });
      } else if (roundedBalance > 0.01) {
        creditors.push({ person, amount: roundedBalance });
      }
    });

    // Sort by amount
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    // Calculate settlements
    const settlements = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(debtor.amount, creditor.amount);

      if (amount > 0.01) {
        settlements.push({
          from: debtor.person,
          to: creditor.person,
          amount: Number(amount.toFixed(2))
        });

        debtor.amount -= amount;
        creditor.amount -= amount;
      }

      if (debtor.amount < 0.01) i++;
      if (creditor.amount < 0.01) j++;
    }

    return settlements;
  }

  static calculateSummary(expenses, settlements) {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalSettlements = settlements.reduce((sum, s) => sum + s.amount, 0);
    const averageExpense = totalExpenses / expenses.length || 0;

    return {
      totalExpenses: Number(totalExpenses.toFixed(2)),
      totalSettlements: Number(totalSettlements.toFixed(2)),
      averageExpense: Number(averageExpense.toFixed(2)),
      totalTransactions: settlements.length
    };
  }
}

module.exports = SettlementCalculator; 