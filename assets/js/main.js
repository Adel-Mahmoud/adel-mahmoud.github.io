/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () { headerShadow() };

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";

  } else {

    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";

  }
}


/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
  strings: ["Designer", "Programmer", "Developer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000
})


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
})

/* -- HOME -- */
sr.reveal('.featured-text-card', {})
sr.reveal('.featured-name', { delay: 100 })
sr.reveal('.featured-text-info', { delay: 200 })
sr.reveal('.featured-text-btn', { delay: 200 })
sr.reveal('.social_icons', { delay: 200 })
sr.reveal('.featured-image', { delay: 300 })


/* -- PROJECT BOX -- */
sr.reveal('.project-box', { interval: 200 })

/* -- HEADINGS -- */
sr.reveal('.top-header', {})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info', { delay: 100 })
srLeft.reveal('.contact-info', { delay: 100 })

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box', { delay: 100 })
srRight.reveal('.form-control', { delay: 100 })



/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

    } else {

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')

    }
  })
}

window.addEventListener('scroll', scrollActive);

const downloadCv = () => {
  window.location.href = "./Adel-Mahmoud-CV.pdf";
};

/* ----- VIEW PROJECT ----- */
document.querySelectorAll('.project-box').forEach((box) => {
  box.onclick = () => {
    document.getElementById('project-details').style.display = 'block';
  }
});
document.getElementById('close-project-details').onclick = () => {
  document.getElementById('project-details').style.display = 'none';
}
const apiUrl = "./assets/js/projects.json";
const projects = document.getElementById("projectsContainer");
const projectName = document.getElementById("projectName");
const projectImage = document.getElementById("projectImage");
const projectDescription = document.getElementById("projectDescription");
const projectTechnologies = document.getElementById(
  "projectTechnologies"
);
projects.innerHTML = "";
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((project) => {
      projects.innerHTML += `
                <div class="project-box" onclick="projectDetails(${project.id})">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        {...$$props}
                    >
                        <path
                        fill="currentColor"
                        d="M19 5v14H5V5zm2-2H3v18h18zm-4 14H7v-1h10zm0-2H7v-1h10zm0-3H7V7h10z"
                        />
                    </svg>
                    <h3>${project.name}</h3>
                    <label>${project.technologiesType}</label>
                </div>
                `;
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
function projectDetails(id) {
  document.getElementById("project-details").style.display = "block";
  projectTechnologies.innerHTML = "";
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((project) => {
        if (project.id == id) {
          projectName.textContent = project.name;
          projectImage.src =
            project.image == ""
              ? "./assets/images/projects/project.svg"
              : project.image;
          projectDescription.textContent = project.description;
          project.technologies.forEach((skell) => {
            projectTechnologies.innerHTML += `<li>${skell}</li>`;
          });
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
