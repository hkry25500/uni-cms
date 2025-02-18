/**
 * @deprecated This function is deprecated and will be removed in future versions.
 * Use the IoC Service Provider instead.
 *
 * @param name - The name of the singleton instance.
 * @param value - A function that returns the singleton instance.
 * @returns The singleton instance.
 */
export function singleton<T>(name: string, value: () => T): T {
    const globalAny: any = global;
    globalAny.__singletons = globalAny.__singletons || {};

    if (!globalAny.__singletons[name]) {
        globalAny.__singletons[name] = value();
    }

    return globalAny.__singletons[name];
}