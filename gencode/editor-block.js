let editorWorkSpace = null;
let mutationRoot = null
let mutationAddCallback = null
Blockly.Procedures.externalProcedureDefCallback = function (data,callback){
    block_model.style.display = "block";
    mutationAddCallback = callback
    editorBlock(data)
}

function addblock(state){
    if (state == 0) {
        mutationRoot.addStringNumberExternal()
    }else if (state == 1) {
        mutationRoot.addBooleanExternal()
    }else if (state == 2) {
        mutationRoot.addLabelExternal()
    }
}

function sureAddBlock(){    
    if (mutationRoot != null) {
        let data = mutationRoot.mutationToDom(true)
        console.log("mutationRoot data",data);
        console.log("mutationRoot",mutationRoot);
        let displayNames = mutationRoot.displayNames_
        let repeatName = findRepeatInArry(displayNames)
        if (repeatName != null) {
            showtoast(`用一个函数中不能出现同样变量 ${repeatName}`,"error")
            return            
        }
        if (mutationAddCallback != null) {
            mutationAddCallback(data)
        }
        workspace.refreshToolboxSelection_()
        workspace.toolbox_.scrollToCategoryById('myBlocks');
    }
    hiddenAddBlock();
}

function hiddenAddBlock(){
    if (editorWorkSpace != null) {
        editorWorkSpace.dispose()
    }
    editorWorkSpace = null;
    block_model.style.display = "none";
}

function editorBlock(mutator){
// editor-block-workspace
  editorWorkSpace = Blockly.inject("editor-block-workspace",{
    comments: false,
    disable: false,
    readOnly: false,
    scrollbars: true,
    media: './media/',
    toolboxPosition:"start",
    horizontalLayout:false,
    zoom: {
        controls: false,
        wheel: false,
        minScale: 0.25,
        scaleSpeed: 1,
    },
    colours: {
      fieldShadow: 'rgba(255, 255, 255, 0.3)',
      dragShadowOpacity: 0.6
    }
  });
    mutationRoot = editorWorkSpace.newBlock('procedures_declaration');
    mutationRoot.setMovable(false);
    mutationRoot.setDeletable(false);
    mutationRoot.contextMenu = false;
    editorWorkSpace.addChangeListener(() => {
        mutationRoot.onChangeFn();
        const metrics = editorWorkSpace.getMetrics();
        const {x, y} = mutationRoot.getRelativeToSurfaceXY();
        const dy = (metrics.viewHeight / 2) - (mutationRoot.height / 2) - y;
        let dx;
        dx = (metrics.viewWidth / 2) - (mutationRoot.width / 2) - x;
        if (mutationRoot.width > metrics.viewWidth) {
            dx = metrics.viewWidth - mutationRoot.width - x;
        }
        mutationRoot.moveBy(dx, dy);
    });
    mutationRoot.domToMutation(mutator);
    mutationRoot.initSvg();
    mutationRoot.render();
    setTimeout(() => {
        mutationRoot.focusLastEditor_();
    });
}
