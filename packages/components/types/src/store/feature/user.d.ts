import { StoreDefinition } from 'pinia';
export declare const useUserStore: StoreDefinition<"user", {
    name: string;
}, {}, {
    updateName(name: string): void;
}>;
