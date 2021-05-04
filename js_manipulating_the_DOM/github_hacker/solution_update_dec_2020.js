// @ https://github.com/rwaldron/johnny-five

// 1. Change the text color of all file name and directory name links to red.
// document.querySelectorAll('.file-wrap a.js-navigation-open').forEach(node => {
// 	node.style.color = 'red';
// });

// UPDATE DEC 2020!!! Seems like Github changed its styles, which caused a cascading issue for this lab solution to work as
// intended.  In order to manipulate the DOM, we can override the cascading css order by using "!important" as follows:
document.querySelectorAll('a.js-navigation-open.link-gray-dark').forEach(node => {
	node.setAttribute("style", "color: red !important");
});


// 2. Delete all file and directory icons from the file explorer (the big box below the Clone or download button).
// document.querySelectorAll('.js-navigation-item > .icon').forEach(node => {
// 	node.remove();
// });

//UPDATE DEC 2020!!! The original solution did not work with icon, so used svg instead:
document.querySelectorAll('.js-navigation-item svg').forEach(node => node.remove());


// 3. Clone the johnny five logo (the big yellow square with a robot inside)
// and use it to replace the Github logo at the very top left of the page.
// Also, resize the cloned johnny five logo to be about the same size as the replaced Github logo.

// NOTE: solutions 1 and 2 make copies, leaving the original image where it
// started in the README, while solution 3 moves (and resizes) the actually image 
// from the README up to where the github cat logo was

//UPDATE DEC 2020!!! Styling and style names for Github elements have been changed. Solutions 1-3 have been
//updated accordingly

// Solution 1 -  
// create new image tag and makes its `src` attribute be the same as the johnny-five-logo `src`
let logoSpot = document.querySelector('.Header-link');
let gitHubCatLogo = logoSpot.querySelector('.Header-link svg');
let johnnyFiveSrc = document.querySelector('#readme img').getAttribute('src');
let johnnyFiveLogo = document.createElement('img');
johnnyFiveLogo.setAttribute('src', johnnyFiveSrc);
johnnyFiveLogo.setAttribute('height', gitHubCatLogo.getAttribute('height'));
johnnyFiveLogo.setAttribute('width', gitHubCatLogo.getAttribute('width'));
logoSpot.replaceChild(johnnyFiveLogo, gitHubCatLogo);

// Solution 2 - using the `cloneNode` method to clone the johnny-five-logo
let logoSpot = document.querySelector('.Header-link');
let gitHubCatLogo = logoSpot.querySelector('.Header-link svg');
let johnnyFiveLogo = document.querySelector('#readme img').cloneNode();
johnnyFiveLogo.setAttribute('height', gitHubCatLogo.getAttribute('height'));
johnnyFiveLogo.setAttribute('width', gitHubCatLogo.getAttribute('width'));
logoSpot.replaceChild(johnnyFiveLogo, gitHubCatLogo);

// Solution 3 - moving the actual johnny-five-logo img from the README to the github header
let logoSpot = document.querySelector('.Header-link');
let gitHubCatLogo = logoSpot.querySelector('.Header-link svg');
let johnnyFiveLogo = document.querySelector('#readme img');
johnnyFiveLogo.setAttribute('height', gitHubCatLogo.getAttribute('height'));
johnnyFiveLogo.setAttribute('width', gitHubCatLogo.getAttribute('width'));
logoSpot.replaceChild(johnnyFiveLogo, gitHubCatLogo);

//Alternative Updated Solution
const johnnyFiveLogo = document.querySelector("#readme img");
const logoSpot = document.querySelector(".Header-link");
const gitHubCatLogo = document.querySelector(".Header-link svg");
johnnyFiveLogo.setAttribute("style", `height: ${gitHubCatLogo.getAttribute("height")}px`);
gitHubCatLogo.remove();
logoSpot.appendChild(johnnyFiveLogo);

// 4. Replace all topic tags (e.g. javascript, arduino, chip. etc) with the first tag, javascript

let javascriptTag = document.querySelector('.topic-tag');
let parent = javascriptTag.parentNode;

document.querySelectorAll('.topic-tag').forEach(oldNode => {
	let replacement = javascriptTag.cloneNode(true);
	parent.replaceChild(replacement, oldNode);
});