// ============================================================
//  LIBERTI FITNESS — Google Apps Script
//  Vlož tento kód do Google Apps Script (script.google.com)
//  a nasaď jako Web App (viz SETUP.md)
// ============================================================

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

function getSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
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
