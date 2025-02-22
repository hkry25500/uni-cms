export function convertToFileURL(path: string) {
    return path.replace(/^([a-zA-Z]):\\/, 'file:///$1:/');
}