
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
                const eventSource = new EventSource(`/vote/live?id=${id}`)

                eventSource.onmessage = event => {
                    const data = JSON.parse(event.data)
                    const poll = data.poll

                    renderBarChart(poll, text)
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
            <p class="muted">${totalVotes}votes</p>
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
                                        <button>Copy link</button>
                                        <button>Share on Twitter</button>
                    </div>  `
            

    document.getElementById('container').innerHTML = voteHtml

}

