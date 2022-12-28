Lua['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  const funcName =
      Lua.nameDB_.getName(block.getFieldValue('NAME'), "PROCEDURE");
  let xfix1 = '';
  if (Lua.STATEMENT_PREFIX) {
    xfix1 += Lua.injectId(Lua.STATEMENT_PREFIX, block);
  }
  if (Lua.STATEMENT_SUFFIX) {
    xfix1 += Lua.injectId(Lua.STATEMENT_SUFFIX, block);
  }
  if (xfix1) {
    xfix1 = Lua.prefixLines(xfix1, Lua.INDENT);
  }
  let loopTrap = '';
  if (Lua.INFINITE_LOOP_TRAP) {
    loopTrap = Lua.prefixLines(
        Lua.injectId(Lua.INFINITE_LOOP_TRAP, block), Lua.INDENT);
  }
  let branch = Lua.statementToCode(block, 'STACK');
  let returnValue = Lua.valueToCode(block, 'RETURN', Lua.ORDER_NONE) || '';
  let xfix2 = '';
  if (branch && returnValue) {
    // After executing the function body, revisit this block for the return.
    xfix2 = xfix1;
  }
  if (returnValue) {
    returnValue = Lua.INDENT + 'return ' + returnValue + '\n';
  } else if (!branch) {
    branch = '';
  }
  const args = [];
  const variables = block.getVars();
  for (let i = 0; i < variables.length; i++) {
    args[i] = Lua.nameDB_.getName(variables[i], "VARIABLE");
  }
  let code = 'function ' + funcName + '(' + args.join(', ') + ')\n' + xfix1 +
      loopTrap + branch + xfix2 + returnValue + 'end\n';
  code = Lua.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Lua.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Lua['procedures_defnoreturn'] = Lua['procedures_defreturn'];

Lua['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  const funcName =
      Lua.nameDB_.getName(block.getFieldValue('NAME'), "PROCEDURE");
  const args = [];
  const variables = block.getVars();
  for (let i = 0; i < variables.length; i++) {
    args[i] = Lua.valueToCode(block, 'ARG' + i, Lua.ORDER_NONE) || 'nil';
  }
  const code = funcName + '(' + args.join(', ') + ')';
  return [code, Lua.ORDER_HIGH];
};

Lua['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  // Generated code is for a function call as a statement is the same as a
  // function call as a value, with the addition of line ending.
  const tuple = Lua['procedures_callreturn'](block);
  return tuple[0] + '\n';
};

Lua['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  const condition =
      Lua.valueToCode(block, 'CONDITION', Lua.ORDER_NONE) || 'false';
  let code = 'if ' + condition + ' then\n';
  if (Lua.STATEMENT_SUFFIX) {
    // Inject any statement suffix here since the regular one at the end
    // will not get executed if the return is triggered.
    code +=
        Lua.prefixLines(Lua.injectId(Lua.STATEMENT_SUFFIX, block), Lua.INDENT);
  }
  if (block.hasReturnValue_) {
    const value = Lua.valueToCode(block, 'VALUE', Lua.ORDER_NONE) || 'nil';
    code += Lua.INDENT + 'return ' + value + '\n';
  } else {
    code += Lua.INDENT + 'return\n';
  }
  code += 'end\n';
  return code;
};

// //函数声明
// Lua['procedures_prototype'] = function(block) {
//   console.log("procedures_prototype",block);
  
//   return code;
// };

Lua['argument_reporter_boolean'] = function(block) {
  console.log("argument_reporter_boolean",block);
  let nameValue = String(block.getFieldValue("VALUE"));
  const code =  Lua.nameDB_.getName(nameValue,"VARIABLE");
  return [code,Lua.ORDER_ATOMIC];
};

Lua['argument_reporter_string_number'] = function(block) {
  console.log("argument_reporter_string_number",block);
  let nameValue = String(block.getFieldValue("VALUE"));
  let code = Lua.nameDB_.getName(nameValue,"VARIABLE");
  return [code,Lua.ORDER_ATOMIC];
};

//函数定义
Lua['procedures_definition'] = function(block) {
  console.log("procedures_definition",block);
  let protoblock = block.childBlocks_[0];
  let funcName = Lua.nameDB_.getName(protoblock.procCode_,'PROCEDURE');
  console.log(" Lua.nameDB_", Lua.nameDB_);
  let playNames = protoblock.displayNames_;
  let args = "";
  for (let i = 0; i < playNames.length; i++) {
    const arg = Lua.nameDB_.getName(playNames[i],"VARIABLE");
    if (i == 0) {
      args = args + arg;
    }else{
      args = args + "," + arg;
    }
  }
  let code = Lua.blockToCode(block.getNextBlock());
  code = `function ${funcName}(${args})\n${code}end\n`;
  Lua.definitions_[funcName] = code;
  return null;
};

//函数调用
Lua['procedures_call'] = function(block) {
  console.log("procedures_call",block);
  let funcName = Lua.nameDB_.getName(block.procCode_,'PROCEDURE');
  let argIds = block.argumentIds_;
  let argsCode = "";
  console.log("argIds",argIds);
  for (let i = 0; i < argIds.length; i++) {
    const argId = argIds[i];
    const argBlock = block.getInputTargetBlock(argId);
    let arg = "false";
    if (argBlock != null) {
      arg = Lua.blockToCode(argBlock);
      if (arg instanceof Array) {
        arg = arg[0];
      }
      arg = Lua.removeQuotes(arg);
    }
    if (i == 0) {
      argsCode = argsCode + arg;
    }else{
      argsCode = argsCode + "," + arg;
    }
  }
  console.log("argsCode",argsCode);
  let code = `${funcName}(${argsCode})\n`;
  return code;
};


