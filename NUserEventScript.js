/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

 define(['N/log', 'N/email', 'N/runtime', 'N/render', 'N/redirect', 'N/record'],

 function(log, email, runtime, render, redirect, record) {
     function beforeSubmit(scriptContext) {
         var invoiceRecord = scriptContext.newRecord;

         var amount = invoiceRecord.getValue({
             fieldId: 'total'
         });

         if (scriptContext.type === scriptContext.UserEventType.EDIT && amount > 2000) {
             invoiceRecord.setValue({
                 fieldId: 'memo',
                 value: 'Money Money!'
             });
         }
     }

     function afterSubmit(scriptContext) {
         var invoiceRecord = scriptContext.newRecord;
         var total = invoiceRecord.getValue({
             fieldId: 'total'
         });

         var transactionid = invoiceRecord.getValue({
             fieldId: 'tranid'
         });

         var chooseEmployee = invoiceRecord.getValue({
             fieldId: 'custbody_ant_choose_employee'
         });

         // return the file of the transaction to use it in attachments
         var transactionFile = render.transaction({
             entityId: 3253,
             printMode: render.PrintMode.PDF,
             inCustLocale: true
         });

         if (total > 3000) {
             email.send({
                 author: runtime.getCurrentUser().id,
                 recipients: chooseEmployee,
                 subject: 'The amount is too high',
                 body: 'The invoice ' + transactionid + ' is too high!',
                 attachments: [transactionFile]
             });
         }

         // part 4
         var itemLines = invoiceRecord.getLineCount({
             sublistId: 'item'
         });

         var currCustom = invoiceRecord.getValue({
             fieldId: 'entity'
         });

         if (itemLines >= 5) {
             redirect.toRecord({
                 id: currCustom,
                 type: record.Type.CUSTOMER
             });
         }
     }
     return {
         beforeSubmit: beforeSubmit,
         afterSubmit: afterSubmit
     };
 });
