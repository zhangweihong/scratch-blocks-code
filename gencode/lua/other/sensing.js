Lua['sensing_obj_offset'] = function(block){
    let selectIndex = "1"
    if (block.getField('CURRENTMENU')) {
      // Internal number.
      selectIndex = String(Number(block.getFieldValue('CURRENTMENU')));
    } else {
      // External number.
      selectIndex = Lua.valueToCode(block, 'CURRENTMENU', Lua.ORDER_NONE) || '1';
    }

   let code = `sensingoffset(${selectIndex})`;
  return [code,Lua.ORDER_ATOMIC]
};
Lua['sensing_obj'] = function(block){
   let code = `sensingsign()`;
  return [code,Lua.ORDER_ATOMIC]
};
Lua['sensing_real_time'] = function(block){
   let code = `sensingsyssecond()`;
  return [code,Lua.ORDER_ATOMIC]
};
Lua['sensing_reset_real_time'] = function(block){
   let code = `sensingresetsecond()\n`;
  return code
};
