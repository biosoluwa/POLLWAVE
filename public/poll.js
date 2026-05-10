const params = new URLSearchParams(window.location.search)
const id = params.get('id')
try{
    const res = await fetch(`/polls?id=${id}`)
    const data = await res.json()
    renderPolls(data)
}catch(err){
    console.error(err)
}

function renderPolls(data){
 let voteHtml = `<h2>${data.question}</h2>
        <p class="muted"></p>
        <p>Results updating live</p>`
 data.options.forEach(function(option){
    voteHtml += 
        `<div>
            <button>${option.text}</button>
        </div>
        `
 })
document.getElementById('container').innerHTML = voteHtml


document.getElementById('container').addEventListener('click', async function(e){
    if(e.target.tagName !== 'BUTTON') return
            const text = e.target.innerHTML
            try{
                await fetch('/vote',{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        text: text
                    })
                })
            const res = await fetch(`/polls?id=${id}`)
            const poll = await res.json()
                renderBarChart(poll)
            }catch(err){
                console.error(err)
            }
        })
}


function renderBarChart( poll){
const totalVotes = poll.options.reduce(function(total, current){
        return total + current.votes
    }, 0)

    let voteHtml = `<h2>${poll.question}</h2>
        <p class="muted">${totalVotes}</p>
        <p class="green">🟢Results updating live</p>` 

    

    poll.options.forEach(function(option){
                voteHtml += 
                            `
                                <div class="mini-container">
                                    <p>${option.text} ${(option.votes/totalVotes)*100}%</span></p>
                                    <div class="progress-container">
                                        <div class="progress-bar"></div>
                                    </div>
                                </div>                     
                            `
    })
document.getElementById('container').innerHTML = voteHtml
}
