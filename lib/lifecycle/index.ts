// Singleton function to ensure only one db instance is created
export function singleton<T>(name: string, value: () => T): T {
    const globalAny: any = global;
    globalAny.__singletons = globalAny.__singletons || {};

    if (!globalAny.__singletons[name]) {
        globalAny.__singletons[name] = value();
    }

    return globalAny.__singletons[name];
}