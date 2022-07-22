const fileInput = document.querySelector('.file-input'),
chooseImageBtn = document.querySelector('.choose-img'),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
filterSlider = document.querySelector('.slider input'),
previewImg = document.querySelector('.preview-img img'),
filterOptions = document.querySelectorAll('.filter button');


let brightness = 100, saturation =100, inversion= 0, grayscale = 0;


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

    
}




fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImageBtn.addEventListener("click", () => fileInput.click());