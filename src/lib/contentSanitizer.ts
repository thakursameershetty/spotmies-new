export const sanitizeContent = (content: any): string => {
    if (!content || typeof content !== 'string') return '';

    // Remove specific corrupted base64 string and trailing empty tags
    let cleaned = content
        .replace(/K47rSRD3I2JUeG9FFdGa4RzcT90ircnvxjoEx\/wDpqFJyKKKyP5M2fxHSUzkAaKKGCEPOmj\/20h8WFFFA\/Bp8MYiyC9MmsmcYnkA5Bz\+NFFWZvxxKMH5ZjBzoOx2oorKaxKUEjlRRQMVRqzknYbUAbGiigQho1kCiigD\/2Q=="><p><\/p>"$/g, '')
        .replace(/<p><\/p>$/g, '')
        .trim();

    return cleaned;
};

export const createExcerpt = (content: any, maxLength = 150): string => {
    const sanitized = sanitizeContent(content);

    if (!sanitized) {
        return 'Discover insights and trends in technology and innovation...';
    }

    // Strip HTML tags for the excerpt
    const plainText = sanitized.replace(/<[^>]+>/g, '');

    if (plainText.length <= maxLength) {
        return plainText;
    }

    return plainText.substring(0, maxLength) + '...';
};