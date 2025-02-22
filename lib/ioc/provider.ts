class ServiceProvider {
    constructor() {
        // Initialize the global.__singletons object
        if (!global.__singletons) {
            global.__singletons = {};
        }
    }

    /**
     * Adds a singleton service to the provider.
     * If an instance already exists, it returns the existing instance.
     *
     * @param Class - The class constructor for the service.
     * @param args - The arguments to pass to the class constructor.
     * @returns The singleton instance of the service.
     */
    createSingleton<T>(Class: new (...args: any[]) => T, ...args: any[]): T {
        const className = Class.name; // Get the class name

        // Return the existing instance if it already exists
        if (global.__singletons[className]) {
            return global.__singletons[className];
        }

        // Create a new instance and store it
        const instance = new Class(...args); // Pass the arguments to the constructor
        global.__singletons[className] = instance; // Store the instance
        return instance; // Return the newly created instance
    }

    /**
     * Adds a singleton service to the provider.
     *
     * @param Class - The class constructor for the service.
     * @param args - The arguments to pass to the class constructor.
     * @returns The ServiceProvider instance for method chaining.
     */
    addSingleton<T>(Class: new (...args: any[]) => T, ...args: any[]): ServiceProvider {
        this.createSingleton<T>(Class, ...args);
        return this;
    }

    /**
     * Retrieves a service instance from the provider.
     *
     * @param Class - The class constructor for the service.
     * @returns The instance of the service.
     */
    getRequiredService<T>(Class: new (...args: any[]) => T): T {
        const className = Class.name;
        return global.__singletons[className];
    }

    /**
     * Retrieves a service instance from the provider.
     *
     * @param Class - The class constructor for the service.
     * @returns The instance of the service, or undefined if not found.
     */
    getService<T>(Class: new (...args: any[]) => T): T | undefined {
        const className = Class.name; // Get the class name
        return global.__singletons[className]; // Retrieve the instance from global.__singletons
    }

    /**
     * Retrieves a service instance by its class name.
     *
     * @param className - The name of the class for the service.
     * @returns The instance of the service, or undefined if not found.
     */
    get<T>(className: string): T | undefined {
        return global.__singletons[className];
    }
}

const services = new ServiceProvider();

export default services; // Export the ServiceProvider instance
