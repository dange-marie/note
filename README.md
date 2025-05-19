## 📝 `note` – CLI Note-Taking App

A simple and effective command-line interface (CLI) application to manage notes using Node.js.

### 🚀 Features

* ✅ Add a new note with optional tags
* 🔍 Find notes by content
* 📋 List all notes
* ❌ Remove a note by ID
* 💣 Remove all notes

---

### ⚙️ Installation

```bash
git clone git@github.com:dange-marie/note.git
cd note
npm install
```

---

### 🧪 Usage

Make the CLI executable globally (optional but handy):

```bash
npm link
```

Then you can run it as:

```bash
note new "Learn Jest" --tags "js,test"
note find "jest"
note findAll
note remove <note_id>
note removeAll
```

If not linked globally, use:

```bash
node index.js new "Learn Jest" --tags "js,test"
```

---

### 📁 Project Structure

```
note/
├── index.js           # CLI entry point
├── src/
│   └── note.js        # Logic to manage notes (add, find, remove)
├── __tests__/
│   └── note.test.js   # Unit tests with Jest
├── package.json
└── README.md
```

---

### 🧪 Testing with Jest

**Jest** is a testing framework for JavaScript that allows you to write unit tests easily.

#### ✅ Install Jest

```bash
npm install --save-dev jest
```

In your `package.json`, add:

```json
"scripts": {
  "test": "jest"
}
```

#### ✍️ Example Test (`__tests__/note.test.js`)

```js
import { addNote, findNotes, removeAllNotes } from '../src/note.js'

describe('Note CLI logic', () => {
  beforeEach(async () => {
    await removeAllNotes()
  })

  test('should add a note successfully', async () => {
    const note = await addNote("Learn Jest", ["test", "js"])
    expect(note.content).toBe("Learn Jest")
    expect(note.tags).toContain("test")
  })

  test('should find note by keyword', async () => {
    await addNote("Node.js CLI", ["cli"])
    const results = await findNotes("CLI")
    expect(results.length).toBeGreaterThan(0)
  })
})
```

#### 🏃 Run Tests

```bash
npm test
```

---

### 📌 Future Improvements

* Save notes to a local database (e.g., SQLite or MongoDB)
* Encrypt notes for privacy
* Add date filtering and advanced tag queries

---

### 👨‍💻 Author

**dange-marie**
