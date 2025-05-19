#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { addNote, findNotes, removeAllNotes, removeNote } from './src/note.js'

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
    .demandCommand(1)
    .parse()

