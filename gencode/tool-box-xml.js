const categorySeparator = '<sep gap="36"/>';
const blockSeparator = '<sep gap="36"/>'; 
const gap = [categorySeparator];
const xmlOpen = '<xml style="display: none">';
const xmlClose = '</xml>';
const motion = function(){
    return `<category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">
        <block type="move_motor">
            <value name="SPEEDLEFT">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="SPEEDRIGHT">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="move_motor_stop">
        </block>
    </category>`
}
const events = function(){
    return `
    <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">
        <block type="event_whenflagclicked">

        </block>
    </category>
    `
}
const controls = function(){
    return `
    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">
        <block type="controls_wait">
            <value name="DURATION">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="controls_repeat">
            <value name="TIMES">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="controls_forever"/>
        <block type="controls_if"/>
        <block type="controls_if_else"/>
       
        <block id="wait_until" type="controls_wait_until"/>
        <block id="repeat_until" type="controls_repeat_until"/>
    </category>
    `
}
const sensing = function(){
    return `
    <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
        <block id="sensing_obj_offset" type="sensing_obj_offset">
        </block>
        <block id="sensing_obj" type="sensing_obj">
        </block>
        <block id="sensing_real_time" type="sensing_real_time">
        </block>
        <block id="sensing_reset_real_time" type="sensing_reset_real_time">
        </block>
    </category>
    `
}
const operators = function(){
    return `
    <category name="%{BKY_CATEGORY_OPERATORS}" id="operators" colour="#40BF4A" secondaryColour="#389438">
        <block type="operator_add">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_subtract">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_multiply">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_divide">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_random">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_random">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_gt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <block type="operator_lt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_and"/>
        <block type="operator_or"/>
        <block type="operator_not"/>
        ${blockSeparator}
        <block type="operator_mod">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_round">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_mathop">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
    ${categorySeparator}
    </category>
    `
}
const variables = function () {
    return `
    <category
        name="%{BKY_CATEGORY_VARIABLES}"
        id="data"
        colour="#FF8C1A"
        secondaryColour="#DB6E00"
        custom="VARIABLE">
    </category>
    `;
};
const myBlocks = function () {
    return `
    <category
        name="%{BKY_CATEGORY_MYBLOCKS}"
        id="myBlocks"
        colour="#FF6680"
        secondaryColour="#FF4D6A"
        custom="PROCEDURE">
    </category>
    `;
};

const everything = [
    xmlOpen,
    motion(),gap,
    events(),gap,
    controls(),gap,
    sensing(),gap,
    operators(),gap,
    variables(),gap,
    myBlocks(),
    xmlClose
]

const ToolBoxXml = everything.join('\n');




