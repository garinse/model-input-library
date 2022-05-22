/**
 * Use to emit custom events of component
 */
export class EventEmiter {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZW1pdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50LWVtaXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBQXhCO1FBQ1UsZUFBVSxHQUFrQixFQUFFLENBQUM7SUFvQ3pDLENBQUM7SUFsQ0M7OztPQUdHO0lBQ0gsU0FBUyxDQUFDLFFBQStDO1FBQ3ZELE9BQU8sUUFBUSxLQUFLLFVBQVUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9CLE9BQU87WUFDTDs7ZUFFRztZQUNILFdBQVcsRUFBRSxHQUFHLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUM7WUFDaEUsQ0FBQztTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxLQUFTO1FBQ2IsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDO0NBQ0YifQ==