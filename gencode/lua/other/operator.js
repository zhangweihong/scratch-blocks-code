Lua['operator_add'] = function(block){
    let num1;
    let num2;
    if (block.getField('NUM1')) {
      // Internal number.
      num1 = String(Number(block.getFieldValue('NUM1')));
    } else {
      // External number.
      num1 = Lua.valueToCode(block, 'NUM1', Lua.ORDER_NONE) || '0';
    }
    if (block.getField('NUM2')) {
      // Internal number.
      num2 = String(Number(block.getFieldValue('NUM2')));
    } else {
      // External number.
      num2 = Lua.valueToCode(block, 'NUM2', Lua.ORDER_NONE) || '0';
    }
    const code = `(${num1} + ${num2})`;
  return [code,Lua.ORDER_ATOMIC]
};

Lua['operator_subtract'] = function(block){
    let num1;
    let num2;
    if (block.getField('NUM1')) {
      // Internal number.
      num1 = String(Number(block.getFieldValue('NUM1')));
    } else {
      // External number.
      num1 = Lua.valueToCode(block, 'NUM1', Lua.ORDER_NONE) || '0';
    }
    if (block.getField('NUM2')) {
      // Internal number.
      num2 = String(Number(block.getFieldValue('NUM2')));
    } else {
      // External number.
      num2 = Lua.valueToCode(block, 'NUM2', Lua.ORDER_NONE) || '0';
    }
    const code = `(${num1} - ${num2})`;
  return [code,Lua.ORDER_ATOMIC]
};

Lua['operator_multiply'] = function(block){
    let num1;
    let num2;
    if (block.getField('NUM1')) {
      // Internal number.
      num1 = String(Number(block.getFieldValue('NUM1')));
    } else {
      // External number.
      num1 = Lua.valueToCode(block, 'NUM1', Lua.ORDER_NONE) || '0';
    }
    if (block.getField('NUM2')) {
      // Internal number.
      num2 = String(Number(block.getFieldValue('NUM2')));
    } else {
      // External number.
      num2 = Lua.valueToCode(block, 'NUM2', Lua.ORDER_NONE) || '0';
    }
    const code = `(${num1} * ${num2})`;
  return [code,Lua.ORDER_ATOMIC]
};

Lua['operator_divide'] = function(block){
    let num1;
    let num2;
    if (block.getField('NUM1')) {
      // Internal number.
      num1 = String(Number(block.getFieldValue('NUM1')));
    } else {
      // External number.
      num1 = Lua.valueToCode(block, 'NUM1', Lua.ORDER_NONE) || '0';
    }
    if (block.getField('NUM2')) {
      // Internal number.
      num2 = String(Number(block.getFieldValue('NUM2')));
    } else {
      // External number.
      num2 = Lua.valueToCode(block, 'NUM2', Lua.ORDER_NONE) || '1';
    }
    const code = `(${num1} / ${num2})`;
  return [code,Lua.ORDER_ATOMIC]
};
Lua['operator_random'] = function(block){
    let from;
    let to;
    if (block.getField('FROM')) {
      // Internal number.
      from = String(Number(block.getFieldValue('FROM')));
    } else {
      // External number.
      from = Lua.valueToCode(block, 'FROM', Lua.ORDER_NONE) || '0';
    }
    if (block.getField('TO')) {
      // Internal number.
      to = String(Number(block.getFieldValue('TO')));
    } else {
      // External number.
      to = Lua.valueToCode(block, 'TO', Lua.ORDER_NONE) || '10';
    }
    const code = `math.random(${from}, ${to})`;
  return [code,Lua.ORDER_ATOMIC]
};

Lua['operator_gt'] = function(block){
    let op1;
    let op2;
    if (block.getField('OPERAND1')) {
      // Internal number.
      op1 = String(block.getFieldValue('OPERAND1'));
    } else {
      // External number.
      op1 = Lua.valueToCode(block, 'OPERAND1', Lua.ORDER_NONE) || '1';
    }
    if (block.getField('OPERAND2')) {
      // Internal number.
      op2 = String(block.getFieldValue('OPERAND2'));
    } else {
      // External number.
      op2 = Lua.valueToCode(block, 'OPERAND2', Lua.ORDER_NONE) || '0';
    }
    op1 = Lua.removeQuotes(op1)
    op2 = Lua.removeQuotes(op2)
    const code = `(${op1} > ${op2})`;
  return [code,Lua.ORDER_ATOMIC]
};

Lua['operator_lt'] = function(block){
  let op1;
  let op2;
  if (block.getField('OPERAND1')) {
    // Internal number.
    op1 = String(block.getFieldValue('OPERAND1'));
  } else {
    // External number.
    op1 = Lua.valueToCode(block, 'OPERAND1', Lua.ORDER_NONE) || '1';
  }
  if (block.getField('OPERAND2')) {
    // Internal number.
    op2 = String(block.getFieldValue('OPERAND2'));
  } else {
    // External number.
    op2 = Lua.valueToCode(block, 'OPERAND2', Lua.ORDER_NONE) || '0';
  }
  op1 = Lua.removeQuotes(op1)
  op2 = Lua.removeQuotes(op2)
  const code = `(${op1} < ${op2})`;
  return [code,Lua.ORDER_ATOMIC]
};

