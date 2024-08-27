export type GoogleDriveMimeType =
  // Documentos de Google
  | "application/vnd.google-apps.document"
  | "application/vnd.google-apps.spreadsheet"
  | "application/vnd.google-apps.presentation"
  | "application/vnd.google-apps.drawing"
  | "application/vnd.google-apps.form"
  | "application/vnd.google-apps.script"
  | "application/vnd.google-apps.site"
  | "application/vnd.google-apps.folder"
  | "application/vnd.google-apps.file"
  | "application/vnd.google-apps.shortcut"
  | "application/vnd.google-apps.map"
  
  // Documentos de Office
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "application/msword" // .doc
  | "application/vnd.ms-excel" // .xls
  | "application/vnd.ms-powerpoint" // .ppt

  // Archivos de Texto
  | "text/plain" // .txt
  | "application/rtf" // .rtf
  | "application/pdf" // .pdf
  | "text/csv" // .csv
  | "text/html" // .html

  // Imágenes
  | "image/jpeg" // .jpeg, .jpg
  | "image/png" // .png
  | "image/gif" // .gif
  | "image/bmp" // .bmp
  | "image/svg+xml" // .svg
  | "image/tiff" // .tiff
  | "image/webp" // .webp
  | "image/x-icon" // .ico
  | "image/vnd.adobe.photoshop" // .psd
  
  // Audio
  | "audio/mpeg" // .mp3
  | "audio/x-wav" // .wav
  | "audio/ogg" // .ogg
  | "audio/aac" // .aac

  // Video
  | "video/mp4" // .mp4
  | "video/x-msvideo" // .avi
  | "video/quicktime" // .mov
  | "video/x-ms-wmv" // .wmv
  | "video/mpeg" // .mpeg
  | "video/x-matroska" // .mkv
  | "video/x-flv" // .flv

  // Archivos Comprimidos
  | "application/zip" // .zip
  | "application/x-rar-compressed" // .rar
  | "application/x-7z-compressed" // .7z
  | "application/x-tar" // .tar
  | "application/gzip" // .gz

  // Otros
  | "application/octet-stream"
  | "application/json" // .json
  | "application/xml" // .xml
  | "application/javascript" // .js
  | "text/css" // .css
  | "text/markdown" // .md
  | "application/epub+zip" // .epub
  | "text/calendar" // .ics
  | "text/vcard" // .vcf
  | "application/vnd.oasis.opendocument.text" // .odt
  | "application/vnd.oasis.opendocument.spreadsheet" // .ods
  | "application/vnd.oasis.opendocument.presentation" // .odp
  | "application/vnd.google-earth.kml+xml" // .kml
  | "application/vnd.google-earth.kmz" // .kmz

  // Fuentes
  | "font/ttf" // .ttf
  | "font/otf" // .otf
  | "font/woff" // .woff
  | "font/woff2" // .woff2

  // Microsoft Publisher
  | "application/vnd.ms-publisher" // .pub

  // Adobe
  | "application/x-shockwave-flash" // .swf
  | "application/vnd.adobe.illustrator" // .ai
  | "application/x-indesign" // .indd
  | "application/vnd.adobe.acrobat" // .pdf (utilizado internamente por algunas versiones de Acrobat)

  // iWork
  | "application/vnd.apple.keynote" // .key
  | "application/vnd.apple.pages" // .pages
  | "application/vnd.apple.numbers" // .numbers

  // Google Archive
  | "application/vnd.google.archive";

export type GoogleDriveFile = {
  mimeType: GoogleDriveMimeType;
  webViewLink: string;
  webContentLink: string;
  id: string;
  name: string;
}

export type GoogleDriveFolder = 'icons'

export enum Folder {
  'icons'= '1nHeh8Y7MDnHcWxro4e7sKXExPdeR6FHj'
}

export type Files = {
  kind: string;
  mimeType: string;
  id: string;
  name: string;
}

export type FolderContent = {
  kind: string;
  incompleteSearch: boolean;
  files: Files[]
}