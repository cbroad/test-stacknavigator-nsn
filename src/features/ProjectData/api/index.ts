import type {Channel, File, ProjectDataType} from '../types';


export function generateId() : number {
    return Math.floor(100000 * Math.random());
}

export function generateFile() : File;
export function generateFile(title:string) : File;
export function generateFile(title:string, description:string) : File;
export function generateFile(title?:string, description?:string) : File {
    const id = generateId();
    return {
        description: description ?? `Description of File-${id}`,
        id: id,
        title: title ?? `File-${id}`,
    };
}

export function generateFiles() : File[];
export function generateFiles(count:number) : File[];
export function generateFiles(count:number=10) : File[] {
    return Array(count).fill(1).map(()=>generateFile());
}

export function generateChannel() : Channel;
export function generateChannel(title:string) : Channel;
export function generateChannel(title:string, description:string) : Channel;
export function generateChannel(title?:string, description?:string) : Channel {
    const id = generateId();
    return {
        files: generateFiles(),
        description: description ?? `Description of Channel-${id}`,
        id: id,
        title: title ?? `Channel-${id}`,
    };
}

export function generateChannels() : Channel[];
export function generateChannels(count:number) : Channel[];
export function generateChannels(count:number=10) : Channel[] {
    return Array(count).fill(1).map(()=>generateChannel());
}

export function generateProjectData() : ProjectDataType {
    const channels = generateChannels();
    const files = channels.reduce((arr, channel) => ([...arr, ...channel.files]), [] as File[])
    const subscriptions = channels.reduce((arr, channel) => {
        if(Math.floor(Math.random() * 1.5)) {
            arr.push(channel.id);
        }
        return arr;
    }, [] as number[]);
    return {
        files,
        channels,
        subscriptions,
    };
}

// localStorage.removeItem('ProjectData');

console.log( localStorage.getItem('ProjectData') && 'Loading ProjectData' || 'Generating ProjectData' );

export const ProjectData = localStorage.getItem('ProjectData') && JSON.parse(localStorage.getItem('ProjectData')!) || generateProjectData();

console.log( ProjectData.channels.reduce( (R:number, chan:Channel) => R<chan.id ? chan.id : R, 0))

if(localStorage.getItem('ProjectData')===null) {
    localStorage.setItem('ProjectData', JSON.stringify(ProjectData))
}