let notes=getSaveNotes()

const filters={
    searchText:'',
    sortedBy:'byEdited'
}


renderNotes(notes,filters)

document.querySelector('#create-note').addEventListener('click',(e)=>{
    const id=uuidv4()
    const timestamp=moment().valueOf()
   notes.push({
       id,
       title:'',
       body:'',
       createdAt:timestamp,
       updatedAt:timestamp
   })
   saveNotes(notes)
   location.assign(`/edit.html#${id}`)
})


document.querySelector('#search-text').addEventListener('input',(e)=>{
    filters.searchText=e.target.value
    renderNotes(notes,filters)

})
document.querySelector('#filter-by').addEventListener('change',(e)=>{
    filters.sortedBy=e.target.value
    renderNotes(notes,filters)

})

window.addEventListener('storage',(e)=>{
    if(e.key==='notes'){
        notes=JSON.parse(e.newValue)
        renderNotes(notes,filters)

    }
})
