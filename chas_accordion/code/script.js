// Selects and HTML element, and calls a function which will be executed when the element is clicked.
const section1Element = document.getElementById("section1")
const section2Element = document.getElementById("section2")
const section3Element = document.getElementById("section3")


const fetchData = async ()=>  {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  
  if(!response.ok) {
    return
  }
  const data = await response.json()
  // console.log(data);
  return data
}




const getRandomObject =  (arr) => {
const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
}


const populateSection = async (el,obj) => {
  const spinner = el.querySelector('.spinner'),
   chevronIcon = el.querySelector('.chevron-icon'),
   titleEl = el.querySelector('.title'),
   descEl = el.querySelector('.description p')
   
   if (titleEl && descEl) 
    titleEl.childNodes[0].textContent= obj.title;
    descEl.textContent = obj.body;


    if (spinner) spinner.style.display = "none";
    if (chevronIcon) chevronIcon.style.display = "inline";

}

// A function that adds and remove the class "active" on the section you click on.
function toggle(e) {
  const element = e.target;
  // element.classList.toggle("active");

  const sectionEl = element.closest('.section'),
  descEl = sectionEl.querySelector('.description')


  descEl.classList.toggle('active')
}


const initSections = async () => {
  const data = await fetchData();

  if (!data) return;


  const randomObject1 = getRandomObject(data);
  const randomObject2 = getRandomObject(data);
  const randomObject3 = getRandomObject(data);


  populateSection(section1Element, randomObject1);
  populateSection(section2Element, randomObject2);
  populateSection(section3Element, randomObject3);

};

initSections()


// section1Element.addEventListener("click", toggle);
document.querySelectorAll(".title").forEach((title) => {
  title.addEventListener("click", function ()  {
    const section = this.closest(".section"),
    description = section.querySelector(".description"),
    chevronIcon = section.querySelector(".chevron-icon")

    description.classList.toggle("active")
    chevronIcon.classList.toggle("up")

    if (description.classList.contains("active")) {
      section.style.maxHeight = "10rem";
      this.style.backgroundColor = "#7faaaa"
      this.style.color = "#ffff"
    } else {
      section.style.maxHeight = "6rem";
      this.style.backgroundColor = "" 
      this.style.color = "#000"

    }

  })
})










