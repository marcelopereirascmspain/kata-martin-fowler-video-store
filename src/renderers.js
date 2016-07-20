export function asPlainText(statement) {
  const {
    name,
    amountOwed,
    moviesAmount,
    points
  } = statement;

  const text = (...strs) => strs.map(str => str + '\n').join('');
  const moviesAmountLine = () => {
    return moviesAmount.map(m => {
      return `\t${m.title}\t${m.amount}`;
    }).join('\n');
  }

  return text(
    `Rental Record for ${name}`,
    moviesAmountLine(),
    `Amount owed is ${amountOwed}`,
    `You earned ${points} frequent renter points`
  );
}

export function asHtml(statement) {
  const {
    name,
    amountOwed,
    moviesAmount,
    points
  } = statement;

  function table(movies) {
    return [
      `<table>`,
      movies.map(movie => {
        return (
          `\t<tr><td>${movie.title}</td><td>${movie.amount}</td></tr>`
        )
      }).join('\n'),
      `</table>`
    ].join('\n');
  }

  return [
    `<h1>Rental Record for <em>${name}</em></h1>`,
    table(moviesAmount),
    `<p>Amount owed is <em>${amountOwed}</em></p>`,
    `<p>You earned <em>${points}</em> frequent renter points</p>`
  ].join('\n');
}
