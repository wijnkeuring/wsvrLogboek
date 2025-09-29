function doGet() {
  var template = HtmlService.createTemplateFromFile('Index');
  return template.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


/**
 * Haal alle rijen op uit het blad "Logboek".
 */
function getSheetData() {
  var wb = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = wb.getSheetByName("Logboek");
  var data = sheet.getDataRange().getValues();
  return JSON.stringify(data);
}


/**
 * Voeg een nieuwe rij toe aan het blad "Logboek".
 * 
 * Verwacht de volgende kolomvolgorde:
 * Datum, Wat, Waarom, Hoe, Wie, Lidnummer, Objectnummer, Ligplaats
 */
function submitFormToSheet(date, wat, waarom, hoe, wie, lidnummer, objectnummer, ligplaats, bestandsLinks) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Logboek");
  
  // Zorg dat je headers hebt: Datum, Wat, Waarom, Hoe, Wie, Lidnummer, Objectnummer, Ligplaats, Bestanden
  sheet.appendRow([date, wat, waarom, hoe, wie, lidnummer, objectnummer, ligplaats, bestandsLinks]);
}


function uploadFileToDrive(file) {

  //https://drive.google.com/drive/folders/1RvwkMPrv4YaFa4e5jaQphdhO_NsKvS-A?usp=drive_link
  const folderId = "1RvwkMPrv4YaFa4e5jaQphdhO_NsKvS-A"; // ← Vervang dit met je echte folder ID
  const folder = DriveApp.getFolderById(folderId);
  
  const blob = Utilities.newBlob(Utilities.base64Decode(file.data), file.mimeType, file.filename);
  const uploadedFile = folder.createFile(blob);
  
  // Delen met link inschakelen
  uploadedFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  return uploadedFile.getUrl(); // Bestandslink terugsturen
}
