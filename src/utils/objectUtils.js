// import { diff } from 'deep-object-diff';
import { cloneDeep } from "lodash";

const isObj = obj => obj !== null && typeof obj === "object";
const isArray = obj => Array.isArray(obj);
const isNull = obj => obj === null;

const deepDiff = (a, b) => {
  // console.log('---deepDiff')

  if (isNull(a) || isNull(b)) {
    // console.log('is null',a,b)
    return b;
  }

  if (isArray(a) || isArray(b)) {
    // console.log('is array',a,b)
    return b;
  }
  if (!b) return {};
  const bKeys = Object.keys(b);
  const aKeys = Object.keys(a);
  const aDiff = aKeys.reduce((diff, key) => {
    const typeA = typeof a[key];
    const typeB = typeof b[key];
    let result = diff;

    if (!bKeys.includes(key)) {
      // console.log('!bKeys.includes(key)',key,a[key],b[key])
      result = { ...result, [key]: null };
    } else if (typeA !== typeB || isArray(a[key]) || isArray(b[key])) {
      // console.log('typeA !== typeB',key,a[key],b[key])
      result = { ...result, [key]: b[key] };
    } else if (isObj(a[key])) {
      const deep = deepDiff(a[key], b[key]);
      // console.log('obj',key,deep)
      if (deep && Object.keys(deep).length) result = { ...result, [key]: deep };
    } else if (a[key] !== b[key]) {
      // console.log('a[key]!==b[key]',key,a[key],b[key])
      result = { ...result, [key]: b[key] };
    } else {
      result = { ...result, [key]: b[key] };
      // console.log('else',key, a[key])
    }
    return { ...result };
  }, {});
  const bDiff = bKeys
    .filter(key => !aKeys.includes(key))
    .reduce((diff, key) => ({ ...diff, [key]: b[key] }), {});
  // console.log('aDiff',aDiff)
  // console.log('bDiff',bDiff)
  return { ...aDiff, ...bDiff };
};

