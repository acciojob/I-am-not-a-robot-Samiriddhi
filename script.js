//your code here

const imageContainer = document.querySelector('.image-container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');

// Array of image class names
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];

let selectedImages = [];
let identicalImageIndex;

// Function to shuffle the array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to generate random images
function generateImages() {
    shuffleArray(imageClasses);
    identicalImageIndex = Math.floor(Math.random() * 5); // Index of the identical image
    selectedImages = [];

    imageContainer.innerHTML = '';

    for (let i = 0; i < imageClasses.length; i++) {
        const img = document.createElement('img');
        img.classList.add(imageClasses[i]);
        img.src = 'image-url'; // Replace 'image-url' with the actual image URLs
        img.addEventListener('click', () => handleClick(i));
        imageContainer.appendChild(img);
    }

    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.style.display = 'none';
}

// Function to handle image clicks
function handleClick(index) {
    if (selectedImages.length >= 2 || index === identicalImageIndex) {
        return;
    }

    selectedImages.push(index);

    if (selectedImages.length === 2) {
        verifyButton.style.display = 'block';
    }

    if (selectedImages.length === 1) {
        resetButton.style.display = 'block';
    }
}

// Function to reset the game
function resetGame() {
    selectedImages = [];
    generateImages();
    para.style.display = 'none';
}

// Function to verify the selected images
function verify() {
    if (selectedImages.length === 2) {
        if (selectedImages[0] === identicalImageIndex && selectedImages[1] === identicalImageIndex) {
            para.textContent = 'You are a human. Congratulations!';
        } else {
            para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
        }

        para.style.display = 'block';
        verifyButton.style.display = 'none';
    }
}

// Initial game setup
generateImages();

// Event listeners
resetButton.addEventListener('click', resetGame);
verifyButton.addEventListener('click', verify);
