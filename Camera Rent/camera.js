const container = document.querySelector('.container');
const image = document.getElementById('image');
const speedRange = document.getElementById('speedRange');

let currentIndex = 1;
let mouseX = 0;
let autoRotateInterval = null;

function updateImage() {
  const imageUrl = `img${currentIndex}.png`;
  image.style.backgroundImage = `url(${imageUrl})`;
}

function handleMouseMove(e) {
  const delta = e.clientX - mouseX;
  mouseX = e.clientX;
  currentIndex += Math.sign(delta);
  if (currentIndex < 1) {
    currentIndex = 49;
  } else if (currentIndex > 49) {
    currentIndex = 1;
  }
  updateImage();
}

function autoRotate() {
  currentIndex++;
  if (currentIndex > 49) {
    currentIndex = 1;
  }
  updateImage();
}

function startAutoRotate() {
  const speed = speedRange.value;
  const interval = 2000 / speed;
  autoRotateInterval = setInterval(autoRotate, interval);
}

function stopAutoRotate() {
  clearInterval(autoRotateInterval);
}

container.addEventListener('mousemove', handleMouseMove);
speedRange.addEventListener('input', () => {
  if (autoRotateInterval) {
    stopAutoRotate();
    startAutoRotate();
  }
});

startAutoRotate();



var bookedDates = ['2024-03-01', '2024-03-03', '2024-03-05']; // Example booked dates
document.getElementById('bookNowButton').addEventListener('click', function() {
  document.getElementById('myModal').style.display = 'block';
  renderCalendar();
  renderYearOptions();
});
function renderCalendar() {
  var calendarDiv = document.getElementById('calendar');
  calendarDiv.innerHTML = '';
  var monthSelect = document.getElementById('monthSelect');
  var yearSelect = document.getElementById('yearSelect');
  var monthIndex = parseInt(monthSelect.value);
  var year = parseInt(yearSelect.value);
  var currentDate = new Date(year, monthIndex, 1);
  var daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  var firstDayIndex = currentDate.getDay();
  var today = new Date();
  for (var i = 0; i < firstDayIndex; i++) {
    calendarDiv.innerHTML += '<div class="box disabled"></div>';
  }
  for (var i = 1; i <= daysInMonth; i++) {
    var dateString = year + '-' + (monthIndex + 1).toString().padStart(2, '0') + '-' + i.toString().padStart(2, '0');
    var boxClass = 'box';
    if (bookedDates.includes(dateString)) {
      boxClass += ' booked';
    } else if (new Date(year, monthIndex, i) > today) {
      boxClass += ' disabled';
    } else {
      boxClass += ' available';
    }
    if (today.toDateString() === new Date(year, monthIndex, i).toDateString()) {
      boxClass += ' selected';
    }
    calendarDiv.innerHTML += '<div class="' + boxClass + '" data-date="' + dateString + '">' + i + '</div>';
  }
  var boxes = document.querySelectorAll('.box:not(.disabled)');
  boxes.forEach(function(box) {
    box.addEventListener('click', function() {
      var selectedDate = this.getAttribute('data-date');
      openRegistrationForm(selectedDate);
    });
  });
}

function openRegistrationForm(selectedDate) {
  if (bookedDates.includes(selectedDate)) {
    alert('This date is already booked.');
    return;
  }
  document.getElementById('myModal').style.display = 'none';
  document.getElementById('registrationForm').style.display = 'block';
  document.getElementById('submitBtn').addEventListener('click', submitBooking);

  function submitBooking() {
    var fullName = document.getElementById('fullName').value.trim();
    var email = document.getElementById('email').value.trim();
    var mobile = document.getElementById('mobile').value.trim();
    // Validate form fields here
    if (fullName !== '' && email !== '' && mobile !== '') {
      alert('You have successfully booked for ' + selectedDate + '!');
      var selectedBox = document.querySelector('[data-date="' + selectedDate + '"]');
      selectedBox.classList.remove('available');
      selectedBox.classList.add('selected');
      bookedDates.push(selectedDate);
      document.getElementById('registrationForm').style.display = 'none';
    } else {
      alert('Please fill in all the fields.');
    }
    // Remove the event listener to prevent multiple click events
    document.getElementById('submitBtn').removeEventListener('click', submitBooking);
  }
}

function renderYearOptions() {
  var yearSelect = document.getElementById('yearSelect');
  var currentYear = new Date().getFullYear();
  for (var i = currentYear - 5; i <= currentYear + 5; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
  yearSelect.value = currentYear; // Set current year as default
  yearSelect.addEventListener('change', renderCalendar);
}

document.getElementById('monthSelect').addEventListener('change', renderCalendar);

function renderCalendar() {
  var calendarDiv = document.getElementById('calendar');
  calendarDiv.innerHTML = '';
  var monthSelect = document.getElementById('monthSelect');
  var yearSelect = document.getElementById('yearSelect');
  var monthIndex = parseInt(monthSelect.value);
  var year = parseInt(yearSelect.value);
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var currentYear = currentDate.getFullYear();

  // Check if the selected year and month are in the future or the current month
  if (year > currentYear || (year === currentYear && monthIndex >= currentMonth)) {
    var daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    var firstDayIndex = new Date(year, monthIndex, 1).getDay();
    var today = new Date();

    for (var i = 0; i < firstDayIndex; i++) {
      calendarDiv.innerHTML += '<div class="box disabled"></div>';
    }

    for (var i = 1; i <= daysInMonth; i++) {
      var dateString = year + '-' + (monthIndex + 1).toString().padStart(2, '0') + '-' + i.toString().padStart(2, '0');
      var boxClass = 'box';
      
      // Check if the date is in the past or already booked
      if (new Date(year, monthIndex, i) < today || bookedDates.includes(dateString)) {
        boxClass += ' disabled';
      } else {
        boxClass += ' available';
      }
      
      if (today.toDateString() === new Date(year, monthIndex, i).toDateString()) {
        boxClass += ' selected';
      }
      calendarDiv.innerHTML += '<div class="' + boxClass + '" data-date="' + dateString + '">' + i + '</div>';
    }

    var boxes = document.querySelectorAll('.box:not(.disabled)');
    boxes.forEach(function(box) {
      box.addEventListener('click', function() {
        var selectedDate = this.getAttribute('data-date');
        openRegistrationForm(selectedDate);
      });
    });
  } else {
    calendarDiv.innerHTML = '<div class="box-disabled">  Please select a future month or year.</div>';
  }
}