import _ from 'lodash';
import Handlebars from 'handlebars';
//import helper from './helpers/compare.js';
import template from './template.handlebars';
import data from './data.json';
import './style/style.scss';

'use strict';



let content = template(data);

document.querySelector(".roadmap").innerHTML = content;


// define variables
let items = document.querySelectorAll(".roadmap li.event");

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
        }
    }
}

function isOdd(num) {
    return num % 2;
}

let oddEven = 1;
_.each(items, function (item) {
    item.addEventListener("mouseover", function (e) {
        item.classList.add("expand");
    }, false);

    item.addEventListener("mouseleave", function (e) {
        item.classList.remove("expand");
    }, false);

    if (isOdd(oddEven)) {
        item.children.item(0).classList.add("right");
    } else {
        item.children.item(0).classList.add("left");
    }
    oddEven++;

});


// listen for events
window.addEventListener("load", callbackFunc);
window.addEventListener("resize", callbackFunc);
window.addEventListener("scroll", callbackFunc);