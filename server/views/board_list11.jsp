<!-- <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>     -->
<!DOCTYPE html>
<html>
<head>
<!-- 루트 폴더에 부트스트랩을 참조하는 링크 -->
<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet"/>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
<!-- 화면 최적화 -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<meta charset="UTF-8">
<script type="text/javascript">
$(document).ready(function() {
		$('#detailModal').on('show.bs.modal', function (event) {
			console.log($(this));
			var idx = $(event.relatedTarget).data('id');
			var title = $(event.relatedTarget).data('title');
			var time = $(event.relatedTarget).data('time');
			var viecount = $(event.relatedTarget).data('view');
			var writer = $(event.relatedTarget).data('writer');
			var content = $(event.relatedTarget).data('content');
			console.log(idx +","+title+","+viecount+","+time+","+writer+","+content);
			
			$("#idx").text(idx);
			$("#title").text(title);
			$("#time").text(time);
			$("#writer").text(writer);
			$("#content").text(content);
		
			var allData = {
					"idx" : idx,
				}
			$.ajax({
				url:"/count_bo",
				type:'POST',
		        contentType: 'application/json; charset=utf-8',
		        data: JSON.stringify(allData),
		        success:function(data){
		        	console.log(data);
		        	/* alert("정상적으로 등록이 처리되었습니다."); */ 
		           
		        },
		        error:function(jqXHR, textStatus, errorThrown){
		            alert("에러\n" + textStatus + " : " + errorThrown);
		        }
		}); 
	});
});
				
</script>

<script type="text/javascript">

function update_chk(){
	console.log($(this));
	var idx = $("#idx").text();
	var title = $("#title").text();
	var time = $("#time").text();
	var writer = $("#writer").text();
	var content = $("#content").text();
	
	console.log(idx +","+title+","+time+","+writer+","+content);
var allData = {
		"idx" : idx,
		"title" : title,
		"time" : time,
		"writer" : writer,
		"content" : content,
	}
	$.ajax({
		url:"/updating",
		type:'POST',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(allData),
	    success:function(data){
	    	/* console.log(data); */
	    	/* location.href="/update_bo"; */
	    	/* location.href=data; */
	    	/* alert("정상적으로 등록이 처리되었습니다."); */
	       
	    },
	    error:function(jqXHR, textStatus, errorThrown){
	        alert("에러\n" + textStatus + " : " + errorThrown);
	    }
	}); 
}

function delete_chk(){
	
	console.log("detect delete")
	var index = $("#idx").text();
	var writer = $("#writer").text();
	
	console.log(index+","+writer)
	var allData = {
			"idx" : index,
			"writer" : writer,
	}
	if(confirm("정말로 삭제 하실건가요")){
	$.ajax({
		url:"/delete_bo",
		type:'POST',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(allData),
	    success:function(data){
	    	console.log(data);
	    	if(data == 1){
	    		alert("정상적으로 삭제 처리되었습니다.");
	    		$('#detailModal').modal("hide");
	    		location.href="/board_list";
	    	}else{
	    		alert("본인이 아니면 삭제할 수 없습니다.");
	    	}
	       
	    },
	    error:function(jqXHR, textStatus, errorThrown){
	        alert("에러\n" + textStatus + " : " + errorThrown);
	    }
	}); 
	}else{		
		return;
	}
		
}
</script>
<script>
	

</script>
<style type="text/css">

.table-row{
cursor:pointer;
}
li{
list-style: none; float: left;	
}



