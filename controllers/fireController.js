exports.fireCalulator = (req, res) => {
  //Recebe no Input as Despesas anuais e multiplica por 25
  //const anualExpenses = 12000;
  //const contributions = 500 * 12;*/
  //let investedAmount = 10000;
  //Com base no crescimento anual quanto tempo vai demorar a atingir o fireNumber
  //Exemplo: valor inicial de 10000€ crescimento anual de 5%(com possibilidade de reforços mensais)
  //Ano 1: 10000 * 0.05 = 500€
  //Ano 2: 10500 * 0.05 = 525€

  let years = 0;

  let { anualExpenses, growth, contributions, investedAmount } = req.body;
  const anualGrowth = growth / 100;
  const fireNumber = anualExpenses * 25;
  const anualContributions = contributions;

  while (investedAmount < fireNumber) {
    let growth = (investedAmount + anualContributions) * anualGrowth;
    investedAmount = Math.round(investedAmount + growth);
    years++;
  }

  res.status(200).json({
    status: 'success',
    fireNumber,
    years,
    finalAmount: investedAmount,
  });
};
