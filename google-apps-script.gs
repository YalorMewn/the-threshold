/**
 * Google Apps Script — The Threshold Form Webhook
 * 
 * Setup instructions:
 * 1. Open Google Sheets → create a new spreadsheet named "Threshold Applications"
 * 2. Add headers in row 1: Timestamp | Name | Age | Location | Occupation | Relationship | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Commitment Scale | Commitment Why | Agreements
 * 3. Extensions → Apps Script
 * 4. Replace the default code with the entire contents of this file
 * 5. Save as "Code.gs", click Deploy → New deployment → Web app
 * 6. Execute as: Me | Who has access: Anyone (or Anyone with Google account)
 * 7. Copy the Web App URL and give it to me so I can wire it into the form
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    var row = [
      new Date(),               // Timestamp
      data.name || "",
      data.age || "",
      data.location || "",
      data.occupation || "",
      data.relationship || "",
      data.q1 || "",
      data.q2 || "",
      data.q3 || "",
      data.q4 || "",
      data.q5 || "",
      data.q6 || "",
      data.q7 || "",
      data.q8 || "",
      data.q9 || "",
      data.q10 || "",
      data.q11 || "",
      data.q12 || "",
      data.q13 || "",
      data.q14 || "",
      data.q15 || "",
      data.commitment_scale || "",
      data.commitment_why || "",
      data.agreements || ""
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({ "Access-Control-Allow-Origin": "*" });
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({ "Access-Control-Allow-Origin": "*" });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Webhook is live. Use POST.")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({ "Access-Control-Allow-Origin": "*" });
}
