let count = 0;
let url = "https://api.coinmarketcap.com/v2/ticker/?start=" + count;
let coins = [];
let fetchDone = false;
let arr = [];

async function fetchAsync(url, coins) {
  // await response of fetch call
  let response = await fetch(url);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  coins = await Object.values(data.data);
  coins.forEach(coin => {
    renderCoin(coin);
  });
  fetchDone = true;
}

function a(b) {
  b.push("a");
}
a(arr);

fetchAsync(url, coins);
console.log(coins);
loadMore = () => {
  count += 101;
  url = "https://api.coinmarketcap.com/v2/ticker/?start=" + count;
  console.log(url);
  if (count <= 1999) {
    fetchAsync(url, coins);
  } else {
    document.getElementById("loadMore").style.display = "none";
  }
};
renderCoin = data => {
  const div = document.createElement("div");
  div.className = "coin";
  const h3 = document.createElement("h3");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const p5 = document.createElement("p");
  const img = document.createElement("img");
  img.src = `https://s2.coinmarketcap.com/static/img/coins/32x32/${
    data.id
  }.png`;
  div.appendChild(img);
  div.appendChild(h3);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
  div.appendChild(p4);
  div.appendChild(p5);
  h3.innerText = data.name + " - " + data.symbol;
  p1.innerText = "Rank: " + data.rank;
  p2.innerText = "Price: " + data.quotes.USD.price + " $";
  p3.innerText = "Change 1h: " + data.quotes.USD.percent_change_1h + " %";
  p4.innerText = "Change 24h: " + data.quotes.USD.percent_change_24h + " %";
  p5.innerText = "Change 7d: " + data.quotes.USD.percent_change_7d + " %";
  document.getElementById("coinsGoHere").appendChild(div);
};
