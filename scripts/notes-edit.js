const noteid=location.hash.substring(1)
let notes=getSaveNotes()
const titleEl=document.querySelector('#note-title')
const bodyEl=document.querySelector('#note-body')
const removeButton=document.querySelector('#remove-note')
const spanEl=document.querySelector('#timeStamp')

let note=notes.find((note)=>note.id===noteid)
if(!note){
    location.assign('/index.html')
}

titleEl.value=note.title
bodyEl.value=note.body
spanEl.textContent=`Last updated ${moment(note.updatedAt).fromNow()}`

titleEl.addEventListener('input',(e)=>{
    note.title=e.target.value
    note.updatedAt=moment().valueOf()
    spanEl.textContent=`Last updated ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)
    


})
bodyEl.addEventListener('input',(e)=>{
    note.body=e.target.value
    note.updatedAt=moment().valueOf()
    spanEl.textContent=`Last updated ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)
    
})

removeButton.addEventListener('click',()=>{
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})
 window.addEventListener('storage',(e)=>{
     if(e.key==='notes'){
         notes=JSON.parse(e.newValue)
         note=notes.find((note)=>note.id===noteid)
            if(!note){
                location.assign('/index.html')
            }

            titleEl.value=note.title
            bodyEl.value=note.body
            spanEl.textContent=`Last updated ${moment(note.updatedAt).fromNow()}`
     }
 })
