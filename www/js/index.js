/**
 * 
 */


$(document).on("pageinit", "#magicformula", function(){
	
	$(document).on("pagebeforeshow", "#magicformula", function(){
		loadMagicFormulaData();
	});
	
	function generatePage(data) {
		var list = new Array();
		for (i in data.list) {
			var item = {};
			item.ticker = data.list[i].code;
			item.title = data.list[i].name;
			item.rotc = data.list[i].rotc;
			item.ey = data.list[i].ey;
			item.rank = data.list[i].rank;
			item.rotcRank = data.list[i].rotcRank;
			item.eyRank = data.list[i].eyRank;
			item.marketCap = data.list[i].marketCap
			item.earningsDate = data.list[i].earningsDate
			list[i] = item;
		}
		$("#magicformula-header").text("神奇公式(" + data.date + ")");
		var result = {"list":list};
		$("#magicformula-content").html(Handlebars.compile($("#magicformula-content-template").html())(result));
		$("#magicformula-content").listview("refresh");
	}
	
	function loadMagicFormulaData() {
		$.ajax({
			url:"http://bcs.duapp.com/magicformula/magicformula.html",
			dataType:"json",
			timeout:1000,
			success:function(data, status) {
				generatePage(data);
				localStorage.result = JSON.stringify(data)
			},
			error:function(xhr, status, error) {
				if (localStorage.result) {
					data = JSON.parse(localStorage.result);
					generatePage(data);
				} else {
					alert("网络异常");
				}
			}
		});
	}
});