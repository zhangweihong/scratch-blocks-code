Lua['move_motor'] = function(block){
    let speed_left;
    let speed_right;
    if (block.getField('SPEEDLEFT')) {
      // Internal number.
      speed_left = String(Number(block.getFieldValue('SPEEDLEFT')));
    } else {
      // External number.
      speed_left = Lua.valueToCode(block, 'SPEEDLEFT', Lua.ORDER_NONE) || '0';
    }
    if (block.getField('SPEEDRIGHT')) {
      // Internal number.
      speed_right = String(Number(block.getFieldValue('SPEEDRIGHT')));
    } else {
      // External number.
      speed_right = Lua.valueToCode(block, 'SPEEDRIGHT', Lua.ORDER_NONE) || '0';
    }
  const code = `motor(${speed_left},${speed_right})\n`;
  return code
};

Lua['move_motor_stop'] = function(block){
    const code = `stopmotor()\n`;
    return code
};
