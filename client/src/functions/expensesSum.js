const expensesSum = expenses => Array.prototype.map.call
(expenses, ({amount}) => Number(amount)).reduce((a, b) => a + b, 0)

export default expensesSum