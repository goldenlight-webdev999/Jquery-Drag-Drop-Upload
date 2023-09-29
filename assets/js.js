var totalFiles = [];
var uploadURL = "";

function deleteFile(index) {
	var newFiles = totalFiles.filter((f, i) => i !== index);
	totalFiles = newFiles;
	createStatusbar(newFiles);
}

function createStatusbar(files) {
	var stauts = "";
	for (var i = 0; i < files.length; i++) 
   {
		var sizeStr="";
		var sizeKB = files[i].size/1024;
		if(parseInt(sizeKB) > 1024)
		{
			var sizeMB = sizeKB/1024;
			sizeStr = sizeMB.toFixed(2)+" MB";
		}
		else
		{
			sizeStr = sizeKB.toFixed(2)+" KB";
		}
		var statusbar = "<div class='statusbar'>";
		statusbar = statusbar + "<div class='filename'>"+ files[i].name +"</div>";
		statusbar = statusbar + "<div class='filesize'>"+ sizeStr +"</div>";
		statusbar = statusbar + "<div class='delete' onclick='deleteFile("+ i +")'>Delete</div>";
		statusbar = statusbar + "</div>";
		stauts = stauts + statusbar;
	}

	$("#statusWrapper").html(stauts);
	
}

function handleFileUpload(files) {
	for (var i = 0; i < files.length; i++) 
   {
		var fd = new FormData();
		fd.append('file', files[i]);
	}
	createStatusbar(files);
}

function initForm() {
	$('#zipcode').val("");
	totalFiles = [];
	createStatusbar(totalFiles);
}

function formSubmit() {
	var zipcode = $('#zipcode').val();
	var data = {
		zipcode,
		files: totalFiles
	}
	console.log('data', data);
	initForm();
}

$(document).ready(function() {
	var obj = $("#dragandrophandler");

	obj.on('dragenter', function (e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).css('border', '2px dashed');
	});

	obj.on('dragover', function (e) {
		e.stopPropagation();
		e.preventDefault();
	});

	obj.on('drop', function (e) {
	
		$(this).css('border', 'none');
		e.preventDefault();
		var files = [...e.originalEvent.dataTransfer.files];
		totalFiles = files;

		//We need to send dropped files to Server
		handleFileUpload(files);
	});

	$(document).on('dragenter', function (e) {
		e.stopPropagation();
		e.preventDefault();
	});

	$(document).on('dragover', function (e) {
		e.stopPropagation();
		e.preventDefault();
		obj.css('border', '2px dashed #ff0000');
	});

	$(document).on('drop', function (e) {
		e.stopPropagation();
		e.preventDefault();
	});

	/**
	 * When click
	 */
	obj.on('click', function (e) 
	{
		$( "#file-select" ).trigger( "click" );
	});

	$('#file-select').change(function(e) {
		totalFiles = [...e.target.files];
		createStatusbar(totalFiles);
	});
	
});


// var rowCount=0;

// function createStatusbar(obj) {
// 	rowCount++;
// 	var row="odd";
// 	if(rowCount %2 ==0) row ="even";
// 	this.statusbar = $("<div class='statusbar "+row+"'></div>");
// 	this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
// 	this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
// 	this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
// 	this.abort = $("<div class='abort'>Abort</div>").appendTo(this.statusbar);
// 	this.delete = $("<div class='delete'>Delete</div>").appendTo(this.progressBar);
// 	obj.after(this.statusbar);

// 	this.setFileNameSize = function(name,size) {
// 		var sizeStr="";
// 		var sizeKB = size/1024;
// 		if(parseInt(sizeKB) > 1024)
// 		{
// 			var sizeMB = sizeKB/1024;
// 			sizeStr = sizeMB.toFixed(2)+" MB";
// 		}
// 		else
// 		{
// 			sizeStr = sizeKB.toFixed(2)+" KB";
// 		}

// 		this.filename.html(name);
// 		this.size.html(sizeStr);
// 	}

// 	this.setProgress = function(progress) {       
// 		var progressBarWidth =progress*this.progressBar.width()/ 100;  
// 		this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
// 		if(parseInt(progress) >= 100)
// 		{
// 			this.abort.hide();
// 		}
// 	}

// 	this.setAbort = function(jqxhr) {
// 		var sb = this.statusbar;
// 		this.abort.click(function()
// 		{
// 			jqxhr.abort();
// 			sb.hide();
// 		});
// 	}

// }

// function sendFileToServer(formData,status) {
// 	var extraData ={}; //Extra Data.
// 	var jqXHR=$.ajax({
// 		xhr: function() {
// 			var xhrobj = $.ajaxSettings.xhr();
// 			if (xhrobj.upload) {
// 				xhrobj.upload.addEventListener('progress', function(event) {
// 					var percent = 0;
// 					var position = event.loaded || event.position;
// 					var total = event.total;
// 					if (event.lengthComputable) {
// 							percent = Math.ceil(position / total * 100);
// 					}
// 					//Set progress
// 					status.setProgress(percent);
// 				}, false);
// 			}
// 			return xhrobj;
// 		},
// 	url: uploadURL,
// 	type: "POST",
// 	contentType:false,
// 	processData: false,
// 		cache: false,
// 		data: formData,
// 		success: function(data){
// 			status.setProgress(100);
// 			$("#status1").append("File upload Done<br>");         
// 		}
// 	}); 

// 	status.setAbort(jqXHR);
// }