export default {
  /**
   *
   * @param {Object} original
   * @param {Object} updatedObj
   * @returns {Object}
   * Возвращает объект со значениями,
   * которые не совпадают в сравниваемых объектах
   */
  diff(firstObj, secondObj) {
    return deepDiff(firstObj, secondObj);
  },
  /**
   *
   * @param {Object} firstObj
   * @param {Object} secondObj
   * @returns {Boolean}
   */
  isEqual(firstObj, secondObj) {
    return JSON.stringify(firstObj) === JSON.stringify(secondObj);
  },
  /**
   *
   * @param {Object} obj
   * @returns {Object}
   */
  copy(obj) {
    try {
      return cloneDeep(obj);
    } catch (e) {
      return null;
    }
  },

  /** Объединение 2 объектов с учетом глубины вложенности
   * @param {Object} firstObj
   * @param {Object} secondObj
   * @returns {Object}
   */
  deepUnion(firstObj, secondObj) {
    const resultObj = {
      ...firstObj
    };

    Object.keys(secondObj).forEach(key => {
      const hasOwnProperty = Object.prototype.hasOwnProperty.call(
        firstObj,
        key
      );

      if (
        typeof secondObj[key] === "object" &&
        !Array.isArray(secondObj[key]) &&
        hasOwnProperty
      ) {
        resultObj[key] = this.deepUnion(firstObj[key], secondObj[key]);
      } /* else if (Array.isArray(secondObj[key])) {
        for (let key2 in secondObj[key]) {
          resultObj[key][key2] = this.deepUnion({}, secondObj[key][key2]);
        }
      } */ else {
        resultObj[key] = secondObj[key];
      }
    });
    return resultObj;
  },
  /**
   * Преобразование массива из структуры дерево в плоский массив
   * @param {Array} arr - исходный массив
   * @param {String} childrenFieldName - имя поля в котором находятся дочерние элементы
   * @return {Array} - плосский массив из всех элементов.
   * */
  getArrayFlat(arr, childrenFieldName = "Children") {
    let result = [];
    arr.forEach(el => {
      const localEl = {
        ...el
      };
      const children =
        el[childrenFieldName] &&
        Array.isArray(el[childrenFieldName]) &&
        el[childrenFieldName].length > 0
          ? el[childrenFieldName]
          : [];
      // eslint-disable-next-line no-param-reassign
      delete el[childrenFieldName];
      result.push(localEl);
      if (children.length) {
        result = [...result, ...this.getArrayFlat(children, childrenFieldName)];
      }
    });
    return result;
  },

  /**
   * Получить значение поля в глубине объекта по указанному "пути".
   * Поддерживаются объекты и массивы.
   * @param { Object } obj          - объект, откуда нужно получить значение
   * @param { string } path         - путь до поля в формате "a.b[0].c"
   * @param { string } [separator]  - разделитель (опционально)
   * @returns { unknown | undefined } возвращает значение поля, если путь корректный
   *
   * @examples
   * const test = { a: { b: { c: "some" }, d: [{ e: "thing" }]} };
   * // получить поле
   * getObjectFieldByPath(test, "a.b.c") // => "some"
   *
   * // получить поле из элемента в массиве
   * getObjectFieldByPath(test, "a.d[0].e") // => "thing"
   *
   * // неверный путь (поля уже/еще нет,...)
   * getObjectFieldByPath(test, "a.b.g.h") // => undefined
   */
  getObjectFieldByPath(obj, path, separator = ".") {
    try {
      if (!obj || (obj && typeof obj !== "object")) {
        throw new Error(
          `utils.getObjectFieldByPath: недопустимое значение параметра "obj" - "${obj}".`
        );
      }
      if (!path || typeof path !== "string") {
        throw new Error(
          `utils.getObjectFieldByPath: недопустимое значение параметра "path" - "${path}".`
        );
      }

      // конвертируем индексы в свойства
      const pathFields = path.replace(/\[(\w+)\]/g, `${separator}$1`);
      // формируем массив и "спукаемся по объекту в глубь"
      return pathFields
        .split(separator)
        .reduce((level, key) => level && level[key], obj);
    } catch (error) {
      console.log("getObjectFieldByPath", { error });
      return null;
    }
  },

  /**
   * Поместить в глубине объекта по указанному "пути" переданное значение.
   * Поддерживаются объекты и массивы.
   * @param { Object }  obj  - объект, куда нужно поместить данные
   * @param { string }  path - путь для вставки в формате "a.b[0].c"
   * @param { unknown } data - данные для вставки
   * @param { string } [separator]  - разделитель (опционально)
   *
   * @returns { Object } возвращает новый объект с требуемой вставкой.
   *
   * @examples
   * const test = { a: { b: { c: "some" }, d: [{ e: "thing" }]} };
   * // вставить простое значение
   * insertInObjectByPath(test, 'a.b.c', 'new');
   * // => { a: { b: { c: 'new' }, d: [{ e: "thing" }] } }
   *
   * // вставить объект
   * insertInObjectByPath(test, 'a.b.c', { 'new': 12 });
   * // => { a: { b: { c: { new: 12 } }, d: [{ e: "thing"}] } }
   *
   * // расширить объект
   * insertInObjectByPath(test, 'a.b.new.2.0.h', 'deep');
   * // => { a: {b: {c: "some", new: [<2 empty slots>, [{ h: "deep"}]]}, d: [{ e: "thing"}]}}
   */
  insertInObjectByPath(obj, path, data, separator = ".") {
    if (!obj || (obj && typeof obj !== "object")) {
      throw new Error(
        `utils.insertInObjectByPath: недопустимое значение параметра "obj" - "${obj}".`
      );
    }
    if (!path || typeof path !== "string") {
      throw new Error(
        `utils.insertInObjectByPath: недопустимое значение параметра "path" - "${path}".`
      );
    }

    // конвертируем индексы в свойства
    const pathFields = path.replace(/\[(\w+)\]/g, `${separator}$1`);

    // новый объект
    const result = this.copy(obj);

    // формируем массив и "спукаемся по объекту в глубь"
    pathFields.split(separator).reduce((level, key, index, arr) => {
      // когда достигли целевого места, то помещаем данные
      const result = level;

      if (index === arr.length - 1) {
        result[key] = data;
        return result[key];
      }

      const nextKey = arr[index + 1];

      // если поле есть в структуре возвращаем для следующего шага вглубь
      if (key in result) {
        if (typeof result[key] !== "object") {
          const currentPath = arr.slice(0, index + 1).join(separator);
          throw new Error(
            `utils.insertInObjectByPath: невозможно поместить значение по ключу "${currentPath}",
              т.к. это поле не является объектом, а примитив с типом "${typeof result[
                key
              ]}".`
          );
        }

        // если в поле массив, но следующий ключ не числовой
        if (Array.isArray(result[key]) && !/^\d+$/.test(nextKey)) {
          const currentPath = arr.slice(0, index + 1).join(separator);
          const nextPath = arr.slice(0, index + 2).join(separator);
          throw new Error(
            `utils.insertInObjectByPath: невозможно поместить значение по ключу "${nextPath}",
              т.к. поле пути "${currentPath}" является массивом и следующий индекс/ключ ожидается числовым,
              а не строковым.`
          );
        }

        return result[key];
      }

      // нет поля по ключу, значит "расширяем объект":
      // — если следующий ключ числовой, значит массивом,
      // — иначе просто объектом.
      // eslint-disable-next-line no-return-assign
      return /^\d+$/.test(nextKey) ? (result[key] = []) : (result[key] = {});
    }, result);

    return result;
  }
};
