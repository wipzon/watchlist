import { animeList as defaultList} from "./data.js"

const itemList = document.getElementById('item-list')
const addButton = document.getElementById('add-item')
const addWindow = document.getElementById('add-window')
const addForm = document.getElementById('add-form')

let animeList = JSON.parse(localStorage.getItem("animeList")) || defaultList

renderList()

function renderList(){
	itemList.innerHTML = ''

	for(let anime of animeList){
		itemList.innerHTML += `
			<div id="${anime.id}" class="item-frame">
				<img class="item-img" src="${anime.image}">
				<div class="item-info">
					<h2>${anime.name}</h2>
					<p>${anime.episodesWatched}/${anime.episodesTotal} episodes</p>
				</div>
			</div>`
	}
}


addButton.addEventListener('click',function(){
    addWindow.style.display = 'block'
})

addForm.addEventListener('submit',function(e){
    e.preventDefault()

    const addFormData = new FormData(addForm)
    const name = addFormData.get('item-name')
    const status = addFormData.get('status')
    const score = addFormData.get('item-score')
    const episodesWatched = addFormData.get('item-episodes-watched')
    const episodesTotal = addFormData.get('item-episodes-total')
    const startDate = addFormData.get('item-start-date')
    const finishDate = addFormData.get('item-finish-date')
    const url = addFormData.get('item-url')


    addAnime(name,status,score,episodesWatched,episodesTotal,startDate,finishDate,url)

    addWindow.style.display = 'none'
})

function addAnime(name,status,score,episodesWatched,episodesTotal,startDate,finishDate,url){
    animeList.push({
        id: Date.now(),
        name: name,
        status: status,
        score: score,
        episodesWatched: episodesWatched,
        episodesTotal: episodesTotal,
        dateStarted: startDate,
        dateFinished: finishDate,
        image: url,
    })
    localStorage.setItem("animeList",JSON.stringify(animeList))
    renderList()
}