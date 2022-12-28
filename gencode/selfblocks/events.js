Blockly.Blocks['event_whenflagclicked'] = {
  /**
    * Block for when flag clicked.
    * @this Blockly.Block
    */
  init: function() {
    this.jsonInit({
      "id": "event_whenflagclicked",
      "message0": Blockly.Msg.EVENT_WHENFLAGCLICKED,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "play.svg",
          "width": 24,
          "height": 24,
          "alt": "flag"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};
 
