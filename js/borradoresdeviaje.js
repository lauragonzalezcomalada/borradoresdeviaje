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
    // Add click event listeners to each carousel item
    const carouselItems = document.querySelectorAll('#carouselExample .carousel-item');

    carouselItems.forEach((item) => {
        item.addEventListener('click', function() {
            // Get the index of the clicked item
            const index = Array.from(carouselItems).indexOf(this);
            // Show the modal
            const carouselModal = document.getElementById('carouselModal');
            const carouselModalExample = document.getElementById('carouselModalExample');
            $(carouselModal).modal('show'); // Show modal using jQuery
            $(carouselModalExample).carousel(index); // Move to the corresponding item in the modal carousel
        });
    });

    // Close the modal when clicking outside of it
    const carouselModal = document.getElementById('carouselModal');
    carouselModal.addEventListener('click', function(e) {
        if (e.target === carouselModal) {
            $(carouselModal).modal('hide'); // Hide modal using jQuery
        }
    });
});

/*document.addEventListener("DOMContentLoaded", function() {
    const accordions = document.querySelectorAll(".accordion-btn");

    accordions.forEach((accordion) => {
        accordion.addEventListener("click", function() {
            console.log(this.previousElementSibling);
            // Toggle the content visibility
            const content = this.nextElementSibling;
            console.log(content);
 
            if (content.style.display === "block") {
                content.style.display = "none";
                content.classList.remove("expanded"); // Reset to default width
            } else {
                content.style.display = "block";    
                content.classList.add("expanded"); // Apply expanded width
            }
        });
    });
});*/

document.addEventListener("DOMContentLoaded", function() {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach((accordion) => {
        const button = accordion.querySelector(".accordion-btn");
        const content = accordion.querySelector(".accordion-content");

        // Retrieve the RGB values from the CSS variable set in the inline style
        const rootStyles = getComputedStyle(accordion);
        const backgroundColor = rootStyles.getPropertyValue('--accordion-bg-color').trim();


         // Check the initial display state of the content
         if (content.style.display === "block" || window.getComputedStyle(content).display === "block") {
            // Set background color with 17% opacity if initially open
            accordion.style.backgroundColor = `rgba(${backgroundColor}, 0.17)`;
        } else {
            // Set background color with 30% opacity if initially closed
            accordion.style.backgroundColor = `rgba(${backgroundColor}, 0.30)`;
        }

        button.addEventListener("click", function() {
            if (content.style.display === "block") {
                content.style.display = "none"; // Hide content
                // Apply background color with 30% opacity
                accordion.style.backgroundColor = `rgba(${backgroundColor}, 0.30)`;
            } else {
                content.style.display = "block"; // Show content
                // Apply background color with 17% opacity
                accordion.style.backgroundColor = `rgba(${backgroundColor}, 0.17)`;
            }
        });
    });
});




function openModal(imageSrc, text) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var modalText = document.getElementById('modalText');
    
    modalImg.src = imageSrc; // Set the image source to the full-size image
    modalText.textContent = text;
    modal.style.display = "flex"; // Show modal (using flex to center content)

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
        localStorage.setItem('selectedLanguage', selectedLanguage);
        loadLanguage(selectedLanguage);
    });

    // Check if a language is stored in localStorage, else default to 'es'
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    loadLanguage(savedLanguage);
}


// TRANSLATING FUNCTION
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname; // Gets the current URL path
    let elementsToTranslate = [];
    let path_to_languages;

    if (path.includes('main_page')) {
        elementsToTranslate = ['about_us'];
        path_to_languages = "";
    } else if (path.includes('australia')) {
        elementsToTranslate = ['worst_enemy','worst_enemy_texto','perfect_australia','perfect_australia_texto'];
        path_to_languages = "../";

    } else if (path.includes('indonesia')) {
        elementsToTranslate = ['donde_me_meti','bali_conocido','donde_me_meti_texto','bali_conocido_texto','why_trust_me_texto'];
        path_to_languages = "../";
    } else if (path.includes('sobre-borradores')) {
        elementsToTranslate = ['borradores_manu','borradores_manu_texto','borradores_laura','borradores_laura_texto'];
        path_to_languages = "";
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
