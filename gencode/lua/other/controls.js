
/**
 * This is the text used to implement a <pre>continue</pre>.
 * It is also used to recognise <pre>continue</pre>s in generated code so that
 * the appropriate label can be put at the end of the loop body.
 * @const {string}
 */
const CONTINUE_STATEMENT = 'goto continue\n';

/**
 * If the loop body contains a "goto continue" statement, add a continue label
 * to the loop body. Slightly inefficient, as continue labels will be generated
 * in all outer loops, but this is safer than duplicating the logic of
 * blockToCode.
 *
 * @param {string} branch Generated code of the loop body
 * @return {string} Generated label or '' if unnecessary
 */
const addContinueLabel = function(branch) {
  if (branch.indexOf(CONTINUE_STATEMENT) !== -1) {
    // False positives are possible (e.g. a string literal), but are harmless.
    return branch + Lua.INDENT + '::continue::\n';
  } else {
    return branch;
  }
};

Lua['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  let repeats;
  if (block.getField('TIMES')) {
    // Internal number.
    repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    repeats = Lua.valueToCode(block, 'TIMES', Lua.ORDER_NONE) || '0';
  }
  if (Blockly.stringUtils.isNumber(repeats)) {
    repeats = parseInt(repeats, 10);
  } else {
    repeats = 'math.floor(' + repeats + ')';
  }
  let branch = Lua.statementToCode(block, 'SUBSTACK');
  branch = Lua.addLoopTrap(branch, block.id);
  branch = addContinueLabel(branch);
  const loopVar = Lua.nameDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  const code =
      'for ' + loopVar + ' = 1, ' + repeats + ' do\n' + branch + 'end\n';
  return code;
};

Lua['controls_repeat'] = Lua['controls_repeat_ext'];

Lua['controls_forever'] = function(block) {
  let branch = Lua.statementToCode(block, 'SUBSTACK');
  branch = Lua.addLoopTrap(branch, block.id);
  branch = addContinueLabel(branch);
  return 'while (true)' + ' do\n' + branch + 'end\n';
};

Lua['controls_wait_until'] = function(block) {
  let conditionCode;
  if (block.getField('CONDITION')) {
    conditionCode = String(block.getFieldValue('CONDITION'));
  }else{
    conditionCode = Lua.valueToCode(block, 'CONDITION', Lua.ORDER_NONE) || 'false';
  }
  let branch = "\n"
  return 'while ' + conditionCode + ' do\n' + branch + 'end\n';
};

Lua['controls_repeat_until'] = function(block) {
  let conditionCode;
  if (block.getField('CONDITION')) {
    conditionCode = String(block.getFieldValue('CONDITION'));
  }else{
    conditionCode = Lua.valueToCode(block, 'CONDITION', Lua.ORDER_NONE) || 'false';
  }
  let branch = Lua.statementToCode(block, 'SUBSTACK');
  branch = branch + "  \n"
  return 'while ' + conditionCode + ' do\n' + branch + 'end\n';
};

Lua['controls_if'] = function(block) {
  // If/elseif/else condition.
  let code = '';
  let n = 0
  if (Lua.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += Lua.injectId(Lua.STATEMENT_PREFIX, block);
  }
  const conditionCode =
      Lua.valueToCode(block, 'CONDITION', Lua.ORDER_NONE) || 'false';
  let branchCode = Lua.statementToCode(block, 'SUBSTACK');
  if (Lua.STATEMENT_SUFFIX) {
    branchCode = Lua.prefixLines(
        Lua.injectId(Lua.STATEMENT_SUFFIX, block), Lua.INDENT) + branchCode;
  }
  code +=
      (n > 0 ? 'else' : '') + 'if ' + conditionCode + ' then\n' + branchCode;

  let branch2Code = Lua.statementToCode(block, 'SUBSTACK2');
  if (branch2Code != null && branch2Code != '') {
    code += 'else\n' + branch2Code;
  }
  return code + 'end\n';
};

Lua['controls_if_else'] = Lua['controls_if'];


Lua['controls_wait'] = function(block) {
  let time;
  if (block.getField('DURATION')) {
    time = String(Number(block.getFieldValue('DURATION')));
  } else {
    time = Lua.valueToCode(block, 'DURATION', Lua.ORDER_NONE) || '0.1';
  }
  if (Blockly.stringUtils.isNumber(time)) {
    time = parseFloat(time, 10);
  } else {
    time = `(${time})`
  }
 
  const code = `waitforsecond(${time})\n`
  return code;
};