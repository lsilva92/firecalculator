async function onSubmit(e) {
  e.preventDefault();

  const anualExpenses = document.querySelector('#annual-expenses').value;
  const growth = document.querySelector('#annual-growth').value;
  const contributions = document.querySelector('#contributions').value;
  const investedAmount = document.querySelector('#money-invested').value;

  calculateFire(
    parseInt(anualExpenses),
    parseInt(growth),
    parseInt(contributions),
    parseInt(investedAmount)
  );
}

async function calculateFire(
  anualExpenses,
  growth,
  contributions,
  investedAmount
) {
  try {
    const retireParagraph = document.querySelector('#yearsUntilRetire');

    retireParagraph.innerHTML = '';

    const response = await fetch('/fire/calculator', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        anualExpenses,
        growth,
        contributions,
        investedAmount,
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();
    const { years, finalAmount } = data;

    const currentYear = new Date().getFullYear();

    if (years < 1) {
      retireParagraph.innerHTML = `Congratulations! You've reach Financial Independence `;
    } else {
      retireParagraph.innerHTML =
        `You have ${years} years until you reach Financial Independence.\n` +
        `In ${
          currentYear + years
        } you'll have a total of ${new Intl.NumberFormat('pt-PT', {
          style: 'currency',
          currency: 'EUR',
        }).format(finalAmount)}`;
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

document.querySelector('#fire-form').addEventListener('submit', onSubmit);
