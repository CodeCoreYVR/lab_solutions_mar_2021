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

document.addEventListener('click', event => {
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


