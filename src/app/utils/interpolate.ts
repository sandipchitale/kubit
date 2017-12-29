
export function interpolate(template, contextObject, fallback: string = '') {
    return template.replace(regex, (match) => {
        const path = match.slice(2, -1).trim();
        return getValueAtDottedPath(path, contextObject, fallback);
    });
}

const regex = /\${[^{]+}/g;
//get the specified property or nested property of an object
const getValueAtDottedPath = (path, obj, fallback) => {
    return path.split('.').reduce((res, key) => res[key] || fallback, obj);
}