export interface bookModel {
    volumeInfo: VolumeInfoModel;
    searchInfo: SearchInfoModel;
}

export interface SearchInfoModel {
    textSnippet: string;
}

export interface VolumeInfoModel {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: Date;
    description: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
    printType: string;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

export interface IndustryIdentifier {
    type: string;
    identifier: string;
}

export interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

export interface ReadingModes {
    text: boolean;
    image: boolean;
}
