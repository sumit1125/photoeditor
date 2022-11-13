const fileInput = document.querySelector(".file-input"),
filterOption = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterValue = document.querySelector(".filter-info .value");
filterRange = document.querySelector(".slider input");
rotateOptions = document.querySelectorAll(".rotate button");
previewImg = document.querySelector(".preview-img img");
ResetBtn = document.querySelector(".reset-filter");
saveImgBtn = document.querySelector(".save-img");
chooseImgBtn = document.querySelector(".choose-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`// deg is used becouse of rotating in angles and scale to mirror the iamge
  previewImg.style.filter = `brightness(${brightness}%)  invert(${inversion}%)  saturate(${saturation}%)  grayscale(${grayscale}%)`
}

function loadImage() {
  let file = fileInput.files[0]; // getting useres selected file
  if (!file)
    return; // return if user hasn't selected file
  previewImg.src = URL.createObjectURL(file); // passing file url as preview img src 
  previewImg.addEventListener("load", () => {
      ResetBtn.click();
      document.querySelector(".container").classList.remove("disable");

  });
}

filterOption.forEach(option => {
  option.addEventListener("click", () => { // adding  click event listener to all filter button
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");//selecting active class and removing from the button and adding this class on the current clicked button
    filterName.innerText = option.innerText;

    // after clicking to another button is clcicked it proegress on RangeInput will be save
    if (option.id === "brightness") {
      filterRange.max = "200"; //maximizing range till 200
      filterRange.value = brightness;
      filterValue.innerText = `${brightness}%`;

    }
    else if (option.id === "saturation") {
      filterRange.max = "200";
      filterRange.value = saturation;
      filterValue.innerText = `${saturation}%`;
    }
    else if (option.id === "inversion") {
      filterRange.max = "100";
      filterRange.value = inversion;
      filterValue.innerText = `${inversion}%`;
    }
    else {
      filterRange.max = "100";
      filterRange.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }

  });

});


const updateFilter = () => {
  filterValue.innerText = `${filterRange.value}%`;
  const selectorFilter = document.querySelector(".filter .active");// getting selected filter btn

  if (selectorFilter.id === "brightness") {
    brightness = filterRange.value;
  } else if (selectorFilter.id === "saturation") {
    saturation = filterRange.value;
  } else if (selectorFilter.id === "inversion") {
    inversion = filterRange.value;
  } else {
    grayscale = filterRange.value;
  }
  applyFilters();

}

rotateOptions.forEach(option => {
  option.addEventListener("click", () => { // adding  click event listener to all filter button
    if (option.id === 'left') {
      rotate -= 90; // click btn is left rotate, decrement rotate value by -90
    } else if (option.id === 'right') {
      rotate += 90; // click btn is right rotate, decrement rotate value by -90
    } else if (option.id === 'horizontal') {
      // if flipHorizontal value 1, set this value to -1 else set 1
      flipHorizontal = flipHorizontal === 1 ? -1 : 1; // click btn is left rota
    } else {
      // if flipHorizontal value 1, set this value to -1 else set 1
      flipVertical = flipVertical === 1 ? -1 : 1;
    }

    applyFilters();
  })
});

const resetFilter = () => {
  // resetting all variable value to its default value
  brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
  rotate = 0, flipHorizontal = 1, flipVertical = 1;
  filterOption[0].click(); // clicking brithness btn, so the brithness selected by default
  applyFilters();

}

const saveImage = () => {
  const canvas = document.createElement("canvas");// creating canvas element
  const ctx = canvas.getContext('2d'); // canvas.getContext return a drawing context on the canvas
  canvas.width = previewImg.naturalWidth; // setting canvas width to actual image width
  canvas.height = previewImg.naturalHeight; // setting canvas height to actual image height

  // applying user selected filters to canvas filter
  ctx.filter = `brightness(${brightness}%)  invert(${inversion}%)  saturate(${saturation}%)  grayscale(${grayscale}%)`
  ctx.translate(canvas.height / 2, canvas.width / 2) // traslenting canvas from center
  if (rotate !== 0) { // if rotate value isn't 0, rotate the canvas
    ctx.rotate(rotate * Math.PI / 180);
  }
  ctx.scale(flipHorizontal, flipVertical); // flip canvas, gorizontally / vetiacly
  ctx.drawImage(previewImg, canvas.width, -canvas.height / 2, -canvas.width / 2, canvas.height)

  const link = document.createElement("a"); // creating <a> element
  link.download = "image.jpg"; // passing <a> tag download value to "image.jpg"
  link.href = canvas.toDataURL(); // passing <a> ta href value to canvas data URL
  link.click(); // click <a> tag so the image element

}


fileInput.addEventListener("change", loadImage);
filterRange.addEventListener("input", updateFilter);
ResetBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
