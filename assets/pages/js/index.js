let trending = document.querySelector("#trending");
let boxes = document.querySelectorAll(".box")
let info=document.querySelector(".info")
// Function to trigger the animation on button click
function addAnimationClass() {
    // Select the song boxes
    const songBoxes = document.querySelectorAll('.box1');
    
    // Make all song boxes visible and animated
    songBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('show');
        }, index * 100); // Delay each song box animation for a staggered effect
    });

    // Also make sure the main2 container is visible with a fade-in effect
    const main2 = document.querySelector('.main2');
    main2.classList.add('show');
}

// Button click events to trigger animations
document.getElementById('today').addEventListener('click', addAnimationClass);
document.getElementById('trending').addEventListener('click', addAnimationClass);
document.getElementById('new').addEventListener('click', addAnimationClass);

let dots=document.querySelector(".fa-ellipsis-vertical")
dots.addEventListener("click",()=>{
    info.style.display="flex";
})
trending.addEventListener("click", () => {
    boxes.forEach(box => {
        box.classList.remove("box1");      
        void box.offsetWidth;                
        box.classList.add("box1");
    });
});
let neww=document.querySelector("#new")
let today=document.querySelector("#today")
neww.addEventListener("click", () => {
    boxes.forEach(box => {
        box.classList.remove("box1");      
        void box.offsetWidth;                
        box.classList.add("box1");
    });
});
today.addEventListener("click", () => {
    boxes.forEach(box => {
        box.classList.remove("box1");      
        void box.offsetWidth;                
        box.classList.add("box1");
    });
});
let two=document.querySelector("#secondd")

function play2(audio2){
    let aud=document.querySelector("#audio")
    let srca=document.querySelector("#src")
    srca.src=audio2
    aud.load();
    aud.play();
}
function artist(){
    window.open("http://127.0.0.1:5500/artist.html")
    document.querySelector("#a").classList.add("a")
}
function album(){
    window.open("http://127.0.0.1:5500/album.html")
}

function stations(){
    window.open("http://127.0.0.1:5500/radio.html")
}
function download(){
    window.open("http://127.0.0.1:5500/download.html")
}
function purchased(){
    window.open("http://127.0.0.1:5500/purchased.html")
}

function dis(){
    window.open("http://127.0.0.1:5500/index.html")
}