/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating Lua for variable blocks.
 */
Lua['variables_get'] = function(block) {
  // Variable getter.
  const code =
      Lua.nameDB_.getName(block.getFieldValue('VAR'), "VARIABLE");
  return [code, Lua.ORDER_ATOMIC];
};

Lua['variables_set'] = function(block) {
  // Variable setter.
  const argument0 = Lua.valueToCode(block, 'VALUE', Lua.ORDER_NONE) || '0';
  const varName =
      Lua.nameDB_.getName(block.getFieldValue('VAR'), "VARIABLE");
  return varName + ' = ' + argument0 + '\n';
};

Lua['data_variable'] = function(block) {
  // Variable setter.
  let code = Lua.nameDB_.getName(block.getFieldValue('VARIABLE'), "VARIABLE");
  return [code, Lua.ORDER_ATOMIC];
};

Lua['data_setvariableto'] = function(block) {
  // Variable setter.
  let arg;
  if (block.getField('VALUE')) {
    arg = block.getFieldValue('VALUE');
  }else{
    arg = Lua.valueToCode(block, 'VALUE', Lua.ORDER_NONE) || '0';
  }
  let argLen = arg.length;
  let _argStart = arg[0];
  let _argEnd = arg[argLen - 1];
  
  if(_argStart == "\'" && _argEnd == "\'"){
    arg = arg.substring(1, argLen - 1);
  }
  arg = arg.replace(/\\/g,"");
  
  let filedValue = block.getFieldValue('VARIABLE');
  if (filedValue == null) {
    filedValue = "null";
  }
  let varName = Lua.nameDB_.getName(filedValue, "VARIABLE");
  return varName + ' = ' + arg + '\n';
};
Lua['data_changevariableby'] = function(block) {
  // Variable setter.
  let arg;
  if (block.getField('VALUE')) {
    arg = block.getFieldValue('VALUE');
  }else{
    arg = Lua.valueToCode(block, 'VALUE', Lua.ORDER_NONE) || '0';
  }
  let argLen = arg.length;
  let _argStart = arg[0];
  let _argEnd = arg[argLen - 1];
  
  if(_argStart == "\'" && _argEnd == "\'"){
    arg = arg.substring(1, argLen - 1);
  }
  arg = arg.replace(/\\/g,"");
  
  let filedValue = block.getFieldValue('VARIABLE');
  if (filedValue == null) {
    filedValue = "null";
  }
  let varName = Lua.nameDB_.getName(filedValue, "VARIABLE");
  return varName + ' = ' + `${varName} + ${arg} `  + '\n';
};


