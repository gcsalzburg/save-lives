// Array of text elements to modify
//  + Input text box
//  + SVG text node to update
//  + Max font size
//  + Min font size
const input_mappings = [
   {
      "input" : document.getElementById("meme_row1"),
      "node"  : document.getElementById("svg_text1"),
      "max"   : 188,
      "min"   : 120,
   },
   {
      "input" : document.getElementById("meme_row2"),
      "node"  : document.getElementById("svg_text2"),
      "max"   : 234,
      "min"   : 170,
   },
   {
      "input" : document.getElementById("meme_row3"),
      "node"  : document.getElementById("svg_text3"),
      "max"   : 218,
      "min"   : 160,
   },
   {
      "input" : document.getElementById("meme_row4"),
      "node"  : document.getElementById("svg_text4"),
      "max"   : 187,
      "min"   : 130,
   }
]

// Max allowed width of text on poster
const max_text_width = 1010;

// Add keyboard handlers
for(let i of input_mappings){
   i["input"].addEventListener("keyup",function(){
      adjust_text(i);
   })
   i["input"].addEventListener("keydown",function(){
      adjust_text(i);
   })
}

// Function to adjust textsize
function adjust_text(i){
   i["node"].textContent = i["input"].value.toUpperCase();
   let width = i["node"].getBBox().width;

   if(width > max_text_width){
      // While textbox is too wide, shrink textsize down
      let font_size = i["max"];
      while( (font_size>i["min"]) && (width > max_text_width) ){
         font_size--;
         i["node"].style.fontSize = font_size+'px';
         width = i["node"].getBBox().width;
      }
   }else{
      // While textbox is not wide enough, increase text size
      let font_size = i["min"];
      while( (font_size<i["max"]) && (width < max_text_width) ){
         font_size++;
         i["node"].style.fontSize = font_size+'px';
         width = i["node"].getBBox().width;
      }
      font_size--; // One for luck, to cancel out last step of loop
   }
}

// Handlers for colour objects clickers
const svg_obj = document.getElementById("poster_panel");
const polygons = svg_obj.getElementsByTagName('polygon');
document.getElementById("colour_marks").addEventListener("change", function(e){
   const col = document.getElementById("colour_marks").value;
   for(poly of polygons){
      poly.style.fill = col;
   }
});
document.getElementById("colour_background").addEventListener("change", function(e){
   const col = document.getElementById("colour_background").value;
   document.getElementById("poster_background").style.fill = col;
});

// Submit form handler
// Uses saveSvgAsPng to render PNG client side
document.getElementById("editor_form").addEventListener("submit", function(e){
   e.preventDefault();
   const svg_png_opts = {
      top : 0,
      left : 0,
      height: 1143,
      width: 1125,
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