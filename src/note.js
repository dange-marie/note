import { getDB, insertDB, saveDB } from "./db";

const addNote = async (data, tags) => {
    const note = {
        content: data,
        tags: tags,
        id: Date.now()
    }
    await insertDB(note)
    return note
}

const getAllNotes = async () => {
    const db = await getDB()
    return db.notes
}

const findNotes = async (filter) => {
    const { notes } = await getDB()
    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))
}

const removeNote = async (id) => {
    const { notes } = await getDB()
    const match = notes.find(note => note.id === id)
    if (match) {
        const new_db = notes.filter(note => note.id !== id)
        await saveDB(new_db)
        return id
    }
    return -1
}

const removeAllNotes = async () => {
    await saveDB({notes: []})
}