</style>
<!-- 스타일시트 참조  -->
<title>neo 게시판</title>
</head>
<body>

	<%
	//로긴한사람이라면	 userID라는 변수에 해당 아이디가 담기고 그렇지 않으면 null값
	String id = null;
	if (session.getAttribute("id") != null) {
		id = (String) session.getAttribute("id");
		int pageNumber = 1; //기본 페이지 넘버	

		//페이지넘버값이 있을때
		if (request.getParameter("pageNumber") != null) {
			pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
		}
	}
	%>
	
	<!-- 네비게이션  -->
	<nav class="navbar navbar-default navbar-expand-sm navbar-dark bg-primary">
		<a class="navbar-brand" href="#">
			<img class="d-inline-block align-center" src="/images/testlogo.png" width="36" height="36"/>
			게시판
		</a>
			<button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expaned="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
		<div class="collapse navbar-collapse" id="#navbarSupportedContent">
			<ul class="navbar-nav">
			</ul>
			<%
			//라긴안된경우
			if (id == null) {
			%>
			
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown">
					<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">접속하기
						<span class="caret"></span>
					</a>
					<div class="dropdown-menu">
						<a class="dropdown-item" href="/">로그인</a>
						<a class="dropdown-item" href="#">회원가입</a>
					</div>
				</li>		
			</ul>
			<%
			} else {
			%>
			<ul class="nav navbar-nav navbar-right">
				<li>
					<a href="/logout" class="nav-link" role="button" aria-haspopup="true" aria-expanded="false">로그아웃
						<span class="caret"></span>
					</a>
				</li>
			</ul>
			<%
			}
			%>
		</div>
		<form class="form-inline my-2 my-lg-0">
    			<input class="form-control mr-sm-2" type="search" placeholder="제목 검색" aria-label="Search">
    			<button class="btn bg-light my-2 my-sm-0" type="submit">검색</button>
  		</form>
	</nav>
	<!-- 게시판 -->
	<div class="outter">
		<!-- <div class="container align-items-center"> -->
		<h2>게시판</h2>
			<div class="col p-5" style="width: 100%">
			<!--row align-items-center  -->
			<!-- <img class="d-block mx-auto mb-2" src="http://www.neotek.kr/share/images/common/logo.gif" alt="144" width="152" height="82"> -->
				<!-- <h2 style="text-align:center; gap:20px 5px;"> 게시판</h2> -->
				
				<!-- <div class="col align-self-center"> -->
					<table id="Blist_Table" class="table table-hover solid">
						<thead>
							<tr>
								<th style="background-color: #eeeeee; text-align: center;">번호</th>
								<th style="background-color: #eeeeee; text-align: center;">제목</th>
								<th style="background-color: #eeeeee; text-align: center;">작성자</th>
								<th style="background-color: #eeeeee; text-align: center;">작성일</th>
								<th style="background-color: #eeeeee; text-align: center;">조회수</th>
							</tr>
						</thead>
						<tbody>
							<c:forEach var="packageData" items="${list}" >
								<tr data-target="#detailModal" data-toggle="modal" 
								data-id="${packageData.idx}" data-title="${packageData.title }" data-writer="${packageData.writer }" data-content="${packageData.content }" data-time="${packageData.insertTime }" data-view="${packageData.viewCnt}">
									<td class="table-row" style="text-align: center;">${packageData.idx}</td>
									<td class="table-row" style="text-align: center;">${packageData.title}</td>
									<td class="table-row" style="text-align: center;">${packageData.writer}</td>
									<td class="table-row" style="text-align: center;"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${packageData.insertTime}"/></td>
									<td class="table-row" style="text-align: center;">${packageData.viewCnt}</td>
								</tr>
							</c:forEach>
						</tbody>
						<tfoot>
						</tfoot>
					</table>
					<div class="col-md-12">
					
						<ul class="btn-group pagination justify-content-md-center">
							<c:if test="${pageMaker.prev }">
								<li class="page-item">
									<a class="page-link" href='<c:url value="/board_list?page=${pageMaker.startPage-1 }"/>'>이전<i class="fa fa-chevron-left"></i></a>
								</li>
							</c:if>
							
							<c:forEach begin="${pageMaker.startPage }" end="${pageMaker.endPage }" var="pageNum">
  							 	
								<%-- 	<li class="page-item active">
										<a class="page-link active" href='<c:url value="/board_list?page=${pageNum }"/>'><i class="fa">${pageNum}</i></a>
									</li>		 --%>					
								
									<li class="page-item">
										<a class="page-link" href='<c:url value="/board_list?page=${pageNum }"/>'>${pageNum}</a>
									</li>
							</c:forEach>
							
							<c:if test="${pageMaker.next && pageMaker.endPage > 0}">
								<li class="page-item">
									<a class="page-link" href='<c:url value="/board_list?page=${pageMaker.endPage+1 }"/>'>다음<i class="arrow-right-circle"></i></a>
								</li>
							</c:if>

						  </ul>
						  <span></span>
				  				<a class="btn btn-primary float-right" onClick="location.href='/writeing'">글쓰기</a>
				  				<!-- <a class="btn btn-primary float-right" onClick="/testdata">테스트 데이터 생성</a> -->
					</div>	
			</div>
		<!-- </div> -->
	</div>

	<div class="modal fade bd-example-modal-lg" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="detailModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h3 class="modal-title" id="detailModalLabel">게시글 상세보기</h3>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form>
						<table class="table table-bordered">
							<thead>
								<tr>
									<th scope="col" style="width:200px; text-align:center">번호</th>
									<td id="idx" scope="col" style="width:400px; text-align:center"></td>
									<th scope="col" style="width:200px; text-align:center">작성자</th>
									<td id="writer" scope="col" style="width:400px; text-align:center"></td>
								</tr>									
								<tr>
								    <th scope="row" style=" text-align:center;">제목</th>
								    <td id="title" style=" text-align:center;"></td>
								    <th scope="row" style=" text-align:center;">작성일</th>
								    <td id="time" style=" text-align:center;"></td>
								</tr>
								<tr>
								    <td id="content" colspan="4" style=" text-align:left; height:600px"></td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</form>
						<div class="modal-footer">
							<!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button> -->
							<button type="submit" id="comfirm" name="comfirm" class="btn btn-primary" onClick="update_chk();">수정하기</button>
							<button type="submit" id="delete" name="delete" class="btn btn-primary" onClick="delete_chk();">삭제하기</button>
							<!-- <button ty href="write.jsp" style="gap: 0px 5px" class="btn btn-primary">글삭제</a> -->
						</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>