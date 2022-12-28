Blockly.Blocks['operator_add'] = {
  /**
     * Block for adding two numbers.
     * @this Blockly.Block
     */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_ADD,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};
Blockly.Blocks['operator_subtract'] = {
  /**
     * Block for adding two numbers.
     * @this Blockly.Block
     */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_SUBTRACT,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};
Blockly.Blocks['operator_multiply'] = {
  /**
     * Block for adding two numbers.
     * @this Blockly.Block
     */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_MULTIPLY,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};
Blockly.Blocks['operator_divide'] = {
  /**
     * Block for adding two numbers.
     * @this Blockly.Block
     */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_DIVIDE,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_and'] = {
  /**
   * Block for "and" boolean comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_AND,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "OPERAND2",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_or'] = {
  /**
   * Block for "or" boolean comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_OR,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "OPERAND2",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_not'] = {
  /**
   * Block for "not" unary boolean operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_NOT,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_random'] = {
  /**
     * Block for adding two numbers.
     * @this Blockly.Block
     */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_RANDOM,
      "args0": [
        {
          "type": "input_value",
          "name": "FROM"
        },
        {
          "type": "input_value",
          "name": "TO"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_gt'] = {
  /**
     * Block for adding two numbers.
     * @this Blockly.Block
  */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_GT,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_lt'] = {
  /**
     * Block for adding two numbers.
     * @this Blockly.Block
  */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_LT,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_equals'] = {
  /**
     * Block for adding two numbers.
     * @this Blockly.Block
  */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_EQUALS,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_mod'] = {
  /**
   * Block for mod two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_MOD,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_round'] = {
  /**
   * Block for rounding a numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_ROUND,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_mathop'] = {
  /**
   * Block for "advanced" math ops on a number.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_MATHOP,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OPERATOR",
          "options": [
            [Blockly.Msg.OPERATORS_MATHOP_ABS, 'abs'],
            [Blockly.Msg.OPERATORS_MATHOP_FLOOR, 'floor'],
            [Blockly.Msg.OPERATORS_MATHOP_CEILING, 'ceiling'],
            [Blockly.Msg.OPERATORS_MATHOP_SQRT, 'sqrt'],
            [Blockly.Msg.OPERATORS_MATHOP_SIN, 'sin'],
            [Blockly.Msg.OPERATORS_MATHOP_COS, 'cos'],
            [Blockly.Msg.OPERATORS_MATHOP_TAN, 'tan'],
            [Blockly.Msg.OPERATORS_MATHOP_ASIN, 'asin'],
            [Blockly.Msg.OPERATORS_MATHOP_ACOS, 'acos'],
            [Blockly.Msg.OPERATORS_MATHOP_ATAN, 'atan'],
            [Blockly.Msg.OPERATORS_MATHOP_LN, 'ln'],
            [Blockly.Msg.OPERATORS_MATHOP_LOG, 'log'],
            [Blockly.Msg.OPERATORS_MATHOP_EEXP, 'e ^'],
            [Blockly.Msg.OPERATORS_MATHOP_10EXP, '10 ^']
          ]
        },
        {
          "type": "input_value",
          "name": "NUM"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