Lua['operator_equals'] = function(block){
  let op1;
  let op2;
  if (block.getField('OPERAND1')) {
    // Internal number.
    op1 = String(block.getFieldValue('OPERAND1'));
  } else {
    // External number.
    op1 = Lua.valueToCode(block, 'OPERAND1', Lua.ORDER_NONE) || '1';
  }
  if (block.getField('OPERAND2')) {
    // Internal number.
    op2 = String(block.getFieldValue('OPERAND2'));
  } else {
    // External number.
    op2 = Lua.valueToCode(block, 'OPERAND2', Lua.ORDER_NONE) || '1';
  }
  op1 = Lua.removeQuotes(op1)
  op2 = Lua.removeQuotes(op2)
  const code = `(${op1} == ${op2})`;
  return [code,Lua.ORDER_ATOMIC]
};
Lua['operator_and'] = function(block){
  let op1;
  let op2;
  if (block.getField('OPERAND1')) {
    // Internal number.
    op1 = String(block.getFieldValue('OPERAND1'));
  } else {
    // External number.
    op1 = Lua.valueToCode(block, 'OPERAND1', Lua.ORDER_NONE) || '1';
  }
  if (block.getField('OPERAND2')) {
    // Internal number.
    op2 = String(block.getFieldValue('OPERAND2'));
  } else {
    // External number.
    op2 = Lua.valueToCode(block, 'OPERAND2', Lua.ORDER_NONE) || '1';
  }
  op1 = Lua.removeQuotes(op1)
  op2 = Lua.removeQuotes(op2)
  
  const code = `(${op1} and ${op2})`;
  return [code,Lua.ORDER_ATOMIC]
};
Lua['operator_or'] = function(block){
  let op1;
  let op2;
  if (block.getField('OPERAND1')) {
    // Internal number.
    op1 = String(block.getFieldValue('OPERAND1'));
  } else {
    // External number.
    op1 = Lua.valueToCode(block, 'OPERAND1', Lua.ORDER_NONE) || '1';
  }
  if (block.getField('OPERAND2')) {
    // Internal number.
    op2 = String(block.getFieldValue('OPERAND2'));
  } else {
    // External number.
    op2 = Lua.valueToCode(block, 'OPERAND2', Lua.ORDER_NONE) || '0';
  }
  op1 = Lua.removeQuotes(op1)
  op2 = Lua.removeQuotes(op2)
  const code = `(${op1} or ${op2})`;
  return [code,Lua.ORDER_ATOMIC]
};
Lua['operator_not'] = function(block){
  let op1;
  if (block.getField('OPERAND')) {
    // Internal number.
    op1 = String(block.getFieldValue('OPERAND'));
  } else {
    // External number.
    op1 = Lua.valueToCode(block, 'OPERAND', Lua.ORDER_NONE) || '1';
  }
  op1 = Lua.removeQuotes(op1)
  const code = `(not ${op1})`;
  return [code,Lua.ORDER_ATOMIC]
};

Lua['operator_mod'] = function(block){
    let num1;
    let num2;
    if (block.getField('NUM1')) {
      // Internal number.
      num1 = String(Number(block.getFieldValue('NUM1')));
    } else {
      // External number.
      num1 = Lua.valueToCode(block, 'NUM1', Lua.ORDER_NONE) || '0';
    }
    if (block.getField('NUM2')) {
      // Internal number.
      num2 = String(Number(block.getFieldValue('NUM2')));
    } else {
      // External number.
      num2 = Lua.valueToCode(block, 'NUM2', Lua.ORDER_NONE) || '0';
    }
    const code = `(${num1} % ${num2})`;
  return [code,Lua.ORDER_ATOMIC]
};

Lua['operator_round'] = function(block){
    let num;
    if (block.getField('NUM')) {
        num = String(Number(block.getFieldValue('NUM')));
    } else {
        num = Lua.valueToCode(block, 'NUM', Lua.ORDER_NONE) || '0';
    }
    const code = `math.round(${num})`;
  return [code,Lua.ORDER_ATOMIC]
};

Lua['operator_mathop'] = function(block){
    let select = "abs"
    if (block.getField('OPERATOR')) {
      // Internal number.
      select = String(block.getFieldValue('OPERATOR'));
    } else {
      // External number.
      select = Lua.valueToCode(block, 'OPERATOR', Lua.ORDER_NONE) || '1';
    }
    let num;
    if (block.getField('NUM')) {
        num = String(Number(block.getFieldValue('NUM')));
    } else {
        num = Lua.valueToCode(block, 'NUM', Lua.ORDER_NONE) || '0';
    }

   let code = `math.${select}(${num})`;
  return [code,Lua.ORDER_ATOMIC]
};




