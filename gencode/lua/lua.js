var Lua = new Blockly.Generator('Lua');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 */
Lua.addReservedWords(
    // Special character
    '_,' +
    // From theoriginalbit's script:
    // https://github.com/espertus/blockly-lua/issues/6
    '__inext,assert,bit,colors,colours,coroutine,disk,dofile,error,fs,' +
    'fetfenv,getmetatable,gps,help,io,ipairs,keys,loadfile,loadstring,math,' +
    'native,next,os,paintutils,pairs,parallel,pcall,peripheral,print,' +
    'printError,rawequal,rawget,rawset,read,rednet,redstone,rs,select,' +
    'setfenv,setmetatable,sleep,string,table,term,textutils,tonumber,' +
    'tostring,turtle,type,unpack,vector,write,xpcall,_VERSION,__indext,' +
    // Not included in the script, probably because it wasn't enabled:
    'HTTP,' +
    // Keywords (http://www.lua.org/pil/1.3.html).
    'and,break,do,else,elseif,end,false,for,function,if,in,local,nil,not,or,' +
    'repeat,return,then,true,until,while,' +
    // Metamethods (http://www.lua.org/manual/5.2/manual.html).
    'add,sub,mul,div,mod,pow,unm,concat,len,eq,lt,le,index,newindex,call,' +
    // Basic functions (http://www.lua.org/manual/5.2/manual.html, section 6.1).
    'assert,collectgarbage,dofile,error,_G,getmetatable,inpairs,load,' +
    'loadfile,next,pairs,pcall,print,rawequal,rawget,rawlen,rawset,select,' +
    'setmetatable,tonumber,tostring,type,_VERSION,xpcall,' +
    // Modules (http://www.lua.org/manual/5.2/manual.html, section 6.3).
    'require,package,string,table,math,bit32,io,file,os,debug');

/**
 * Order of operation ENUMs.
 * http://www.lua.org/manual/5.3/manual.html#3.4.8
 */
Lua.ORDER_ATOMIC = 0;  // literals
// The next level was not explicit in documentation and inferred by Ellen.
Lua.ORDER_HIGH = 1;            // Function calls, tables[]
Lua.ORDER_EXPONENTIATION = 2;  // ^
Lua.ORDER_UNARY = 3;           // not # - ~
Lua.ORDER_MULTIPLICATIVE = 4;  // * / %
Lua.ORDER_ADDITIVE = 5;        // + -
Lua.ORDER_CONCATENATION = 6;   // ..
Lua.ORDER_RELATIONAL = 7;      // < > <=  >= ~= ==
Lua.ORDER_AND = 8;             // and
Lua.ORDER_OR = 9;              // or
Lua.ORDER_NONE = 99;

/**
 * Note: Lua is not supporting zero-indexing since the language itself is
 * one-indexed, so the generator does not repoct the oneBasedIndex configuration
 * option used for lists and text.
 */

/**
 * Whether the init method has been called.
 * @type {?boolean}
 */
Lua.isInitialized = false;

/**
 * Initialise the database of variable names.
 * @param {!Workspace} workspace Workspace to generate code from.
 */
Lua.init = function(workspace) {
  // Call Blockly.CodeGenerator's init.
  Object.getPrototypeOf(Lua).init.call(Lua);
  if (!Lua.nameDB_) {
    Lua.nameDB_ = new Names(Lua.RESERVED_WORDS_);
  } else {
    Lua.nameDB_.reset();
  }
  Lua.nameDB_.setVariableMap(workspace.getVariableMap());
  // this.nameDB_.populateVariables(workspace);
  // this.nameDB_.populateProcedures(workspace);
  if (!Lua.definitions_) {
    Lua.definitions_ = {}
  }
  Lua.isInitialized = true;
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Lua.finish = function(code) {
  // Convert the definitions dictionary into a list.
  const definitions = Object.values(Lua.definitions_);
  // Call Blockly.CodeGenerator's finish.
  code = Object.getPrototypeOf(Lua).finish.call(Lua, code);
  Lua.isInitialized = false;
  // Lua.nameDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything. In Lua, an expression is not a legal statement, so we must assign
 * the value to the (conventionally ignored) _.
 * http://lua-users.org/wiki/ExpressionsAsStatements
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Lua.scrubNakedValue = function(line) {
  return 'local _ = ' + line + '\n';
};

/**
 * Encode a string as a properly escaped Lua string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Lua string.
 * @protected
 */
Lua.quote_ = function(string) {
  string = string.replace(/\\/g, '\\\\')
               .replace(/\n/g, '\\\n')
               .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Encode a string as a properly escaped multiline Lua string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Lua string.
 * @protected
 */
Lua.multiline_quote_ = function(string) {
  const lines = string.split(/\n/g).map(Lua.quote_);
  // Join with the following, plus a newline:
  // .. '\n' ..
  return lines.join(' .. \'\\n\' ..\n');
};

/**
 * Common tasks for generating Lua from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Block} block The current block.
 * @param {string} code The Lua code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} Lua code with comments and subsequent blocks added.
 * @protected
 */
Lua.scrub_ = function(block, code, opt_thisOnly) {
  let commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    let comment = block.getCommentText();
    if (comment) {
      comment = Blockly.stringUtils.wrap(comment, Lua.COMMENT_WRAP - 3);
      commentCode += Lua.prefixLines(comment, '-- ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (let i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type === inputTypes.VALUE) {
        const childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Lua.allNestedComments(childBlock);
          if (comment) {
            commentCode += Lua.prefixLines(comment, '-- ');
          }
        }
      }
    }
  }
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = opt_thisOnly ? '' : Lua.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

Lua.genCode = function (workspace){
  Lua.workspaceToCode(workspace)
  const definitions = Object.values(Lua.definitions_);
  const functions = definitions.join('\n\n')
  let wBlocks = workspace.blockDB_
  let codePre =  "function main()\n"
  if (definitions.length > 0) {
    codePre = functions +"\n" + codePre
  }
  let code = "";
  for (const key in wBlocks) {
    if (Object.hasOwnProperty.call(wBlocks, key)) {
      const block = wBlocks[key];
      if (block.type === "event_whenflagclicked") {
        code = code + Lua.blockToCode(block)
      }
    }
  }
  let codeBack = "end\nmain()"
  Lua.nameDB_.reset();
  return codePre + code + codeBack
}

Lua.removeQuotes = function (arg){
  if (arg == null || arg == '' || arg == '\'\'') {
    return '\'\''
  }
  let argLen = arg.length;
  let _argStart = arg[0];
  let _argEnd = arg[argLen - 1]
  
  if(_argStart == "\'" && _argEnd == "\'"){
    arg = arg.substring(1, argLen - 1)
  }
  arg = arg.replace(/\\/g,"")
  return arg
}


Blockly.Lua = Lua;

