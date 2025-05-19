import { beforeEach, expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/db.js', () => ({
    getDB: jest.fn(),
    insertDB: jest.fn(),
    saveDB: jest.fn()
}));

const { getDB, insertDB, saveDB } = await import('../src/db.js')
const { addNote, findNotes } = await import('../src/note.js')

beforeEach(() => {
    insertDB.mockClear();
    getDB.mockClear;
    saveDB.mockClear;
})

test('addNotes inserts new data and returns it', async () => {
    const note = 'Test note'
    const tags = ['t1', 't2']
    const data = {
        tags,
        content: note,
        id: Date.now()
    }
    insertDB.mockResolvedValue
    const result = await addNote(note, tags)
    expect(result).toEqual(data)
    expect(insertDB).toHaveBeenCalled()
})

test('findNotes find notes based on pattern', async () => {
    const note = 'Test note'
    const tags = ['t1', 't2']
    const data = {
        tags,
        content: note,
        id: Date.now()
    }
    const data2 = {
        tags,
        content: "Ucl finals",
        id: Date.now()
    }
    const db = {
        notes: [
            data,
            data2
        ]
    }
    getDB.mockResolvedValue(db)
    const result = await findNotes("ucl")
    expect(result).toEqual([data2])
})
