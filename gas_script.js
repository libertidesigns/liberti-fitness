// ============================================================
//  LIBERTI FITNESS — Google Apps Script (opravená verze)
//  DŮLEŽITÉ: Po vložení kódu nejprve spusť initSpreadsheet()!
//  Pak znovu nasaď jako Web App a zkopíruj novou URL.
// ============================================================

function initSpreadsheet() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SPREADSHEET_ID');
  if (!id) {
    var ss = SpreadsheetApp.create('LIBERTI Fitness Data');
    id = ss.getId();
    props.setProperty('SPREADSHEET_ID', id);
    ss.insertSheet('workouts');
    ss.insertSheet('progress');
    ss.insertSheet('nutrition');
    ss.insertSheet('settings');
    Logger.log('Spreadsheet vytvořen: ' + ss.getUrl());
  } else {
    Logger.log('Spreadsheet jiz existuje, ID: ' + id);
  }
  return id;
}

function getSpreadsheet() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SPREADSHEET_ID');
  if (!id) throw new Error('Nejprve spust funkci initSpreadsheet()!');
  return SpreadsheetApp.openById(id);
}

function getSheet(name) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function doGet(e) {
  var p = e.parameter;
  var action = p.action;
  var type = p.type;
  var callback = p.callback;
  var result;
  try {
    if (action === 'read') {
      result = readData(type);
    } else if (action === 'write') {
      result = writeData(type, decodeURIComponent(p.data || '[]'));
    } else {
      result = { ok: false, error: 'Neznámá akce: ' + action };
    }
  } catch(err) {
    result = { ok: false, error: err.toString() };
  }
  var output = callback + '(' + JSON.stringify(result) + ')';
  return ContentService
    .createTextOutput(output)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function readData(type) {
  var sheet = getSheet(type);
  var val = sheet.getRange(1, 1).getValue();
  if (!val) return { ok: true, data: [] };
  try {
    return { ok: true, data: JSON.parse(val) };
  } catch(e) {
    return { ok: true, data: [] };
  }
}

function writeData(type, dataStr) {
  var sheet = getSheet(type);
  sheet.getRange(1, 1).setValue(dataStr);
  return { ok: true };
}
