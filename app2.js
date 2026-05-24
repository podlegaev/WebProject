"use strict";

fetch("http://web4.informatics.ru:82/api/netcity-play")
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (data) {
        console.log(data.item_name);

        let itemName = document.querySelector("#item_name");
        itemName.value = data.item_name;

        let itemAmount = document.querySelector("#item_amount"); 
        if (data.item_amount) {
            itemAmount.value = data.item_amount;
        } else {
            itemAmount.value = 1;
        }
    })
    .catch(function (error) {
        console.log("Ошибка соединения");
    })

console.log("Ожидаю ответ сервера...");