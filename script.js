$(function () {
});
$(document).ready(function() {
  // Function to generate time blocks for standard business hours
  function generateTimeBlocks() {
    var currentTime = dayjs().startOf('hour');
    var container = $('#timeBlocks');

    // Clear existing content
    container.empty();

    // Loop through business hours (9am - 5pm)
    for (var i = 9; i <= 17; i++) {
      var hour = dayjs().hour(i).minute(0).second(0);
      var timeBlock = $('<div>').addClass('row time-block');

      // Apply past, present, or future class based on current time
      if (hour.isBefore(currentTime, 'hour')) {
        timeBlock.addClass('past');
      } else if (hour.isSame(currentTime, 'hour')) {
        timeBlock.addClass('present');
      } else {
        timeBlock.addClass('future');
      }

      // Create hour column
      var hourColumn = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hour.format('hA'));

      // Create description column with textarea
      var descriptionColumn = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);
      var savedEvent = localStorage.getItem('event-' + i);
      if (savedEvent) {
        descriptionColumn.val(savedEvent);
      }

      // Create save button column
      var saveBtnColumn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      var saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');
      saveBtnColumn.append(saveIcon);

      // Append columns to time block
      timeBlock.append(hourColumn, descriptionColumn, saveBtnColumn);
      
      // Append time block to container
      container.append(timeBlock);
    }
  }

  // Update current day at the top of the calendar
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // Generate time blocks on page load
  generateTimeBlocks();

  // Event listener for save button
  $('.saveBtn').on('click', function() {
    var textArea = $(this).siblings('.description');
    var hour = $(this).siblings('.hour').text().trim();
    var event = textArea.val().trim();

    localStorage.setItem('event-' + hour, event);
  });
});
