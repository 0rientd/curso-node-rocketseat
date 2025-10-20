export class Database {
  // Usar o "#" torna o atributo privado
  #database = {}

  select(table) {
    const data = this.#database[table] ?? []
    
    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    return data
  }
}