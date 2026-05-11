const params = new URLSearchParams(window.location.search)
const id = params.get('id')
 

const votedPoll = JSON.parse(localStorage.getItem('pollId'))|| []

if(votedPoll.includes(id)){

try{
    const res = await fetch(`/polls?id=${id}`)
    const data = await res.json()
    renderBarChart(data)
}catch(err){
    console.error(err)
}
}else{
    try{
    const res = await fetch(`/polls?id=${id}`)
    const data = await res.json()
    renderPolls(data)
}catch(err){
    console.error(err)
}
}

function renderPolls(data){
    let voteHtml = `<h2>${data.question}</h2>
            <p class="muted"></p>
            <p>Results updating live</p>`
    data.options.forEach(function(option){
        voteHtml += 
            `<div>
                <button data-id="${data.id}">${option.text}</button>
            </div>
            `
    })
    document.getElementById('container').innerHTML = voteHtml


    document.getElementById('container').addEventListener('click', async function(e){
        if(!e.target.dataset.id) return
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
                    const votedPoll = JSON.parse(localStorage.getItem('pollId'))|| []
                    votedPoll.push(id)
                    localStorage.setItem('pollId', JSON.stringify(votedPoll))
                    const res = await fetch(`/polls?id=${id}`)
                    const poll = await res.json()
                    renderBarChart(poll, text)


                const eventSource = new EventSource(`/vote/live?id=${id}`)

                eventSource.onmessage = event => {
                    console.log(event.data)
                    const data = JSON.parse(event.data)
                    renderBarChart(data.poll, text)
                }

                eventSource.onerror = () => console.log('connection failed')
                }catch(err){
                    console.error(err)
                }
            })
}


function renderBarChart( poll, text){

    const totalVotes = poll.options.reduce(function(total, current){
            return total + current.votes
        }, 0)

    const winner = poll.options.reduce(function(max, option){
        return option.votes > max.votes ? option : max
    }, poll.options[0])

    let voteHtml = `<h2>${poll.question}</h2>
            <p class="muted">${totalVotes} votes</p>
            <p class="green">🟢Results updating live</p>` 

    poll.options.forEach(function(option){
        let percentage =   Math.round((option.votes/totalVotes)*100)
        const isWinner = option.text === winner.text
        voteHtml += 
                                `
                                    <div class="mini-container">
                                        <p>${option.text} ${percentage}%</span></p>
                                        <div class="progress-container">
                                            <div class="progress-bar ${isWinner? 'winner': ''}" style="width:${percentage}%"></div>
                                        </div>
                                    </div>                
                                `
        })
        voteHtml += `<div>
                        <p>${text}(your vote)</p>
                    </div>   
                    <div>
                                        <button id="copy">Copy link</button>
                                        <button id="share">Share on Twitter</button>
                    </div>  `
            

    document.getElementById('container').innerHTML = voteHtml

    
document.getElementById('copy').addEventListener('click', async function(){
   try{ 
        await navigator.clipboard.writeText(window.location.href)
   }catch(err){
    console.error('Failed to copy:', err)
   }
})

document.getElementById('share').addEventListener('click', function(){
    const url = window.location.href
    const text = document.title

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`

    window.open(twitterUrl, 'TwitterWindow', 'width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes')
})

}


