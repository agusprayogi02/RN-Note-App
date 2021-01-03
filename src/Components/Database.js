import SQLite from 'react-native-sqlite-storage'
SQLite.DEBUG(true)

const database = SQLite.openDatabase({
  name: 'notes.db',
  location: 'Documents',
  key: 'crud Gis',
})

const db = () => {
  return database
}

const createTable = () => {
  db().transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT, judul TEXT(50),isi TEXT(500), tanggal TEXT(100))',
      [],
    )
  })
}

const insert = (data) => {
  db().transaction((tx) => {
    tx.executeSql('INSERT INTO notes (judul, isi, tanggal) VALUES (?, ?, ?)', [
      data.judul,
      data.isi,
      data.tanggal,
    ])
  })
}

const ubah = (data, id) => {
  db().transaction((tx) => {
    tx.executeSql(
      "UPDATE notes SET judul = '" +
        data.judul +
        "', isi = '" +
        data.isi +
        "', tanggal = '" +
        data.tanggal +
        "' WHERE id = " +
        id,
      [],
    )
  })
}

const hapus = (id) => {
  db().transaction((tx) => {
    tx.executeSql('DELETE FROM notes WHERE id = ?', [id])
  })
}

export {db, createTable, insert, ubah, hapus}
