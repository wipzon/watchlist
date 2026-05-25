import { animeList } from "./data.js"

const itemList = document.getElementById('item-list')
const addButton = document.getElementById('add-item')
const addWindow = document.getElementById('add-window')
const submitBtn = document.getElementById('submit-btn')


addWindow.style.display = 'none'

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
renderList()

addButton.addEventListener('click',function(){
    addWindow.style.display = 'block'
})
submitBtn.addEventListener('click',function(){
    addWindow.style.display = 'none'
})