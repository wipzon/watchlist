import { animeList as defaultList} from "./data.js"

const itemList = document.getElementById('item-list')
const addButton = document.getElementById('add-item')
const addWindow = document.getElementById('add-window')
const addForm = document.getElementById('add-form')
const trashButton = document.getElementById('trash-btn')

let animeList = JSON.parse(localStorage.getItem("animeList")) || defaultList
let selectedId = null

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
document.addEventListener('click',function(e){
				if(!addWindow.contains(e.target) && !addButton.contains(e.target)){
								addWindow.style.display = 'none'
								selectedId = null
								addForm.reset()
				}
})

itemList.addEventListener('click',function(e){
    const frame = e.target.closest('.item-frame')
    if(!frame) return

    selectedId = Number(frame.id)
    const anime = animeList.find(a => a.id === selectedId)

    document.getElementById('item-name').value = anime.name
    document.getElementById('item-status').value = anime.status
    document.getElementById('item-score').value = anime.score
    document.getElementById('item-episodes-watched').value = anime.episodesWatched
    document.getElementById('item-episodes-total').value = anime.episodesTotal
    document.getElementById('item-start-date').value = anime.dateStarted
    document.getElementById('item-finish-date').value = anime.dateFinished
    document.getElementById('item-url').value = anime.image

    addWindow.style.display = 'block'
})


addButton.addEventListener('click',function(){
    addWindow.style.display = 'block'
})

addForm.addEventListener('submit',function(e){
    e.preventDefault()
    const addFormData = new FormData(addForm)
    const data = {
        name: addFormData.get('item-name'),
        status: addFormData.get('status'),
        score: addFormData.get('item-score'),
        episodesWatched: addFormData.get('item-episodes-watched'),
        episodesTotal: addFormData.get('item-episodes-total'),
        startDate: addFormData.get('item-start-date'),
        finishDate: addFormData.get('item-finish-date'),
        image: addFormData.get('item-url'),
    }

    if(selectedId){
        editAnime(selectedId, data)
        selectedId = null
    } else {
        addAnime(data)
    }

    addWindow.style.display = 'none'
    addForm.reset()
})

function addAnime(data){
    animeList.push({
        id: Date.now(),
        ...data
    })
    localStorage.setItem("animeList",JSON.stringify(animeList))
    renderList()
}

function editAnime(id, updatedData){
    animeList = animeList.map(anime => 
        anime.id === id ? { ...anime, ...updatedData } : anime
    )
    localStorage.setItem("animeList", JSON.stringify(animeList))
    renderList()
}

trashButton.addEventListener('click',function(){
    const deleteConfirm = document.getElementById('delete-confirm-conrainer')
    const deleteConfirmYes = document.getElementById('delete-comfirm-yes')
    const deleteConfirmNo = document.getElementById('delete-comfirm-no')

    deleteConfirm.style.display = 'block'
    deleteConfirmYes.addEventListener('click',function(){
        deleteEntry(selectedId)
        selectedId = null
        deleteConfirm.style.display = 'none'
        addWindow.style.display = 'none'
    })
    deleteConfirmNo.addEventListener('click',function(){
        deleteConfirm.style.display = 'none'
    })
    

    
})

function deleteEntry(id){
    animeList = animeList.filter(anime => anime.id !== id)
    localStorage.setItem("animeList", JSON.stringify(animeList))
    renderList()
}