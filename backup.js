const url = "https://api.coinmarketcap.com/v1/ticker/?limit=2000";
let coins = [];

fetch(url)
  .then(function(response) {
    response.json().then(function(data) {
      for (let i = 0; i < data.length; i++) {
        coins.push(data[i]);
      }
    });
  })
  .catch(function(err) {
    console.log(err);
  });

renderCoin = data => {
  return `<div class="coin">
                <h3>${data.name} - ${data.symbol}</h3>
                <p>Rank: ${data.rank}</p>
                <p>Price: ${data.price_usd} $</p>
                <p>Change 1h: ${data.percent_change_1h} %</p>
                <p>Change 24h: ${data.percent_change_24h} %</p>
                <p>Change 7d: ${data.percent_change_7d} %</p>
            </div>`;
};
setTimeout(() => {
  console.log(coins.length);
  coins.forEach(coin => {
    document.getElementById("coinsGoHere").innerHTML += renderCoin(coin);
  });
}, 350);
