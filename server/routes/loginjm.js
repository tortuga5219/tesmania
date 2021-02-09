var gSubMenu = new Array(5);

$(document).ready(function() {
	// 세션 종료
	logout();

	initControl();

	// logout(); // 테스트 중.
	//$('#edUserId').val("admin");
	//$('#edUserPwd').val("admin");

	// 클릭 이벤트 처리
	procEvent();
});

function initControl() {
	$('#edUserId').focus();
}

function procEvent() {
	// 로그인버튼 이벤트 	
	$('#btnLogin').click(function(){
		login();
	});

	$('#edUserId').keypress(function(evt){
		if(evt.keyCode == 13){
			$('#edUserPwd').focus();
		}
	});

	$('#edUserPwd').keypress(function(evt){
		if(evt.keyCode == 13){
			login();
		}
	});

	// 아이디 검사 
	$('#edUserId').keyup(function(event){ 
		if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
		}
	});
}

function login() {

	var userID = $('#edUserId').val();
	var userPwd = $('#edUserPwd').val();
	
	if ( checkControl(userID, userPwd) === 0 ) {
		var param = [];
		param.push(userID);
		param.push(userPwd);
		var data = JSON.stringify(param);

		$.ajax({
			url: '/api/doLogin',
			type: 'post', 
			contentType: 'application/json; charset=UTF-8',
			dataType: 'json',
			data: data,
			success: function(result) {
				console.log("doLogin success ok");
				console.log(result);	

				if(result.success){
					if(userID=="admin"){
						location.replace('company');
					}else{
						selectFirstMenu(userID);
					}
				}
				else {
					alert("사용자 ID 및 암호가 맞지 않습니다. 다시 입력하시기 바랍니다.");
					$("#edUserId").val("");
					$("#edUserPwd").val("");
					return;
				}
			},
			error:function(request,status,error){
				console.log("[Error] login");
			}	
		});	
	}
}

//2020.05.27 by Um
function selectFirstMenu(id){
	for(var i=0;i<=5;i++){
		gSubMenu[i]=new Array(9);
	}
	gSubMenu[0]=["company","customer","employee"];
	gSubMenu[1]=["dataCode", "product", "machineSensor", "machine", "machineHistory", "statusHistory", "manager", "workflow", "dataReport"];
	gSubMenu[2]=["procCoolant", "procSanlinity", "procCoating", "procConveyorForm", "procMonitoring", "procOperatingRate", "procNonOperation", "procPlan", "procResult"];
	gSubMenu[3]=["systemSetting","systemPassword","systemBackup"];
	gSubMenu[4]=["mainMonitoring"];

	var params = [id];
	var data = JSON.stringify(params);

	$.ajax({
		url: '/api/selectFirstMenu',
		type : 'post',
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		data:data,
		async:false,
		success: function(result) {
			console.log("selectFirstMenu");
			var n=result[0].main_menu;
			var m=result[0].sub_menu;
			location.replace(gSubMenu[n][m]);
		},
		error:function(request,status,error){			
			console.log("[Error] selectFirstMenu");
			return null;
		}
	});
	
}

function logout() {
	$.ajax({
		url: '/api/doLogout',
		type: 'get',
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		async:false,
		success: function(result) {
			// console.log(data);			
		},
		error:function(request,status,error){
			console.log("[Error] doLogout");
		}
	}); 
}


function checkControl(userID, userPwd) {
	var error_no = 0;
	
	if ( userID.length === 0 || userID.length > 20)
		error_no = 1;
	else if ( userID !== "samho" && ( userPwd.length < 5 || userPwd.length > 50) )
		error_no = 2;
	
	var error_msg = ["",
				"아이디는 1 ~ 20글자 이내이여야 합니다.",
				"비밀번호는 5 ~ 50글자 이내이여야 합니다."
			   ];
	if ( error_no > 0 )
	{
		alert(error_msg[error_no]);
		if (error_no === 1 ) 
			$('#edUserId').focus();
		else if (error_no === 2 ) 
			$('#edUserPwd').focus();
	}
	return error_no;
}
