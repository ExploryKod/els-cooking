/**
 * Generates a unique filename with a timestamp and random number suffix.
 * @param originalName The original filename (with extension).
 * @param noWhitespace boolean to suppress any whitespace in file name
 */
export function generateUniqueFilename(originalName: string, noWhitespace=true): string {
    let fileNameParts: Array<string>;
    if(noWhitespace) {
        fileNameParts = originalName.replace(/ /g,"_").split('.');
    } else {
        fileNameParts = originalName.split('.');
    }

    const fileName = fileNameParts.slice(0, -1).join('.');
    const fileExtension = fileNameParts[fileNameParts.length - 1];
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    return `${fileName}_${uniqueSuffix}.${fileExtension}`;
}
