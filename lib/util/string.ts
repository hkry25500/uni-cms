

type StringType = 'letter' | 'cjk' | undefined;

export function withUpperCase(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function isLetter(str: string): boolean {
    return /^[a-zA-Z]$/.test(str);
}

export function isCJK(str: string): boolean {
    return /^[\u4E00-\u9FFF\u3000-\u303F\u30A0-\u30FF\u31F0-\u31FF]$/.test(str);
}

export function checkFirstCharType(str: string): StringType {
    if (str.length === 0) {
        return undefined;
    }

    const firstChar = str.charAt(0);

    if (isLetter(firstChar)) {
        return 'letter';
    } else if (isCJK(firstChar)) {
        return 'cjk';
    } else {
        return undefined;
    }
}

export function hasSpace(str: string): boolean {
    return /\s/.test(str);
}

export function extractInitials(str: string) {
    if (hasSpace(str)) {
        const parts: string[] = str.split(' ');
        if (checkFirstCharType(parts[0])==='letter' && checkFirstCharType(parts[1])==='letter') {
            const first = str.charAt(0).toUpperCase();
            const second = str.charAt(1).toUpperCase();
            return first+second;
        }
        else if (checkFirstCharType(parts[0])==='letter' && checkFirstCharType(parts[1])!=='letter') {
            return str.charAt(0).toUpperCase();
        }
        else if (checkFirstCharType(parts[0])==='cjk') {
            return str.charAt(0).toUpperCase();
        }
    }
    else {
        return str.charAt(0).toUpperCase();
    }
}

export function truncateWithEllipsis(str: string, maxLength: number, ellipsis: string = '...'): string {
    if (!str || str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + ellipsis;
}

export function maskPassword(str: string, maxLength: number): string {
    if (!str || str.length >= maxLength)
        return '•'.repeat(maxLength);
    else
        return '•'.repeat(str.length);
}