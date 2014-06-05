/**
 * 
 */


$(document).on("pageinit", "#magicformula", function(){
	
	$(document).on("pagebeforeshow", "#magicformula", function(){
		loadMagicFormulaData();
	});
	
	function loadMagicFormulaData() {
		$.ajax({
			url:"http://bcs.duapp.com/magicformula/magicformula.html",
			dataType:"json",
			success:function(data) {
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
				var result = {"list":list};
				$("#magicformula-content").html(Handlebars.compile($("#magicformula-content-template").html())(result));
				$("#magicformula-content").listview("refresh");
			}
		});
	}
});