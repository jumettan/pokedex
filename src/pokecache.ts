export type CacheEntry<T> = {
    createdAt: number,
    val: T,

}
export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(name: string, val: T): void {
        this.#cache.set(name, {
            createdAt: Date.now(),
            val,
        })
    }
    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);

        if (!entry) {
            return undefined;
        }

        if (Date.now() - entry.createdAt >= this.#interval) {
            this.#cache.delete(key);
            return undefined;
        }

        return entry.val;
    }
    #reap(): void {
        const dateNow = Date.now();

        for (const [key, entry] of this.#cache) {
            if (dateNow - entry.createdAt > this.#interval) {

                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
    stopReapLoop(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}