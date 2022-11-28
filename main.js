// Очищает консоль
console.clear();
// Объявляем переменные и присваиваем им элементы по ID
let $container = document.getElementById('elements');
let $btnPlay = document.getElementById('btn-play');
let $btnReset = document.getElementById('btn-reset');

// Данные массива
let sourceArray = [38, 95, 23, 57, 91, 71, 18, 53, 13, 14, 19, 144];
let sortedArray = [];
let timing = 0;
let step = 400;

// Создаём слушателей события
log($container, sourceArray, null, false, '$');
$btnPlay.addEventListener('click', function() {
  sortedArray = bubbleSort(sourceArray, function() {
    timing = 0;
  });
});

$btnReset.addEventListener('click', function() {
  log($container, sortedArray, undefined, undefined, '#');
});


// Функция сортировки
function bubbleSort(sourceArray, next) {
  let arr = sourceArray.slice();
  let moved;
  for(let i = 0, n = arr.length; i < n - 1; i++) {

    for(let j = 0; j < n - 1 - i; j++) {
      
      if(arr[j+1] < arr[j]) {
        let t = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = t;
        moved = true;
      } else {
        moved = false;
      }
      
      setTimeout(function(local_arr, local_i, local_j, moved_local) {
        return function() {
          log($container, local_arr, local_j, moved_local, local_i);
        }
      }(arr.slice(), i, j, moved), timing);
      
      timing += step;
    }

  }
  next();
  return arr;
}

// Log функция
function log($container, arr, target, moved, step) {
  step = step === 0 ? '0' : step;
  
  let result = step || '';
  result += ': ';
  
  let classNameMovedRigth = 'active moved right-active';
  let classNameMovedLeft = 'active moved left-active';
  let classNameNotMovedRigth = 'active not-moved right-active';
  let classNameNotMovedLeft = 'active not-moved left-active';
  
  for (let i = 0, l = arr.length; i < l; i++) {

    let className = '';
    if(target != undefined) {
      if (i === target)
        className = moved ? classNameMovedLeft : classNameNotMovedLeft;
      else if (i === (target + 1))
        className = moved ? classNameMovedRigth : classNameNotMovedRigth;
      else className = '';
    }
    
    result += `<span class="element ${className}">${arr[i]} </span>`;
  }
  
  // Рендер
  let $output = document.createElement('p');
  $output.className = 'output-row'
  $output.innerHTML = result;
  $container.appendChild($output);
}