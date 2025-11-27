export function generateHexFname(bytes: number = 32) {
    return crypto.randomUUID();
}