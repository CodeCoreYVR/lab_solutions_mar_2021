//Helper functions

//return the selected doggo
function getSelectedDoggo(){
    return document.querySelector('.doggo.fighter.selected')    
}

//removes the selected doggo, if one exists
function removeSelected(){
    const selected = getSelectedDoggo();
    if (selected) {
        selected.classList.remove('selected')
    }
}

//Clicking a .doggo.fighter adds the selected class to it
//A doggo with the selected class is considered selected
//Only one doggo can have the selected class

document.querySelectorAll('.doggo.fighter').forEach(doggo => {
    doggo.addEventListener('click', function(event){
        removeSelected();
        doggo.classList.add('selected');
    })
})

//Clicking on a team's name, moves the selected doggo to that team
// a. We need to select team names
// b. add an event listener to both team names
// c. find the roster class of that team and select it
// d. move the doggo to the other team
document.querySelectorAll('.team > h1').forEach(teamTitle => {
    teamTitle.addEventListener('click', function(event) {
        const roster = teamTitle.closest('.team').querySelector('.roster');
        let traitorDog = getSelectedDoggo();
        if (traitorDog) {
            roster.append(traitorDog);
        }
    })
})

// Stretch 
// Clicking anywhere else on the page, unselects all selected .doggo.fighters.

// Steps: 
// 1. registering an event listener that detects a click on anywhere on the page
// 2. make sure that whatever you've clicked is not team name
// 3. remove selected class from the selected doggo

document.addEventListener('click', function(event) {
    const { target } = event;
    console.log('target: ', target); // is the element that triggers the event in our case, the element that we click on
    console.log('current target: ', event.currentTarget); // currentTarget is the element(node) that we attach addEventListener to
    if (!target.closest('.team')) {
        const selectedDoggo = getSelectedDoggo();
        if (selectedDoggo) {
            selectedDoggo.classList.remove('selected');
        }
    }
})

//Update Applicant's prebview's h1 node contents with applicant name as it is typed

const name = document.querySelector('#name');
const previewName = document.querySelector('#applicant-preview h1')

name.addEventListener('input', function(event){
    previewName.innerText = event.currentTarget.value;
})

//Update the applican't preview pic once a valid picture url as it is typed
//check that the typed in field ends with .jpg, .gif, .png

const pictureUrl = document.querySelector('#picture-url')
const blankDoggo = document.querySelector('.doggo.blank')

pictureUrl.addEventListener('input', function(event){
    const value = event.currentTarget.value
    const ending = value.slice(-4);
    const validEndings = ['.jpg', '.gif', '.png'];
    if (validEndings.includes(ending)){
        blankDoggo.style.backgroundImage = `url(${value})`;
    }
});

//Border
// Give a salmon or teal border to the applicant preview depending on which team is typed.
// steps: 
// a. grab the team name field, and applicant preview container
// b. add an event listener to the team-name field
// c. grab the value of the team-name and update the border of the applicant preview with the colour of team-name

const teamName = document.querySelector('#team-name');
const applicantPreview = document.querySelector('#applicant-preview');

teamName.addEventListener('input', function(event) {
    const { value } = event.currentTarget;
    const validTeamNames = ['teal', 'salmon']
    if (validTeamNames.includes(value.toLowerCase())) {
        applicantPreview.style.border = `5px solid ${value}`;
    }
})

// When the form is submitted, reset the applicant preview and create that.doggo.fighter in the team written in the team name field.

const form = document.querySelector('#application-form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const newDoggo = blankDoggo.cloneNode(true);
    const validTeamNames = ['teal', 'salmon'];
    if (validTeamNames.includes(teamName.value.toLowerCase())) {
        document.querySelector(`.team.${teamName.value.toLowerCase()} .roster`).append(newDoggo);
        // here we will reset the form
        form.reset();
        applicantPreview.style.border = '';
        previewName.innerHTML = 'Applicant Preview';
        blankDoggo.style.background = '';
    } else {
        alert('You entered an invalid team name');
    }
})

