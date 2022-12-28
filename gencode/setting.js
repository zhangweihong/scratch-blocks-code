var Names = Blockly.Names;
var Variables = Blockly.Variables;
var NameType = Blockly.NameType;
var ConnectionType = {
  // A right-facing value input.  E.g. 'set item to' or 'return'.
  INPUT_VALUE : 1,
  // A left-facing value output.  E.g. 'random fraction'.
  OUTPUT_VALUE : 2,
  // A down-facing block stack.  E.g. 'if-do' or 'else'.
  NEXT_STATEMENT : 3,
  // An up-facing block stack.  E.g. 'break out of loop'.
  PREVIOUS_STATEMENT : 4
};
var inputTypes = {
  // A right-facing value input.  E.g. 'set item to' or 'return'.
  VALUE : ConnectionType.INPUT_VALUE,
  // A down-facing block stack.  E.g. 'if-do' or 'else'.
  STATEMENT : ConnectionType.NEXT_STATEMENT,
  // A dummy input.  Used to add field(s) with no input.
  DUMMY : 5
};

// Blockly.Procedures.externalProcedureDefCallback = function(data){
//   console.log("externalProcedureDefCallback",data);
// };
// console.log("Blockly.DataCategory",Blockly.DataCategory);


function findRepeatInArry(arry){
  let repeats = {}
  for (let i = 0; i < arry.length; i++) {
    if (repeats[arry[i]] == null) {
      repeats[arry[i]] = 1
    }else{
      repeats[arry[i]] ++
    }
  }
  console.log("repeats",repeats);

  for (const key in repeats) {
    if (Object.hasOwnProperty.call(repeats, key)) {
      const value = repeats[key];
      if (value > 1) {
        return key
      }
    }
  }

  return null;
}