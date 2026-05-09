

const params = new URLSearchParams(window.location.search)
const id = params.get('id')
try{
    const res = await fetch(`/polls?id=${id}`)
    const data = await res.json()
    renderPolls(data)
console.log(data)
}catch(err){
    console.error(err)
}

function renderPolls(data){
 let voteHtml = ''
 voteHtml += `<h2>${data.question}</h2>
        <p class="muted"></p>`
}