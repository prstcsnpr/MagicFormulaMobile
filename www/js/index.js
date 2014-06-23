/**
 * 
 */

var app = { 
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },  
    // Bind Event Listeners
    //  
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },  
    // deviceready Event Handler
    //  
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        StatusBar.hide();
    },  
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).on("pageinit", "#magicformula", function(){
	
	$(document).on("pagebeforeshow", "#magicformula", function() {
		loadMagicFormulaData();
	});
	
	$(document).on("tap", "#magicformula-header-refresh", function() {
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
		$("#magicformula-header").text(data.date);
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
				$("#magicformula-content-error").hide();
				generatePage(data);
				$("#magicformula-content").show();
			},
			error:function(xhr, status, error) {
				$("#magicformula-content").hide();
				if (status == "error") {
					$("#magicformula-content-error").html("<p style='text-align:center'>网络异常</p><p style='text-align:center'>请刷新</p>");
				} else if (status == "timeout") {
					$("#magicformula-content-error").html("<p style='text-align:center'>获取数据超时</p><p style='text-align:center'>请刷新</p>");
				} else {
					$("#magicformula-content-error").html("<p style='text-align:center'>获取数据异常</p><p style='text-align:center'>请刷新</p>");
				}
				$("#magicformula-content-error").show();
			}
		});
	}
});