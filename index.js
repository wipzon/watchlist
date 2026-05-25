const animeList = [
	{
	id: 1001,
	name: "Kimi no Koto ga Daidaidaidaidaisuki na 100-nin no Kanojo 2nd Season",
	image: "images/100kano.jpeg",
	episodesWatched: 5,
	episodesTotal: 12,
	dateStarted: "2025-12-26",
	dateFinished: "2025-12-24",
	},
]

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