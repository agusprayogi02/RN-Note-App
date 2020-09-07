// import SQLite from 'react-native-sqlite-storage'

// SQLite.DEBUG(true)

// const db = SQLite.openDatabase(
//   {
//     name: 'notes',
//     key: 'notes-app',
//     location: 'default',
//   },
//   (rest) => {
//     console.log('rest :>> ', rest)
//   },
//   (error) => {
//     console.log('ERROR: ' + error)
//   },
// )

// const ExecuteQuery = (sql, param = []) => {
//   new Promise((resolve, reject) => {
//     db.transaction((trans) => {
//       trans.executeSql(
//         sql,
//         params,
//         (trans, results) => {
//           resolve(results)
//         },
//         (error) => {
//           reject(error)
//         },
//       )
//     })
//   })
// }

// const insertData = async ({judul, isi}) => {
//   var Table = await ExecuteQuery('INSERT INTO notes(judul, isi) VALUES (?,?)'[(judul, isi)])
//   console.log('Resort :>> ', Table)
// }

// const CreateTable = async () => {
//   var Table = await ExecuteQuery(
//     'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTO_INCREMENT, judul TEXT(50), isi TEXT(225))',
//     [],
//   )
//   console.log('Table :>> ', Table)
// }

// const showAll = async () => {
//   var selectQuery = await ExecuteQuery('SELECT * FROM notes', [])
//   console.log(selectQuery)
//   if (selectQuery != null) {
//     var rows = selectQuery.rows
//     for (let i = 0; i < rows.length; i++) {
//       var item = rows.item(i)
//       console.log(item)
//     }
//   }
// }

// export {CreateTable, insertData, showAll, ExecuteQuery}
