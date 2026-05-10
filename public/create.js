
const form = document.querySelector('form')

form.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const pollFormData = new FormData(form)
    const question = pollFormData.get('question')
    const option1 = pollFormData.get('option1')
    const option2 = pollFormData.get('option2')
    const option3 = pollFormData.get('option3')
    const option4 = pollFormData.get('option4')

    let pollObj = {}

if(question && option1 && option2 && option3 && option4){
    pollObj = {
        question: question,
        option1: {
            text: option1,
            votes: 0
        },
        option2: {
            text:option2,
        votes: 0
        },
        option3: {
            text:option3,
            votes: 0
        },
        option4: {
            text:option4,
            votes: 0
        },
        id: crypto.randomUUID()
    }
}
    try{
        await fetch('/polls', {
            method: "POST",
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(pollObj)
        })
        window.location.href = `poll.html?id=${pollObj.id}`
    }catch(err){
        console.error('Post request failed:', err.message)
    }
})

