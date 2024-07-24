export type File = {
    description?: string;
    id: number;
    title: string;
};

export type Channel = {
    description?: string;
    files: File[];
    id: number;
    title: string;
};

export type ProjectDataType = {
    files: File[];
    channels: Channel[];
    subscriptions: number[];
};

export type ProjectDataContextType = {
    data: ProjectDataType;
};