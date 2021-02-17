$(document).ready(function () {
    $('#detailModal').on('show.bs.modal', function (event) {
        console.log($(this));
        var id = $(event.relatedTarget).data('id');
        var title = $(event.relatedTarget).data('title');
        var time = $(event.relatedTarget).data('time');
        var viecount = $(event.relatedTarget).data('view');
        var writer = $(event.relatedTarget).data('writer');
        var content = $(event.relatedTarget).data('content');
        console.log(id + "," + title + "," + viecount + "," + time + "," + writer + "," + content);
        $("#id").text(id);
        $("#title").text(title);
        $("#time").text(time);
        $("#writer").text(writer);
        $("#content").text(content);
        var allData = {
            "id": id,
        }
        $.ajax({
            url: "/count_bo",
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(allData),
            success: function (data) {
                console.log(data);
                /* alert("정상적으로 등록이 처리되었습니다."); */
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("에러\\n" + textStatus + " : " + errorThrown);
            }
        });
    });
    $("#detailModal").on('hidden.bs.modal', function(event){
        console.log("colsed");
        location.reload();
    });

});

function update_chk() {
    console.log($(this));
    var idx = $("#idx").text();
    var title = $("#title").text();
    var time = $("#time").text();
    var writer = $("#writer").text();
    var content = $("#content").text();
    console.log(idx + "," + title + "," + time + "," + writer + "," + content);
    var allData = {
        "idx": idx,
        "title": title,
        "time": time,
        "writer": writer,
        "content": content,
    }
    $.ajax({
        url: "/updating",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(allData),
        success: function (data) {
            /* console.log(data); */
            /* location.href="/update_bo"; */
            /* location.href=data; */
            /* alert("정상적으로 등록이 처리되었습니다."); */
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("에러\\n" + textStatus + " : " + errorThrown);
        }
    });
}

function delete_chk() {
    console.log("detect delete")
    var index = $("#idx").text();
    var writer = $("#writer").text();
    console.log(index + "," + writer)
    var allData = {
        "idx": index,
        "writer": writer,
    }
    if (confirm("정말로 삭제 하실건가요")) {
        $.ajax({
            url: "/delete_bo",
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(allData),
            success: function (data) {
                console.log(data);
                if (data == 1) {
                    alert("정상적으로 삭제 처리되었습니다.");
                    $('#detailModal').modal("hide");
                    location.href = "/board_list";
                } else {
                    alert("본인이 아니면 삭제할 수 없습니다.");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("에러\\n" + textStatus + " : " + errorThrown);
            }
        });
    } else {
        return;
    }
}