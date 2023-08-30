// Get references to elements
const arrow = document.getElementById('arrow');
const content = document.getElementById('content');
const uploadTitle = document.getElementById('uploadTitle');
const pictureIcon = document.getElementById('pictureIcon'); // Reference to the picture icon
const uploadmenu = document.getElementById('uploadMenu'); 
const homeIcon = document.getElementById('homeIcon'); // Reference to the home icon
const uploadAbout = document.getElementById('uploadAbout'); // Reference to the upload
const uploadOrder = document.getElementById('uploadOrder'); // Reference to the upload order

// Initial state of content
let collapsed = false;

// Event listener for arrow click
arrow.addEventListener('click', () => {
  // Toggle collapsed content
  content.classList.toggle('collapsed-content');
  // Toggle arrow rotation
  arrow.classList.toggle('arrow-rotate');
  // Toggle picture icon rotation
  pictureIcon.style.transform = collapsed ? 'rotate(0deg)' : 'rotate(360deg)'; // Rotate 360 degrees when collapsed is true 
  // Toggle collapsed state
  collapsed = !collapsed;
  // Toggle hidden class on uploadTitle based on collapsed state
  uploadTitle.classList.toggle('hidden', collapsed);
  uploadmenu.classList.toggle('hidden', collapsed);
  uploadAbout.classList.toggle('hidden', collapsed);
  uploadOrder.classList.toggle('hidden', collapsed);
}); 

const imageInput1 = document.getElementById('imageInput1');
const imageInput2 = document.getElementById('imageInput2');
const previewImage = document.getElementById('previewImage');
const coordinates = document.getElementById('coordinates');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

imageInput1.addEventListener('change', function () {
previewSelectedImage(this, previewImage);
});

imageInput2.addEventListener('change', function () {
previewSelectedImage(this, previewImage);
});

function previewSelectedImage(input, imgElement) {
const file = input.files[0];
if (file) {
const reader = new FileReader();
reader.onload = function (e) {
  imgElement.src = e.target.result;
  imgElement.style.left = '0';
  imgElement.style.top = '0';
  offsetX = 0;
  offsetY = 0;
};
reader.readAsDataURL(file);
}
}

previewImage.addEventListener('mousedown', (e) => {
isDragging = true;
offsetX = e.clientX - previewImage.getBoundingClientRect().left;
offsetY = e.clientY - previewImage.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
if (!isDragging) return;
const rect = previewImage.parentElement.getBoundingClientRect();
const newX = e.clientX - offsetX - rect.left;
const newY = e.clientY - offsetY - rect.top;
previewImage.style.left = `${Math.max(0, Math.min(newX, rect.width - previewImage.width))}px`;
previewImage.style.top = `${Math.max(0, Math.min(newY, rect.height - previewImage.height))}px`;
updateCoordinates(newX, newY);
});

document.addEventListener('mouseup', () => {
isDragging = false;
});

previewImage.addEventListener('mouseenter', () => {
coordinates.classList.remove('hidden');
});

previewImage.addEventListener('mouseleave', () => {
coordinates.classList.add('hidden');
});

function updateCoordinates(x, y) {
coordinates.textContent = `X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}`;
}

