/**
 * Google Apps Script — The Threshold Form Webhook
 * 
 * Setup instructions:
 * 1. Open Google Sheets → create a new spreadsheet named "Threshold Applications"
 * 2. In the first sheet (rename it to "Applications"), add headers in row 1:
 *    Timestamp | Name | Email | Age | Location | Occupation | Relationship | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Commitment Scale | Commitment Why | Agreements
 * 3. Create a second sheet named "Emails" — headers: Timestamp | Name | Email
 *    (Or let the script auto-create it on first submission)
 * 4. Extensions → Apps Script
 * 5. Replace the default code with the entire contents of this file
 * 6. Save as "Code.gs", click Deploy → New deployment → Web app
 * 7. Execute as: Me | Who has access: Anyone (or Anyone with Google account)
 * 8. Copy the Web App URL and give it to me so I can wire it into the form
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // ---- Applications sheet ----
    var appSheet = ss.getSheetByName("Applications") || ss.getSheets()[0];
    var appRow = [
      new Date(),               // Timestamp
      data.name || "",
      data.email || "",
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
    appSheet.appendRow(appRow);

    // ---- Emails sheet ----
    var emailSheet = ss.getSheetByName("Emails");
    if (!emailSheet) {
      emailSheet = ss.insertSheet("Emails");
      emailSheet.appendRow(["Timestamp", "Name", "Email"]);
    }
    var emailRow = [new Date(), data.name || "", data.email || ""];
    emailSheet.appendRow(emailRow);

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
