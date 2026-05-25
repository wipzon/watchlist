import { animeList } from "./data.js"

const itemList = document.getElementById('item-list')

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