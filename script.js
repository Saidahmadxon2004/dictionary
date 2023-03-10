const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const form = document.querySelector("form");
const loaderEl = document.querySelector(".load");

const loaderToggle = (info) => {
  if (info) {
    loaderEl.classList.remove("hidden");
  } else {
    loaderEl.classList.add("hidden");
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  async function getWord() {
    document.querySelector(".syn").innerHTML = "";
    document.querySelector(".body__footer").innerHTML = "";
    const li = document.querySelectorAll("li");
    const wordS = document.getElementById("getword").value;
    const sField = document.getElementById("getword");
    const meaning = document.getElementById("meaning");
    const tittle = document.getElementById("tittle");
    const textEmpty = document.getElementById("txt-empty");

    const notFound = document.getElementById("not-found");
    const newAudio = document.getElementById("my-audio");
    const addSound = document.getElementById("btn-play");
    let option = document.querySelector("#font");
    option.addEventListener("change", (e) => {
      e.preventDefault();
      let val = option.value;

      document.body.style.fontFamily = val;
      option.style.fontFamily = val;
      word.style.fontFamily = val;
    });
    meaning.innerHTML = "";

    sField.classList.remove("input-empty");
    textEmpty.classList.add("remove");
    tittle.classList.remove("remove");
    notFound.classList.add("remove");

    if (!wordS) {
      sField.classList.add("input-empty");
      textEmpty.classList.remove("remove");
      tittle.classList.add("remove");

      addSound.classList.add("remove");
      return;
    }

    try {
      loaderToggle(true);
      const response = await fetch(url + wordS);
      const dataA = await response.json();
      loaderToggle(false);
      const data = dataA[0];
      const word = data.word;
      const pron = data.phonetics[0].text;

      // audio

      let audioSrc = data.phonetics[0].audio;

      if (!audioSrc == "") {
        newAudio.innerHTML = `<source src="${audioSrc}" type="audio/mp3">`;

        document
          .getElementById("btn-play")
          .addEventListener("click", function () {
            newAudio.play();
          });
        newAudio.load();
        addSound.classList.remove("remove");
      } else {
        newAudio.load();
        newAudio.innerHTML = "";
        addSound.classList.add("remove");
      }

      const meaningL = data.meanings.length;

      console.log(data);

      for (let x = 0; x < meaningL; x++) {
        let me = data.meanings[x].partOfSpeech;

        let newDiv = document.createElement("div");
        newDiv.classList.add("mea");

        let newH3 = document.createElement("h3");
        newH3.innerHTML = me;

        let newSpan = document.createElement("span");
        newSpan.classList.add("line-meaning");

        let meaningTitle = document.createElement("h4");
        meaningTitle.classList.add("meaning-title");
        meaningTitle.innerHTML = "Meaning";

        newDiv.appendChild(newH3);
        newDiv.appendChild(newSpan);
        meaning.appendChild(newDiv);
        meaning.appendChild(meaningTitle);

        var defL = data.meanings[x].definitions.length;

        let fistTime = true;

        for (var j = 0; j < defL; j++) {
          let def = data.meanings[x].definitions[j].definition;
          if (fistTime) {
            let newUl = document.createElement("ul");
            newUl.classList.add("list-definition");
            newUl.classList.add("padding");
            newUl.setAttribute("id", `meaning${x}`);
            meaning.appendChild(newUl);
          }

          let myUl = document.getElementById("meaning" + x);
          let newLi = document.createElement("li");
          newLi.innerHTML = def;
          myUl.appendChild(newLi);

          fistTime = false;
        }
      }
      let syns;
      document.getElementById("word").textContent = word;
      document.getElementById("pron").textContent = pron;
      if (data.meanings[0].synonyms.length) {
        syns = data.meanings[0].synonyms;
      } else {
        syns = "sinonim mavjud emas";
      }
      document.querySelector(".syn").innerHTML = `<div class="synonum">
      <div class="synonum_title">Synonyms</div>
      <div class="synonum_response">${syns}</div>
  </div>`;
      document.querySelector(
        ".body__footer"
      ).innerHTML = `<div class="source">Source</div>
<a class="wikpedia" target="blank" href="${data.sourceUrls}"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
    >
      <path
        fill="none"
        stroke="#838383"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
      /></svg
  >${data.sourceUrls}</a>`;

      meaning.classList.remove("remove");
    } catch (err) {
      console.log(err);

      notFound.classList.remove("remove");
      tittle.classList.add("remove");
      addSound.classList.add("remove");
    }
  }
  getWord();
});
const toggleButton = document.getElementById("toggle-button");
const element = document.querySelector("body");

// Set initial state
var isToggled = false;

// Add a click event listener to the button
toggleButton.addEventListener("click", function () {
  // Update the background color of the element

  if (isToggled) {
    isToggled = false;
    element.style.backgroundColor = "white";

    const h1Elements = document.querySelectorAll("h1, h3, li, p");
    h1Elements.forEach(function (element) {
      element.classList.remove("black");
    });
  } else {
    isToggled = true;
    element.style.backgroundColor = "var(--back-1)";

    const h1Elements = document.querySelectorAll("h1, h3, li, p");
    h1Elements.forEach(function (element) {
      element.classList.add("black");
    });
  }
});
//Change theme
