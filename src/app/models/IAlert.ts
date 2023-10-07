export interface IAlert {
    type?: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' | 'light' | 'dark';
    title?: string;
    message?: string;
    messageLoad?: string;
    load?: boolean;
    time?: number;
    transactionState?: number | string;
}
