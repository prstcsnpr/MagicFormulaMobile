/**
 * 
 */

function getArgument() {
	return JSON.parse(localStorage.argument);
}

function setArgument(argument) {
	localStorage.argument = JSON.stringify(argument);
}

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

$(document).on("pageinit", "#stockdata", function(){
	
	$(document).on("pagebeforeshow", "#stockdata", function(){
		loadStockData();
	});
	
	function loadStockData() {
		$.ajax({
			url:"http://magicformula.mouwuming.com/magicformula/showstockdata/"+getArgument().ticker,
			dataType:"json",
			timeout:1000,
			success:function(data, status) {
				generatePage(data);
			},
			error:function(xhr, status, error) {
				if (status == "error") {
					alert("网络异常, 请刷新");
				} else if (status == "timeout") {
					alert("获取数据超时, 请刷新")
				} else {
					alert("获取数据异常, 请刷新")
				}
			}
		});
	}
	
	function generateItem(data) {
		var list = new Array();
		for (i in data) {
			var item = {};
			item.year = data[i][0];
			item.value = data[i][1];
			list[i] = item;
		}
		var result = {"list":list};
		return result;
	}
	
	function generatePage(data) {
		$("#stockdata-header").text(data.data.title);
		
		$("#stockdata-content-rotc").html(Handlebars.compile($("#stockdata-content-template").html())(generateItem(data.data.annualRotc)));
		$("#stockdata-content-rotc").listview("refresh");
		
		$("#stockdata-content-roe").html(Handlebars.compile($("#stockdata-content-template").html())(generateItem(data.data.annualRoe)));
		$("#stockdata-content-roe").listview("refresh");
		
		$("#stockdata-content-cr").html(Handlebars.compile($("#stockdata-content-template").html())(generateItem(data.data.annualCR)));
		$("#stockdata-content-cr").listview("refresh");
		
		$("#stockdata-content-3-fee").html(Handlebars.compile($("#stockdata-content-template").html())(generateItem(data.data.annual3Fee)));
		$("#stockdata-content-3-fee").listview("refresh");
		
		$("#stockdata-content-owner-s-equity-ratio").html(Handlebars.compile($("#stockdata-content-template").html())(generateItem(data.data.annualOER)));
		$("#stockdata-content-owner-s-equity-ratio").listview("refresh");
		
		$("#stockdata-content-gross-profit-margin").html(Handlebars.compile($("#stockdata-content-template").html())(generateItem(data.data.annualGPM)));
		$("#stockdata-content-gross-profit-margin").listview("refresh");
		
		$("#stockdata-content-fcf").html(Handlebars.compile($("#stockdata-content-template").html())(generateItem(data.data.annualFCF)));
		$("#stockdata-content-fcf").listview("refresh");
	}
});

$(document).on("pageinit", "#grahamformula", function() {
	
	$(document).on("pagebeforeshow", "#grahamformula", function() {
		loadGrahamFormulaData();
	});
	
	$(document).on("tap", ".grahamformula-stockitem", function() {
		setArgument({"ticker":$(this).find("input").val()});
	});
	
	$(document).on("tap", "#grahamformula-header-refresh", function() {
		loadGrahamFormulaData();
	});
	
	function generatePage(data) {
		var list = new Array();
		for (i in data.list) {
			var item = {};
			item.ticker = data.list[i].ticker;
			item.title = data.list[i].title;
			item.pe = data.list[i].PE;
			item.ownersEquityRatio = data.list[i].ownersEquityRatio;
			item.marketCapital = data.list[i].marketCapital
			item.earningsDate = data.list[i].earningsDate
			list[i] = item;
		}
		$("#grahamformula-header").text(data.date);
		var result = {"list":list};
		$("#grahamformula-content").html(Handlebars.compile($("#grahamformula-content-template").html())(result));
		$("#grahamformula-content").listview("refresh");
	}
	
	function loadGrahamFormulaData() {
		$.ajax({
			url:"http://magicformula.mouwuming.com/magicformula/showgrahamformula",
			dataType:"json",
			timeout:1000,
			success:function(data, status) {
				generatePage(data);
			},
			error:function(xhr, status, error) {
				if (status == "error") {
					alert("网络异常, 请刷新");
				} else if (status == "timeout") {
					alert("获取数据超时, 请刷新")
				} else {
					alert("获取数据异常, 请刷新")
				}
			}
		});
	}
});

$(document).on("pageinit", "#magicformula", function(){
	
	$(document).on("pagebeforeshow", "#magicformula", function() {
		loadMagicFormulaData();
	});
	
	$(document).on("tap", ".magicformula-stockitem", function() {
		setArgument({"ticker":$(this).find("input").val()});
	});
	
	$(document).on("tap", "#magicformula-header-refresh", function() {
		loadMagicFormulaData();
	});
	
	function generatePage(data) {
		var list = new Array();
		for (i in data.list) {
			var item = {};
			item.ticker = data.list[i].ticker;
			item.title = data.list[i].title;
			item.rotc = data.list[i].rotc;
			item.ey = data.list[i].ey;
			item.rank = data.list[i].rank;
			//item.rotcRank = data.list[i].rotcRank;
			//item.eyRank = data.list[i].eyRank;
			item.marketCap = data.list[i].marketCapital
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
			url:"http://magicformula.mouwuming.com/magicformula/showmagicformula",
			dataType:"json",
			timeout:1000,
			success:function(data, status) {
				generatePage(data);
			},
			error:function(xhr, status, error) {
				if (status == "error") {
					alert("网络异常, 请刷新");
				} else if (status == "timeout") {
					alert("获取数据超时, 请刷新")
				} else {
					alert("获取数据异常, 请刷新")
				}
			}
		});
	}
});