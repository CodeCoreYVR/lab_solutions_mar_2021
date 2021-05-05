// const getSelectedDoggo = () => document.querySelector('.doggo.fighter.selected');

const unselectAllDoggos = () => {
    const selected = getSelectedDoggo();
    if (selected) {
        selected.classList.remove('selected')
    }
}

const removeSelectedDoggo = () => {
    const selected = getSelectedDoggo();
    if (selected) {
        selected.remove();
    }
}
// document.addEventListener('keydown', event => {
//     const doggos = document.querySelectorAll('.doggo.fighter');
//     const isCtrlKeyPressed = event.ctrlKey;
//     // event.keyCode for numbers 
//     // 0 => 48
//     // 1 => 49
//     // .
//     // .
//     // 9 => 57
//     const pressedNumber = event.keyCode - 48;
//     const isNumberPressed = pressedNumber >= 0 && pressedNumber <= doggos.length;

//     if (isCtrlKeyPressed && isNumberPressed) {
//         // unselect all the doggos first
//         unselectAllDoggos();
//         // then select that specific doggo
//         const selected = doggos[pressedNumber - 1];
//         selected.classList.add('selected');
//     } else if (event.key === 'Backspace') {
//         // get the selected doggo and remove it 
//         removeSelectedDoggo();
//     }
// })

// Stretch

/* 
    NOTE:  This solution for MAC users will have Ctrl working for the first part of selecting the doggos
    and Command working for the stretch in combination with the up and down keys
    Also, the numbers for the index start at 1 instead of 0 like the lab asks

*/

document.addEventListener('keydown', event => {
    const doggos = document.querySelectorAll('.doggo.fighter');
    const isCtrlKeyPressed = event.ctrlKey;

    const pressedNumber = event.keyCode - 48;
    const isNumberPressed = pressedNumber >= 0 && pressedNumber <= doggos.length;
    const selected = getSelectedDoggo();

    if (selected && event.key === 'ArrowDown') {
        if (selected.parentNode.parentNode.classList.contains('salmon')) {
            document.querySelector('.teal > .roster').append(selected)
            unselectAllDoggos();
        }
    } else if (selected && event.key === 'ArrowUp') {
        if (selected.parentNode.parentNode.classList.contains('teal')) {
            document.querySelector('.salmon > .roster').append(selected);
            unselectAllDoggos();
        }
    } else if (isCtrlKeyPressed && isNumberPressed) {
        unselectAllDoggos();
        const selected = doggos[pressedNumber - 1];
        selected.classList.add('selected');
    } else if (event.key === 'Backspace') {
        removeSelectedDoggo();
    }
})