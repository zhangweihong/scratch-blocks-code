//注册带浏览器中的函数
//生成lua代码
function r_genCode() {
  let code = Blockly.Lua.genCode(workspace)
  if (undefined != r_genCode_result && null != r_genCode_result) {
    r_genCode_result(`\n${code}`)
  }
}

//导出工程
function r_save_project(){
  try {
    let pro = exportXml()
    NowSavePro = true
    pro = window.btoa(pako.gzip(encodeURIComponent(pro), {to: 'string'}))//window.btoa(window.encodeURI(pro))
    console.log("pro",pro);
    if (undefined != r_save_project_result && null != r_save_project_result) {
      r_save_project_result(pro)
    }
  } catch (error) {
    if (undefined != r_error && null != r_error) {
      r_error(`导出程序错误！${error}`)
    }
  }
}

//载入程序
function r_load_project(pro){
  try {
    let strData = window.atob(pro);
    const charData = strData.split('').map(function (x) {
        return x.charCodeAt(0);
    });

    const binData = new Uint8Array(charData);
    const data = pako.inflate(binData);

    let str = '';
    const chunk = 8 * 1024
    let i;
    for (i = 0; i < data.length / chunk; i++) {
      str += String.fromCharCode.apply(null, data.slice(i * chunk, (i + 1) * chunk));
    }
    str += String.fromCharCode.apply(null, data.slice(i * chunk));
    pro = decodeURIComponent(str);
    importXml(pro)
    NowSavePro = true
    if (undefined != r_on_loading_finished && null != r_on_loading_finished) {
      r_on_loading_finished()
    }
  } catch (error) {
    console.log("error",error);
    if (undefined != r_error && null != r_error) {
      r_error(`载入程序错误，可能是编程版本不一致导致！${error}`)
    }
  }
}

//新建一个pro
function r_new_project(){
  NowSavePro = true
  importXml('<xml xmlns="http://www.w3.org/1999/xhtml">\n<variables>\n<variable type="" id="k{qOr-qhVL2@c_T[95X+" islocal="true" iscloud="false">我的变量</variable>\</variables>\n</xml>')
}

//检测pro是否改变
function r_modified_project(){
  console.log("NowSavePro",NowSavePro);
  if (undefined != r_modified_project_result && null != r_modified_project_result) {
    r_modified_project_result(NowSavePro)
  }
}

//控制模块是否显示
function r_set_block_visible(blockname, visible) {
  
}