const fileInput = document.querySelector('.file-input'),
chooseImageBtn = document.querySelector('.choose-img'),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
filterSlider = document.querySelector('.slider input'),
previewImg = document.querySelector('.preview-img img'),
filterOptions = document.querySelectorAll('.filter button'),
rotateOptons = document.querySelectorAll('.rotate button'),
resetFilterBtn = document.querySelector('.reset-filter'),
saveImgBtn = document.querySelector('.save');



let brightness = 100, saturation =100, inversion= 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilter = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0]; // getting user selectef file
    if (!file) return; //return if user hasn't selcted file
    previewImg.src = URL.createObjectURL(file) // passing file url as preview img src
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    })
}


filterOptions.forEach(option => {
    option.addEventListener("click", () =>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active")
        filterName.innerHTML = option.innerText;

        if(option.id === "brightness"){
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }else if (option.id === "saturation"){
            filterSlider.max = "200";

            filterSlider.value = saturation;
            filterValue.innerText =`${saturation}%`;
        } else if (option.id === "inversion"){
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.value = grayscale;
            filterSlider.max = "100";
            filterValue.innerText = `${grayscale}%`; 
       }
    });
    
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%` // change the value
    const selectedFilter = document.querySelector(".filter .active");
    if (selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
        
    } else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value;

    }else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;

    }else {(selectedFilter.id === "grayscale")
        grayscale = filterSlider.value;}

        applyFilter ();
    
}
rotateOptons.forEach(option => {
    option.addEventListener("click", () =>{
        if(option.id === "left"){
            rotate -= 90;
        } else if (option.id === "right"){
            rotate += 90;
        } else if (option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter ();
    })
})

const resetFilter = () => {
     brightness = 100, saturation =100, inversion= 0, grayscale = 0;
     rotate = 0, flipHorizontal = 1, flipVertical = 1;
     previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    filterOptions[0].click();
     applyFilter ();

}

const saveImage = () => {

    const canvas=document.createElement("canvas");// creating canvas element
    const ctx=canvas.getContext("2d");// canvas.getContext returnadrawing context on the canvas
    canvas.width=previewImg.naturalWidth;// setting canvas width to actual image width
    canvas.height=previewImg.naturalHeight;// setting canvas height to actual image height
    // applying user selected filters to canavas filter
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2,canvas.height / 2);// translating canvas from center
    if(rotate !==0){
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.scale(flipHorizontal,flipVertical);// flip canvas,horizontally/vertically
    ctx.drawImage(previewImg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
    const link = document.createElement("a");
    link.download= "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}


fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImageBtn.addEventListener("click", () => fileInput.click());
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);