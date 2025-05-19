#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { addNote, findNotes, getAllNotes, removeAllNotes, removeNote } from './src/note.js'

const printNote = (notes) => {
    console.log("Note: ", notes.content, "\t", notes.tags.join(', '))
    console.log('id: ', notes.id)
    console.log('\n')
}

yargs(hideBin(process.argv))
    .command(
        'new <note>',
        'Create new Note',
        yargs => {
            return yargs.positional(
                'note',
                {
                    description: 'The content of the note you want to create',
                    type: 'string'
                }
            )
        },
        async (argv) => {
            const tags = argv.tags ? argv.tags.split(' ') : []
            const note = argv.note
            const {id} = await addNote(note, tags)
            console.log('Note added!', id)
        }
    )
    .option('tags', {
        alias: 't',
        type: 'string',
        description: 'tags to add to the note'
    })
    .command(
        'find <filter>',
        'Search notes which has similar content with the filter',
        yargs => {
            return yargs.positional(
                'filter',
                {
                    description: 'The pattern your are searching',
                    type: 'string'
                }
            )
        },
        async (argv) => {
            const notes = await findNotes(argv.filter)
            printNote(notes)
        }
    )
    .command(
        'findAll',
        'Search notes which has similar content with the filter',
        yargs => {},
        async (argv) => {
            const notes = await getAllNotes()
            printNote(notes)
        }
    )
    .command(
        'remove <id>',
        'Remove the note with that id',
        yargs => {
            return yargs.positional(
                'id',
                {
                    description: 'The id of the targeted note',
                    type: 'string'
                }
            )
        },
        async (argv) => {
            const id = await removeNote(argv.id)
            if (id !== -1) {
                console.log("Note with id ", id, " was removed")
            } else {
                console.log("Something went wrong")
            }
        }
    )
    .command(
        'removeAll',
        'Remove all notes',
        yargs => {},
        async (argv) => {
            const notes = await removeAllNotes()
            console.log("Clean everything")
        }
    )
    .demandCommand(1)
    .parse()

