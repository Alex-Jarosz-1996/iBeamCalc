$(document).ready(function() {
    // Handle change event of the dropdown
    $('#num_distances').on('change', function() {
        var numFields = parseInt($(this).val());
        generateFields(numFields);
    });
});

function generateFields(num) {
    var dynamicFields = $('#dynamic_fields');
    dynamicFields.empty(); // Clear previous fields

    for (var i = 1; i <= num; i++) {
        var label = $('<label></label>').attr('for', 'distance' + i).text('Distance ' + i + ' (mm):');
        var input = $('<input></input>').attr('type', 'text').attr('id', 'distance' + i).attr('name', 'distance' + i).attr('required', true);
        dynamicFields.append(label).append(input).append('<br><br>');
    }
}