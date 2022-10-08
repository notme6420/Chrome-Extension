const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
let sites = []
const sitefromstorage = JSON.parse(localStorage.getItem("sites"))
const deleteBtn = document.getElementById("delete")
const tabBtn = document.getElementById("tab-btn")

tabBtn.addEventListener("click", function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		sites.push(tabs[0].url)
		localStorage.setItem("sites", JSON.stringify(sites))
		render(sites)
	})
})	

if(sitefromstorage){
	sites = sitefromstorage
	render(sites)
}

function render(sites)
{
	let listItems = ""
	for (let i=0; i<sites.length; i++)
	{
		listItems += `
			<li>
				<a target='_blank' href='${sites[i]}'>${sites[i]}</a>
			</li>` 
	}
	ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function()
{
	localStorage.clear()
	sites = []
	render(sites)
})
console.log(localStorage.getItem("lead"))
localStorage.clear()
inputBtn.addEventListener("click", function(){
	sites.push(inputEl.value)
	inputEl.value = ""
	localStorage.setItem("sites", JSON.stringify(sites))
	render(sites)
	//console.log(localStorage.getItem("sites"))
})

