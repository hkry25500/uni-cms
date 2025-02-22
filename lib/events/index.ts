/**
 * A simple implementation of an event emitter.
 */
class EventEmitter {
    private events: { [key: string]: Array<(...args: any[]) => void> };

    constructor() {
        this.events = {}; // Stores events and their corresponding callback functions
    }

    /**
     * Subscribes to an event with a listener function.
     * @param {string} event - The name of the event to subscribe to.
     * @param {function(...args: any[]): void} listener - The callback function to be invoked when the event is emitted.
     */
    subscribe(event: string, listener: (...args: any[]) => void) {
        if (!this.events[event]) {
            this.events[event] = []; // Initialize an empty array if the event does not exist
        }
        this.events[event].push(listener); // Add the listener to the event's array
    }

    /**
     * Unsubscribes a listener from an event.
     * @param {string} event - The name of the event to unsubscribe from.
     * @param {function(...args: any[]): void} listener - The callback function to remove from the event's listeners.
     */
    unsubscribe(event: string, listener: (...args: any[]) => void) {
        if (!this.events[event])
            return; // Return if the event does not exist
        this.events[event] = this.events[event].filter(l => l !== listener); // Remove the specified listener
    }

    /**
     * Publishes an event, invoking all subscribed listeners with the provided arguments.
     * @param {string} event - The name of the event to publish.
     * @param {...any} args - The arguments to pass to the listener functions.
     */
    publish(event: string, ...args: any[]) {
        if (!this.events[event])
            return; // Return if there are no subscribers
        this.events[event].forEach(listener => listener(...args)); // Call all subscribed listener functions
    }
}

export default EventEmitter;
