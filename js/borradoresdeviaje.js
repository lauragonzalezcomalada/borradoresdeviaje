// Initial variables for the type/untype effect
const texts = ["borradoresdeviaje", "esborranysdeviatge"];

let index = 0;
let k = 0;
let isTyping = true;
let fullText = texts[k];

function mainPageSetup() {

    // Start the type and untype effect
    setTimeout(typeAndUntypeEffect, 1000);
}


// Function to create the type and untype effect
function typeAndUntypeEffect() {
    const div = document.querySelector(".text");

    if (isTyping) {
        // Typing effect
        if (index < fullText.length) {
            div.innerText += fullText.charAt(index);
            index++;
            setTimeout(typeAndUntypeEffect, 100);
        } else {
            isTyping = false;
            setTimeout(typeAndUntypeEffect, 1000); // Pause before untyping
        }
    } else {
        // Untyping effect
        if (index > 0) {
            div.innerText = fullText.slice(0, index - 1);
            index--;
            setTimeout(typeAndUntypeEffect, 100);
        } else {
            isTyping = true;
            fullText = texts[(k + 1) % texts.length];
            k += 1;
            setTimeout(typeAndUntypeEffect, 1000); // Pause before typing again
        }
    }
}



document.addEventListener("DOMContentLoaded", function() {
    const accordions = document.querySelectorAll(".accordion-btn");

    accordions.forEach((accordion) => {
        accordion.addEventListener("click", function() {
            // Toggle the content visibility
            const content = this.nextElementSibling;
 
            if (content.style.display === "block") {
                content.style.display = "none";
                content.classList.remove("expanded"); // Reset to default width
            } else {
                content.style.display = "block";    
                content.classList.add("expanded"); // Apply expanded width
            }
        });
    });
});


function openModal(imageSrc) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    
    modal.style.display = "flex"; // Show modal (using flex to center content)
    modalImg.src = imageSrc; // Set the image source to the full-size image
}

function closeModal(event) {
    if (event.target === event.currentTarget) {
        var modal = document.getElementById("imageModal");
        modal.style.display = "none"; // Hide modal
    }
}


//LANGUAGE TRANSLATING
function languageSelector(elementsToTranslate, path) {
    const languageSelector = document.getElementById('language-selector');

    function loadLanguage(language) {
        // Update the language selector to show the selected language
        languageSelector.value = language;

        fetch(path+`languages/${language}.json`)
            .then(response => response.json())
            .then(data => {
                elementsToTranslate.forEach(id => {
                    document.getElementById(id).textContent = data[id];
                });
            });
    }

    languageSelector.addEventListener('change', function () {
        const selectedLanguage = this.value;
        loadLanguage(selectedLanguage);
    });

    // Load default language (e.g., 'es')
    loadLanguage('es');
}

document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname; // Gets the current URL path
    let elementsToTranslate = [];
    let path_to_languages;

    if (path.includes('main_page')) {
        elementsToTranslate = ['about_us'];
        path_to_languages = "";
    } else if (path.includes('australia')) {
        elementsToTranslate = ['no_son_los_lugares','aussies_primera_generacion','mi_peor_enemigo','culturally_narrow'];
        path_to_languages = "../";

    } else if (path.includes('indonesia')) {
        elementsToTranslate = [];
        path_to_languages = "../";
    }

    // Call the function with the elements specific to the page
    languageSelector(elementsToTranslate, path_to_languages);
});


function logTitle(word, elementId, speed = 100) {
    const element = document.getElementById(elementId);
    let index = 0;


    function type() {
        if (index < word.length) {
            element.innerHTML += word.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}
