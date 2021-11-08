/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
 define(['N/ui/dialog'],

 function(dialog) {
     function validateLine(scriptContext) {
         var alertMessage = {
             title: 'Alert Message',
             message: 'Incorrect value of quantity'
         };

         var currentRecord = scriptContext.currentRecord;
         var currentQuantity = currentRecord.getCurrentSublistValue({
             sublistId: 'item',
             fieldId: 'quantity'
         });

         if (currentQuantity % 10 !== 0) {
             dialog.alert(alertMessage);
             return false;
         }

         return true;
     }

     function saveRecord(scriptContext) {
         var message = {
             title: 'Alert Message',
             message: 'Please select the Status Field'
         };
         var salesOrderRecord = scriptContext.currentRecord;
         var status = salesOrderRecord.getValue({
             fieldId: 'custbody_ant_status'
         });
         if (!status) {
             dialog.alert(message);
             return false;
         }
         // part 3
         salesOrderRecord.selectLine({
             sublistId: 'item',
             line: 0
         });

         salesOrderRecord.setCurrentSublistValue({
             sublistId: 'item',
             fieldId: 'custcol_ant_status_line',
             value: status,
             forceSyncSourcing: true
         });

         salesOrderRecord.commitLine({
             sublistId: 'item'
         });
         return true;
     }

     return {
         validateLine: validateLine,
         saveRecord: saveRecord
     };
 });
