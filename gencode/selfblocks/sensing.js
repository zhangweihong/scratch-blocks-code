Blockly.Blocks['sensing_obj_offset'] = {
  /**
       * Block to Report the current option.
       * @this Blockly.Block
       */
  init: function() {
    this.jsonInit({
      "id":"sensing_obj_offset",
      "message0": Blockly.Msg.AI_ROAD_OBJ,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "CURRENTMENU",
          "options": [
            [Blockly.Msg.AI_OFFSET, '3'],
            [Blockly.Msg.AI_LEFT_OFFSET, '1'],
            [Blockly.Msg.AI_RIGHT_OFFSET, '2'],
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": false,
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_obj'] = {
  /**
         * Block to Report the current option.
         * @this Blockly.Block
         */
  init: function() {
    this.jsonInit({
      "id":"sensing_obj",
      "message0": Blockly.Msg.AI_OBJ,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": false,
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};
Blockly.Blocks['sensing_real_time'] = {
  /**
         * Block to Report the current option.
         * @this Blockly.Block
         */
  init: function() {
    this.jsonInit({
      "id":"sensing_real_time",
      "message0": Blockly.Msg.NOW_REAL_TIME,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": false,
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};
Blockly.Blocks['sensing_reset_real_time'] = {
  /**
         * Block to Report the current option.
         * @this Blockly.Block
         */
  init: function() {
    this.jsonInit({
      "id":"sensing_reset_real_time",
      "message0": Blockly.Msg.RESET_NOW_REAL_TIME,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": false,
      "extensions": ["colours_sensing", "shape_statement"]
    });
  }
};
