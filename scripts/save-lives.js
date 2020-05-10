const input_mappings = [
   {
      "input" : document.getElementById("row1"),
      "node"  : document.getElementById("svg_text1")
   },
   {
      "input" : document.getElementById("row2"),
      "node"  : document.getElementById("svg_text2")
   },
   {
      "input" : document.getElementById("row3"),
      "node"  : document.getElementById("svg_text3")
   },
   {
      "input" : document.getElementById("row4"),
      "node"  : document.getElementById("svg_text4")
   }
]
for(let i of input_mappings){
   i["input"].addEventListener("keyup",function(){
      i["node"].textContent = i["input"].value.toUpperCase();
   })
   i["input"].addEventListener("keydown",function(){
      i["node"].textContent = i["input"].value.toUpperCase();
   })
}
document.getElementById("editor_form").addEventListener("submit", function(e){
   e.preventDefault();
   const svg_png_opts = {
      fonts: [
         {
            url: 'https://www.designedbycave.co.uk/save-lives/fonts/frutiger_77_black_condensed.woff2',
            format: 'woff2',
            text: "@font-face {font-family: 'Frutiger Black Condensed'; src: url('fonts/frutiger_77_black_condensed.woff2') format('woff2');font-weight: normal; font-style: normal;"
         }
      ]
   };
   saveSvgAsPng(document.getElementById("poster_panel"), "save-lives-poster.png", svg_png_opts);
})