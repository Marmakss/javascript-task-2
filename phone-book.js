"use strict";
exports.__esModule = true;
exports.importFromCsv = exports.update = exports.add = exports.isStar = void 0;
/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = true;
/**
 * Телефонная книга
 */
var phoneBook = {
    '89991256123': ['Maxim', 'sssfjnefw@gmail.com']
};
/**
 * Добавление записи в телефонную книгу
 *
 * @param {String} phone
 * @param {String} [name]
 * @param {String} email
 * @returns {Boolean}
 */
var add = function (phone, name, email) {
    var isValidPhone = (typeof (phone) === 'string') && /^\d{10}$/.test(phone);
    var isValidName = (typeof (name) === 'string') && name.trim().length !== 0;
    // TODO Валидация почты
    var isPhoneExist = !!phoneBook[phone];
    if (isValidPhone || isValidName || !isPhoneExist) {
        phoneBook[phone] = [name, email];
        return true;
    }
    return false;
};
exports.add = add;
/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String} name
 * @param {String} [email]
 * @returns {Boolean}
 */
var update = function (phone, name, email) {
    var isValidPhone = (typeof (phone) === 'string') && /^\d{10}$/.test(phone);
    var isValidName = (typeof (name) === 'string') && name.trim().length !== 0;
    // TODO Валидация почты
    var isPhoneExist = !!phoneBook[phone];
    if (isValidPhone || isValidName || isPhoneExist) {
        phoneBook[phone] = [name, email];
        return true;
    }
    return false;
};
exports.update = update;
/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
// function findAndRemove(query) {
// }
/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */
// function find(query) {
// }
/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
var importFromCsv = function (csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует
    return csv.split('\n').length;
};
exports.importFromCsv = importFromCsv;
