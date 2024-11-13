
const channelsContainer = document.getElementById("channels"),
 prevPageButton = document.querySelector(".prevPage"),
 nextPageButton = document.querySelector(".nextPage")

// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'


let currentPageUrl = 'https://api.sr.se/api/v2/channels/?format=json',
 previousPageUrl = null

const fetchLiveAudio = async (url) => {
 const response  = await fetch(url)


 if(!response.ok){
    return console.log("Something went wrong")
 }

 const data = await response.json()
 return data

}

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.
// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>

const displayChannels = async () => {

    const data = await fetchLiveAudio(currentPageUrl)

    if(!data) return;

    const {channels,pagination} = data



    channelsContainer.innerHTML = channels.map(channel => 
        `
        <div class="channelContainer" style="background-color: #${channel.color}" id=${channel.id}>
         <img src=${channel.image} alt="Channel image"/>
        <div>
            <div class="channelInfo">
             <button class="btn" style="color: #${channel.color}" onclick="window.open('${channel.siteurl}', '_blank')">
                <?xml version="1.0" encoding="UTF-8"?>
              <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 265 63.6">
                  <rect width="265" height="63.6"/>
                 <line class="cls-1" y1="2.5" x2="214" y2="2.5"/>
             </svg>
             <a href="">Home Page</a>
             </button>
             <p>${channel.name}</p>

             </div>

          <span>${channel.tagline}</span>
          <audio controls>
             <source src=${channel.liveaudio.url} type="audio/mpeg" />
             </audio>
        </div>
      </div>

        `
    ).join("") 


    if (pagination.nextpage) {
        currentPageUrl = pagination.nextpage
    } 
    if (pagination.previouspage) {
        previousPageUrl = pagination.previouspage
    }

    nextPageButton.disabled = !pagination.nextpage
    prevPageButton.disabled = !pagination.previouspage

    window.scrollTo({ top: 0, behavior: 'smooth' })


}


nextPageButton.addEventListener("click", () => {
    if (currentPageUrl) displayChannels()
})

prevPageButton.addEventListener("click", () => {
    if (previousPageUrl) {
        currentPageUrl = previousPageUrl;
        displayChannels();
    }
})


displayChannels()


