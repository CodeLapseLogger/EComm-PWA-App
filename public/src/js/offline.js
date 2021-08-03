let offlineMsgElement = document.querySelector('.offline-msg-card');

// Method to launch the loading spinner
// function launchLoadingSpinner() {
//     offlineMsgElement.classList.add('hide-element');

//     spinnerTextElement.style.display = 'block';
//     spinnerElement.classList.add('is-active');
// }

// // Method to stop loading spinner
// function stopLoadingSpinner() {
//     offlineMsgElement.classList.remove('hide-element');

//     spinnerTextElement.style.display = 'none';
//     spinnerElement.classList.remove('is-active');
// }

// let spinnerTextElement = document.querySelector('.loading-spinner-text');
// let spinnerElement = document.querySelector('.mdl-spinner');

let elementListToHideUnhide = [offlineMsgElement];

window.onload = (event) => {
    // Launch loading spinner upon page load
    // and hide/stop it after 1 second. 
    launchLoadingSpinner(elementListToHideUnhide);
    let stopLoadSpinnerWrapper = () => { // For setTimeout argument
        stopLoadingSpinner(elementListToHideUnhide);
    }
    setTimeout(stopLoadSpinnerWrapper, 1000);
}