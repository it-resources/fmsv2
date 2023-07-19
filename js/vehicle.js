/**
 * Javascript for vehicle form
 * Added By: Jay-ar Olivas
 * July 12, 2023
 */
function isAlphaNumWithSpace(evt,str) {
	if(str.value==''&&evt.charCode==32){
		return false;
	}
   	return isAlphaNum(evt);
}
  
var documentCount = 1;
var rowId = 1;
var documentNames = [];

function addDocumentButton() {
    var documentRowId = rowId;
    var documentName = $('#vehicleDocumentForm' + documentRowId + 'documentName').val();
    var documentFile = $('#vehicleDocumentForm' + documentRowId + 'documentFile').val();
    
    if (documentName != '' && documentFile != '') {
        // Check for duplicate document name
        if (documentNames.includes(documentName)) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                html: '<b>' + documentName + '</b> already exists. Please rename document name',
                confirmButtonColor: '#1B4DFF', // Set the background color for the "OK" button
                confirmButtonText: 'OK',
                didRender: () => {
                    $('#vehicleDocumentForm' + documentRowId + 'documentName').focus();
                }
            });
            return false;
        }
        
        documentCount++;
        
        var newRow = "<tr id='documentFileRow" + documentCount + "' >";
        newRow += '<td><input type="text" class="form-control document-name" placeholder="Document Name" maxLength="100" id="vehicleDocumentForm' + documentCount + 'documentName" name="vehicleDocumentForm[' + documentCount + '].documentName" onkeypress="return isAlphaNum(event)" autocomplete="off"/></td>';
        newRow += '<td><input type="file" class="form-control documentImage" id="vehicleDocumentForm' + documentCount + 'documentFile" name="vehicleDocumentForm[' + documentCount + '].documentFile"  accept="image/png,image/jpeg,image/jpg"/></td>';
        newRow += "<td>";
        newRow += "<input type='button' class='delete-btn' value='Delete' align='left' id='deleteDocumentButton" + documentCount + "' onclick='deleteDocumentButton(" + documentCount + ")'/>";
        newRow += "</td>";
        newRow += "</tr>";
        
        $('#documentFileTable').append(newRow);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            html: 'Document Name and File Fields are required.',
            confirmButtonColor: '#1B4DFF', // Set the background color for the "OK" button
            confirmButtonText: 'OK',
        });
        return false;
    }

    documentNames.push(documentName);
    rowId++;
}

function deleteDocumentButton(buttonId) {
    Swal.fire({
        title: 'Are you sure?',
        html: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1B4DFF',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $("#documentFileTable tr[id=documentFileRow" + buttonId + "]").remove();
            var documentName = $('#vehicleDocumentForm' + buttonId + 'documentName').val();
            
            // Remove the document name from the array
            var index = documentNames.indexOf(documentName);
            if (index !== -1) {
                documentNames.splice(index, 1);
            }
            
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
        }
    });
}

function removeDocument(buttonId) {
    Swal.fire({
        html: "To apply the changes, please click the \"Save\" button.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1B4DFF',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            $("#documentFileTable tr[id=documentFileRow" + buttonId + "]").remove();
            var documentName = $('#vehicleDocumentForm' + buttonId + 'documentName').val();
            
            // Remove the document name from the array
            var index = documentNames.indexOf(documentName);
            if (index !== -1) {
                documentNames.splice(index, 1);
            }
            
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
        }
    });
}

//Image preview
const fileImage = document.querySelector('.input-preview__src');
const filePreview = document.querySelector('.input-preview');

fileImage.onchange = function () {
    const reader = new FileReader();

    reader.onload = function (e) {
        // Get loaded data and render thumbnail.
        filePreview.style.backgroundImage = "url(" + e.target.result + ")";
        filePreview.classList.add("has-image");
    };

    // Read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
};

// Add a click event listener to remove the image preview
filePreview.addEventListener("click", function () {
    // Reset the background image and remove the "has-image" class
    filePreview.style.backgroundImage = "";
    filePreview.classList.remove("has-image");
    // Reset the input file value
    fileImage.value = "";
});

$(document).ready(function(){
    $('#save').click(function(){
        $('#form').addClass('was-validated');
        $('input:required="":first').focus();
        $('select:required="":first').focus();
    });
});