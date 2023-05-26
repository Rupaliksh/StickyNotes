const notesContainer = document.getElementById("app");
const addNoteButten = notesContainer .querySelector(".add-note");

getNotes().forEach(note =>{
    const noteElement = createNoteElement(note.id, note.content)
    notesContainer.insertBefore(noteElement, addNoteButten)
});

addNoteButten.addEventListener("click", ()=> addNote());

function getNotes(){
return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));
}

function createNoteElement(id,content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";
    
    element.addEventListener("change",()=>{
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick",()=>{
        const doDelete = confirm("Are you sure you want to delete this note?");
        if(doDelete){
            deleteNote(id,element);
        }
    })
    return element;
}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    }
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButten);
    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id,newContent){
    console.log("updating notes");
    console.log(id, newContent);
    const notes = getNotes();
    console.log(notes);
    const targetNote = notes.find(note=> note.id === id);
    console.log(targetNote);
    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element){
    const notes = getNotes().filter(note => note.id !== id);
    saveNotes(notes);
    
    notesContainer.removeChild(element);
}

