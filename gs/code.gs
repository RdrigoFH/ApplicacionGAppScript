function doGet(request) {
  return HtmlService.createTemplateFromFile('index').evaluate();
}
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
function processForm(formObject){
  var url="https://docs.google.com/spreadsheets/d/1h3qF85xditSkjMmTDZQCtlkfZxlRnahoQY1ZrzVjs_w/edit?pli=1#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("DataEntry");

  ws.appendRow([
    formObject.product_name,
    formObject.product_description,
    formObject.product_quantity,
    formObject.import_country,
    formObject.import_date,
    formObject.shipping_method   
    ]
  )
}