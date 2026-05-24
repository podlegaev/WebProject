// =============================================================================
// PREVIOUS SOLUTION (FROM LESSON 31)
'use strict';

let accessKey = '66a148ec7e0f0c2b7368cf39e335109e';
// let apiUrl = 'http://web4.informatics.ru:82/api';
let apiUrl = 'http://localhost/api';

function getNetcityPlayData() {
  let data = {};
  let xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl + '/netcity-play', false);

  try {
    xhr.send();
    if (xhr.status === 200) {
      data = JSON.parse(xhr.responseText);
    }
  } catch (error) { }

  return data;
}

function getConsoles() {
  let data = getNetcityPlayData();
  console.log(data.consoles);
}

getConsoles();

function getSeasonalPromo() {
  let data = getNetcityPlayData();
  let seasonalPromo = document.querySelector('.seasonalPromo');
  let promoName = data.seasonalPromo;

  if (promoName) {
    seasonalPromo.innerText = promoName;
    seasonalPromo.style = '';
  } else {
    seasonalPromo.innerText = '';
    seasonalPromo.style.display = 'none';
  }
}

getSeasonalPromo();

function getSeasonalDiscount() {
  let data = getNetcityPlayData();
  let prices = document.querySelectorAll('.price');
  let sale = data.seasonalSale;

  if (sale) {
    for (let i = 0; i < prices.length; i++) {
      prices[i].innerText = Math.floor(Number(prices[i].innerText) * sale);
    }
  }
}

getSeasonalDiscount();

let consoleNames = document.querySelectorAll('.console_name');
let buyButtons = document.querySelectorAll('.buy');

for (let i = 0; i < buyButtons.length; i++) {
  buyButtons[i].addEventListener('click', function () {
    let consoleName = consoleNames[i].innerText;
    buy(consoleName);
  });
}

function subscribeToNewProducts() {
  let xhr = new XMLHttpRequest();
  xhr.open('PATCH', apiUrl + '/' + accessKey, false);

  try {
    xhr.send(JSON.stringify({
      userEmail: 'web4@informatics.ru',
    }));

    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      console.log(data);
    }
  } catch (error) { }
}

let notificationsButton = document.querySelector('#notifications');
notificationsButton.addEventListener('click', function () {
  subscribeToNewProducts();
});

function buy(consoleName) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', apiUrl + '/' + accessKey, false);

  try {
    xhr.send(JSON.stringify({
      buyConsole: consoleName,
    }));

    if (xhr.status === 201) {
      let getRequest = new XMLHttpRequest();
      getRequest.open('GET', apiUrl + '/' + accessKey, false);
      getRequest.send();

      if (getRequest.status === 200) {
        let data = JSON.parse(getRequest.responseText);
        console.log(data);
      }

      window.location.href = 'order.html';
    }
  } catch (error) { }
}

function getReviews() {
  let reviews = document.querySelector('.reviews');
  let data = getNetcityPlayData();

  for (let i = 0; i < 3; i++) {
    console.log('review');
    let review = document.createElement('div');
    review.classList.add('review');

    let reviewAuthor = document.createElement('div');
    reviewAuthor.classList.add('review-author');
    reviewAuthor.innerText = data.reviews[i].author;
    review.append(reviewAuthor);

    let reviewRate = document.createElement('div');
    reviewRate.classList.add('review-rate');
    let rate = '';

    for (let j = 0; j < data.reviews[i].rate; j++) {
      rate = rate + '⭐';
    }

    reviewRate.innerText = rate;
    review.append(reviewRate);

    let reviewText = document.createElement('div');
    reviewText.classList.add('review-text');
    reviewText.innerText = data.reviews[i].text;
    review.append(reviewText);

    reviews.append(review);
  }
}

getReviews();

// =============================================================================
// =============================================================================
//
