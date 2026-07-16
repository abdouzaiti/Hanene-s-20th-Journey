export const EventBus = {
  events: new Map<string, Function[]>(),
  
  on(event: string, callback: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  },
  
  emit(event: string, ...args: any[]) {
    if (this.events.has(event)) {
      this.events.get(event)!.forEach(callback => callback(...args));
    }
  },
  
  off(event: string, callback: Function) {
    if (this.events.has(event)) {
      this.events.set(
        event,
        this.events.get(event)!.filter(cb => cb !== callback)
      );
    }
  }
};
