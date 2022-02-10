
const getSaveNotes=()=>{
    const notesJson=localStorage.getItem('notes')

    try{
        return notesJson ? JSON.parse(notesJson):[]

    }catch(e){
        return []

    }
   
}

const saveNotes=(notes)=>{
    localStorage.setItem('notes',JSON.stringify(notes))

}

const removeNote=(id)=>{
    const noteIndx=notes.findIndex((note)=>note.id===id)
    if(noteIndx>-1){
        notes.splice(noteIndx,1)
       
    }

}
 
const generateNoteDom=(note)=>{
    const noteEl=document.createElement('a')
    const textEl=document.createElement('p')
    const statusEl=document.createElement('p')
    if(note.title.length>0){
        textEl.textContent=note.title
    }else{
        textEl.textContent='Unnamed note'
    }
    noteEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    noteEl.setAttribute('href',`/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    statusEl.textContent=getTime(note.updatedAt)
    noteEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
  
    return noteEl

}
const sortNotes=(notes,sortBy)=>{
    if(sortBy==='byEdited'){
        return notes.sort((a,b)=>{
            if(a.updatedAt>b.updatedAt){
                return -1

            }else if(b.updatedAt>a.updatedAt){
                return 1

            }else{
                return 0

            }
        })

    }else if(sortBy==='byCreated'){
        return notes.sort((a,b)=>{
            if(a.createdAt>b.createdAt){
                return -1

            }else if(b.createdAt>a.createdAt){
                return 1

            }else{
                return 0

            }
        })

    }else if(sortBy==='alphabetical'){
        return notes.sort((a,b)=>{
            if(a.title.toLowerCase()>b.title.toLowerCase()){
                return -1
            }else if(b.title.toLowerCase()>a.title.toLowerCase()){
                return 1

            }
            else{
                return 0
            }
        })

    }else{
        return notes
    }

}

const renderNotes=(notes,filters)=>{
    const noteEl=document.querySelector('#notes')
    sortNotes(notes,filters.sortedBy)
    const filterNotes=notes.filter((note)=>note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
   
    noteEl.innerHTML=''
    if(filterNotes.length>0){
        filterNotes.forEach((note)=>{
        noteEl.appendChild(generateNoteDom(note))
        })

    }else{
        const El=document.createElement('p')
        El.textContent="No content to show"
        El.classList.add('empty-message')
        noteEl.appendChild(El)

    }
    
    


}

const getTime = (timeStamp) => (`Last edited ${moment(timeStamp).fromNow()}`)