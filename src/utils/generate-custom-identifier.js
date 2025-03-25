const generateCustomIdentifier = (prefix = 'EXAMPLE') => {
    // Generate nomor acak antara 1000 dan 9999
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    // Generate karakter acak dari A-Z
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));  // A-Z

    // Gabungkan semua bagian menjadi format seperti "EXAMPLE1234A"
    const uniqueIdentifier = `${prefix}${randomNumber}${randomChar}`;

    return uniqueIdentifier;
}

export default generateCustomIdentifier;