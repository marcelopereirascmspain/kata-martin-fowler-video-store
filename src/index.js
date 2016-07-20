import { add, get } from './utils';

const movieCodes = {
  NEW: 'new',
  REGULAR: 'regular',
  CHILDRENS: 'childrens'
};

export default function statement(customer, movies, render) {
  const data = prepareStatementData(customer, movies);

  return render(data);
}

function prepareStatementData(customer, movies) {
  const moviesAmount = customer.rentals.map(rental => {
    const movie = movies[rental.movieID];
    const daysRented = rental.days;
    const amount =
      determineAmount(movie, daysRented);
    const points =
      calculateFrequentRenterPoints(movie, daysRented);

    return {
      title: movie.title,
      amount: amount,
      points: points
    };
  });

  return {
    name: customer.name,
    moviesAmount: moviesAmount,
    amountOwed: moviesAmount.map(get('amount')).reduce(add, 0),
    points: moviesAmount.map(get('points')).reduce(add, 0)
  };
}

function determineAmount(movie, daysRented) {
  switch (movie.code) {
    case movieCodes.REGULAR:
      const regularAmount = 2;
      return daysRented > 2 ?
        regularAmount + (daysRented - 2) * 1.5 :
        regularAmount;
    case movieCodes.NEW:
      return daysRented * 3;
    case movieCodes.CHILDRENS:
      const childrensAmount = 1.5;
      return daysRented > 3 ?
        childrensAmount + (daysRented - 3) * 1.5 :
        childrensAmount;
  }
}

function calculateFrequentRenterPoints(movie, daysRented) {
  return hasBonus(movie, daysRented) ? 2 : 1;
}

function hasBonus(movie, daysRented) {
  return movie.code === movieCodes.CHILDRENS && daysRented > 2;
}
