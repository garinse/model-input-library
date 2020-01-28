/**
 * Use to emit custom events of component
 */
export class EventEmmiter {
    constructor() {
        this._observers = [];
    }
    /**
     * Registers handlers for events emitted by this instance.
     * @param observer or callback function
     */
    subscribe(observer) {
        typeof observer === 'function' && (observer = { next: observer });
        this._observers.push(observer);
        return {
            /**
             * Disposes the resources held by the subscription
             */
            unsubscribe: () => {
                this._observers = this._observers.filter(o => o !== observer);
            }
        };
    }
    /**
     * Releases All Subscriptions
     */
    unsubscribe() {
        this._observers = [];
    }
    /**
     * Notifies all subscribers
     * @param value
     */
    emmit(value) {
        for (const observer of this._observers) {
            observer.next(value);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZW1taXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudC1lbW1pdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFBekI7UUFDVSxlQUFVLEdBQWtCLEVBQUUsQ0FBQztJQW9DekMsQ0FBQztJQWxDQzs7O09BR0c7SUFDSCxTQUFTLENBQUMsUUFBK0M7UUFDdkQsT0FBTyxRQUFRLEtBQUssVUFBVSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0IsT0FBTztZQUNMOztlQUVHO1lBQ0gsV0FBVyxFQUFFLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQztZQUNoRSxDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQVM7UUFDYixLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Q0FDRiJ9