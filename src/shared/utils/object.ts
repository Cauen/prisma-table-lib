type Obj = Record<any, any>
// Not working with react
// When open row and go back to list, dont capture route change
export function deepAssign2(target: Obj, ...sources: Obj[]) {
    for (const source of sources) {
        for (const k in source) {
            const vs = source[k], vt = target[k]
            if (Object(vs) == vs && Object(vt) === vt) {
                target[k] = deepAssign2(vt, vs)
                continue
            }
            target[k] = source[k]
        }
    }
    return target
}

export function deepAssign(...objects: Obj[]) {
    const isObject = (obj: Obj) => obj && typeof obj === 'object';
    
    return objects.reduce((prev, obj) => {
      Object.keys(obj).forEach(key => {
        const pVal = prev[key];
        const oVal = obj[key];
        
        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          prev[key] = pVal.concat(...oVal);
        }
        else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = deepAssign(pVal, oVal);
        }
        else {
          prev[key] = oVal;
        }
      });
      
      return prev;
    }, {});
  }

export function tryParseJson(str: string): any {
    try {
        return JSON.parse(str)
    } catch (err) {
        return str
    }
}