import expect from 'expect';
import statement from '../src';
import { asPlainText, asHtml } from '../src/renderers';

describe('statements', () => {
  let customer = {
    name: "martin",
    rentals: [
      {movieID: "F001", days: 3},
      {movieID: "F002", days: 1}
    ]
  };

  let movies = {
    F001: {title: "Ran", code: "regular"},
    F002: {title: "Trois Coleurs: Bleu", code: "regular"}
  };

  it('should return the result as plain text', () => {
    let actual = statement(customer, movies, asPlainText);
    let expected =
`Rental Record for martin
\tRan\t3.5
\tTrois Coleurs: Bleu\t2
Amount owed is 5.5
You earned 2 frequent renter points
`;

    expect(actual).toEqual(expected);
  });

  it('should return the result as html', () => {
    let actual = statement(customer, movies, asHtml);
    let expected =
`<h1>Rental Record for <em>martin</em></h1>
<table>
\t<tr><td>Ran</td><td>3.5</td></tr>
\t<tr><td>Trois Coleurs: Bleu</td><td>2</td></tr>
</table>
<p>Amount owed is <em>5.5</em></p>
<p>You earned <em>2</em> frequent renter points</p>`;

    expect(actual).toEqual(expected);
  });
});
