const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;

const count = 10;
const apiKey = "cmUGL7mk5tN7UEiH61H2sEt3PtcTGM1GEvRMsEDNFTk";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 3) loader.hidden = true;
  if (imagesLoaded === count) ready = true;
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function createElement(tag, attributes) {
  const element = document.createElement(tag);
  setAttributes(element, attributes);
  return element;
}

function displayPhotos(photos) {
  imagesLoaded = 0;
  photos.forEach((photo) => {
    const anchor = createElement("a", {
      href: photo.links.html,
      target: "blank",
    });

    const img = createElement("img", {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    anchor.appendChild(img);
    imageContainer.appendChild(anchor);
  });
}

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    const photos = await res.json();
    return photos;
  } catch (e) {
    console.log(e);
  }
}

async function updatePhotoStream() {
  const photos = await getPhotos();
  displayPhotos(photos);
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    updatePhotoStream();
  }
});

updatePhotoStream();
