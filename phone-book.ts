// неявная сортировка

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
export const isStar = true;

interface IPhoneBook {
    [key: string]: [string, string?]
}
/**
 * Телефонная книга
 */
let phoneBook: IPhoneBook = {};

function validateContact(phone: string, name: string): boolean {

    const isValidPhone = (typeof (phone) === 'string') && /^\d{10}$/.test(phone);
    const isValidName = (typeof (name) === 'string') && name.trim().length !== 0;

    if (isValidPhone && isValidName) {
        return true
    }
    return false
}

/**
 * Добавление записи в телефонную книгу
 *
 * @param {String} phone
 * @param {String} name
 * @param {String} [email]
 * @returns {Boolean}
 */

export function add(phone: string, name: string, email?: string): boolean {

    const isPhoneExist = !!phoneBook[phone];

    if (validateContact(phone, name) && !isPhoneExist) {
        if (email) {
            phoneBook[phone] = [name, email];
        } else {
            phoneBook[phone] = [name];
        }
        return true;
    }
    return false;
}


/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} [email]
 * @returns {Boolean}
 */

export function update(phone: string, name: string, email?: string): boolean {

    const isPhoneExist = !!phoneBook[phone];

    if (validateContact(phone, name) && isPhoneExist) {
        if (email) {
            phoneBook[phone] = [name, email];
        } else {
            phoneBook[phone] = [name];
        }
        return true;
    }
    return false;
}

function filterPhoneBook(query: string): string[] {

    if (!query) {
        return [];
    }

    if (query === '*') {
        return Object.keys(phoneBook);
    }

    const filterResult = Object.keys(phoneBook).filter((phone) => {

        const isPhoneFound: boolean = phone.toLowerCase().includes(query.toLowerCase())
        const isNameFound: boolean = phoneBook[phone][0].toLowerCase().includes(query.toLowerCase())
        const isEmailFound: boolean | undefined = phoneBook[phone][1]?.toLowerCase().includes(query.toLowerCase())

        if ((isPhoneFound || isNameFound || isEmailFound)) {
            return true
        } else {
            return false
        }

    })

    return filterResult

}

function sortFunction(a, b) {
    if (a > b) {
        return 1;
    }
    if (b > a) {
        return -1;
    }
    return 0;
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query   
 * @returns {Number}
 */

export function findAndRemove(query: string): number {
    let deletedCount = 0
    const fiteredContacts = filterPhoneBook(query)

    fiteredContacts.forEach((element) => {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [element]: phone, ...newPhoneBook } = phoneBook;
        phoneBook = newPhoneBook
        deletedCount++
    })

    return deletedCount;
}


/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */

export function find(query: string): string[] {

    const fiteredContacts = filterPhoneBook(query)

    const parsedPhoneBook = fiteredContacts.map((phone) => {

        const name: string = phoneBook[phone][0]
        const email: string | undefined = phoneBook[phone][1]
        const modifiedPhone = `+7 (${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 8)}-${phone.substring(8, 10)}`

        if (email) {
            return `${name}, ${modifiedPhone}, ${email}`
        }
        else {
            return `${name}, ${modifiedPhone}`
        }
    })

    return parsedPhoneBook.sort(sortFunction)
}

export const importFromCsv = (csv: string): number => {

    const csvStringsFormat: string[] | null = csv.match(/.+(?=\n)/g)
    let counter = 0

    if (!csvStringsFormat) {
        return 0;
    }

    csvStringsFormat.forEach((element, i) => {
        const contact = csvStringsFormat[i].split(';')

        const phone = contact[1]
        const name = contact[0]
        const email = contact[2]

        if (email) {
            if (update(phone, name, email) || add(phone, name, email)) {
                counter++
            }
        }
        else {
            if (update(phone, name) || add(phone, name)) {
                counter++
            }
        }
    })

    return counter;
}