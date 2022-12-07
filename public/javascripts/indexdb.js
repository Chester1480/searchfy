
function openDB(dbName,dbVersion=1){
    let request = window.indexedDB.open(dbName, dbVersion)
    request.onerror = e => {
        console.log('打開資料庫出現錯誤', e)
    }
    request.onsuccess = e => {
        let db = e.target.result
        console.log('打開資料庫成功')
        return db;
    }
    request.onupgradeneeded = e => {
        console.log('資料庫版本更新')
    }
}

function deleteDatabase(dbName){
    window.indexedDB.deleteDatabase(dbName);
}