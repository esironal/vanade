/* Syntax highlighter for XML */

function highlight(code){
  var codeb = code.replace(/&/g, '&amp;');
  codeb = codeb.replace(/</g, '<span class="xmltag"&gt;&lt;');
  codeb = codeb.replace(/>/g, '></span>');
  codeb = codeb.replace(/&gt;/g, '>');
  codeb = codeb.replace(/\n/g, '<br/>');
  return codeb;
}

