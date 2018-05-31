const url = "https://api.coinmarketcap.com/v1/ticker/?limit=2000";

let stringToRender = "";
let successful = false;

const render = coins => {
  coins.forEach(coin => {
    // document.getElementById("coinsGoHere").innerHTML += renderCoin(coin);
    document.getElementById("coinsGoHere").appendChild(renderCoin(coin));
  });
};

assignEvent = {
  coins: [],
  sortName() {
    function compare(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }
    this.coins.sort(compare);
    document.getElementById("coinsGoHere").innerHTML = "";
    render(this.coins);
  },
  sortRank() {
    function compare(a, b) {
      if (parseInt(a.rank) < parseInt(b.rank)) return -1;
      if (parseInt(a.rank) > parseInt(b.rank)) return 1;
      return 0;
    }
    this.coins.sort(compare);
    document.getElementById("coinsGoHere").innerHTML = "";
    render(this.coins);
  },
  sortPrice() {
    function compare(a, b) {
      if (parseInt(a.price_usd) < parseInt(b.price_usd)) return -1;
      if (parseInt(a.price_usd) > parseInt(b.price_usd)) return 1;
      return 0;
    }
    this.coins.sort(compare);
    document.getElementById("coinsGoHere").innerHTML = "";
    render(this.coins);
  },
  filterCoin() {
    let search = document.getElementById("filterInput").value;
    coinFiltered = this.coins.filter(coin => {
      return coin.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    document.getElementById("coinsGoHere").innerHTML = "";
    render(coinFiltered);
  }
};

const renderCoin = data => {
  // return `<div class="coin">
  //               <h3>${data.name} - ${data.symbol}</h3>
  //               <p>Rank: ${data.rank}</p>
  //               <p>Price: ${data.price_usd} $</p>
  //               <p>Change 1h: ${data.percent_change_1h} %</p>
  //               <p>Change 24h: ${data.percent_change_24h} %</p>
  //               <p>Change 7d: ${data.percent_change_7d} %</p>
  //           </div>`;

  const div = document.createElement("div");
  div.className = "coin";
  const h3 = document.createElement("h3");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const p5 = document.createElement("p");
  div.appendChild(h3);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
  div.appendChild(p4);
  div.appendChild(p5);
  h3.innerText = data.name + " - " + data.symbol;
  p1.innerText = "Rank: " + data.rank;
  p2.innerText = "Price: " + data.price_usd + " $";
  p3.innerText = "Change 1h: " + data.percent_change_1h + " %";
  p4.innerText = "Change 24h: " + data.percent_change_24h + " %";
  p5.innerText = "Change 7d: " + data.percent_change_7d + " %";
  return div;
};

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let coins = [];
    coins = data;
    return coins;
  })
  .then(function(coins) {
    render(coins);
    assignEvent.coins = coins;
  })
  .catch(function(err) {
    console.log(err);
  });
