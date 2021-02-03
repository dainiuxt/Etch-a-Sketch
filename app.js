const grid = document.getElementById("grid");
let gridSize = document.getElementById("slider").value;
const slider = document.getElementById("slider");
const resetGrid = document.getElementById("reset");
let sliderValue = document.getElementById("sliderValue");
sliderValue.textContent = 'Grid: ' + `${gridSize}` + 'x' + `${gridSize}`;
let penColor = document.getElementById("pen").value;
let mouseMethod = document.getElementById("mouse");
let drawingStyle = document.querySelector('input[name="mouse"]:checked').value;

/* Can't change drawing method in the until grid regenerated */
function makeRows(size) {
  grid.style.setProperty('--grid-rows', size);
  grid.style.setProperty('--grid-cols', size);
  for (c = 0; c < (size * size); c++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid-item";
    cell.style.setProperty('--cell-width', 560/size + 'px');
    cell.style.setProperty('--cell-height', 560/size + 'px');
  };
    let items = document.querySelectorAll('.grid-item');
  items.forEach(function(item) {
    item.addEventListener(drawingStyle, function() {
      event.target.style.backgroundColor = penColor;
    });
  });
};
makeRows(gridSize);

function removeChildren (params){
  var parentId = params.parentId;
  var childName = params.childName;
  var childNodesToRemove = document.getElementById(parentId).getElementsByClassName('grid-item');
  for(var i=childNodesToRemove.length-1;i >= 0;i--){
      var childNode = childNodesToRemove[i];
      childNode.parentNode.removeChild(childNode);
  }
}

function gridUpdate() {
  removeChildren({parentId:'grid',childName:'grid-item'});
  gridSize = document.getElementById("slider").value;
  sliderValue.textContent = 'Grid size is ' + `${gridSize}` + 'x' + `${gridSize}`;
  makeRows(gridSize);
}

mouseMethod.addEventListener('change', function(e) {
  return drawingStyle = document.querySelector('input[name="mouse"]:checked').value;
});

slider.addEventListener('click', gridUpdate);
document.getElementById("pen").addEventListener('change', (e) => {
    penColor = e.target.value;
});
if (resetGrid.addEventListener)
    resetGrid.addEventListener("click", gridUpdate, false);
else if (resetGrid.attachEvent)
    resetGrid.attachEvent('onclick', gridUpdate);
