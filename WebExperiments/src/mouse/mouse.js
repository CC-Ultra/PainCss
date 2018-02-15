//const arrow="https://cdn.rawgit.com/CC-Ultra/PainCss/gh-pages/WebExperiments/src/mouse/pics/arrow.png";
const arrow="mouse/pics/arrow.png";

var errorClicks=0;
var honourPoints=3;
var moves=0;
var vVictory=false;

function init()
	{
	$("#honourPointsVal").text(honourPoints);
	$("#movesVal").text(moves);
	$("#msg").text("Привет");
	$(".portal").addClass("no_way");
	$(".portal > img").addClass("hidden_mouse");
	$(".block11").removeClass("no_way");
	$(".block11 > img").removeClass("hidden_mouse");
	}
function moveTo(dest,portal)
	{
	errorClicks=0;
	$("#msg").text("");
	$(".hint").removeClass("hint");
	$("#arrow").remove();

	var deadPortals= $(".current_position");
	var deadMouseImg= $(".current_position > img");
	var newPortals= $(dest);
	var newMouseImg= $(dest+" > img");

	setTimeout(function() {mouseHide(deadMouseImg); }, 0);
	setTimeout(function() {completeMouseHide(deadMouseImg); }, 500);
	setTimeout(function() {mouseShow(newMouseImg); }, 500);
	setTimeout(function() {completeMouseShow(newMouseImg); }, 1000);

	deadPortals.removeClass("current_position");
	deadPortals.addClass("no_way");
	newPortals.addClass("current_position");
	newPortals.removeClass("no_way");
	if(portal!==undefined)
		{
		setTimeout(function() {portalMove(portal); }, 0);
		setTimeout(function() {completePortalMove(portal); }, 1000);
		}
	}
function processErrorClick()
	{
	switch(errorClicks)
		{
		case 1:
			$("#msg").text("Не делай так");
			break;
		case 2:
		case 3:
			$("#msg").text("Ну не тупи");
			break;
		case 4:
		case 5:
		case 6:
			$("#msg").text("Эй, хватит!");
			break;
		default:
			$("#msg").text(":-/");
			break;
		}
	}
function victory()
	{
	$("#msg").text("Pobjeda!");
	$("#cheese").addClass("cheese_extinction_animation");
	setTimeout(completeCheeseExtinction,3000);
	var msg;
	if(honourPoints<0)
		msg="Круто, чо";
	else
		{
		if(moves<15)
			msg="Ты же знал как это проходить, правда?";
		else if(moves<30)
			msg="Отжигаешь!";
		else
			msg="Ты таки справился!";
		}
	alert(msg);
	}
function findAWay()
	{
	var index= $(".portal").index($(".current_position") );
	var way;
	switch(index)
		{
		case 1:
			way= $(".block12").get(0);
			break;
		case 5:
			way= $(".block21").get(1);
			break;
		case 8:
			way= $(".block22").get(1);
			break;
		case 11:
			way= $(".block32").get(0);
			break;
		case 13:
			way= $(".block33").get(1);
			break;
		case 16:
			way= $(".block41").get(0);
			break;
		case 22:
			way= $(".block51").get(2);
			break;
		case 27:
			way= $(".block53").get(2);
			break;
		case 31:
			way= $(".block62").get(1);
			break;
		case 35:
			way= $(".block63").get(1);
			break;
		case 37:
			way= $(".block71").get(0);
			break;
		case 40:
			way= $(".block72").get(1);
			break;
		case 42:
			way= $(".block73").get(0);
			break;
		case 44:
			way= $(".block81").get(1);
			break;
		case 46:
			way= $(".block82").get(2);
			break;
		case 0:
		case 4:
		case 10:
		case 21:
		case 26:
		case 30:
			$("#msg").text("Не скажу");
			break;
		}
	return way;
	}
function portalMove(portal)
	{
	portal.addClass("portal_move_animation");
	}
function completePortalMove(portal)
	{
	portal.removeClass("portal_move_animation");
	}
function mouseHide(img)
	{
	img.addClass("mouse_hide_animation");
	}
function completeMouseHide(img)
	{
	img.addClass("hidden_mouse");
	img.removeClass("mouse_hide_animation");
	}
function mouseShow(img)
	{
	img.addClass("mouse_show_animation");
	img.removeClass("hidden_mouse");
	}
function completeMouseShow(img)
	{
	img.removeClass("mouse_show_animation");
	}
function completeCheeseExtinction()
	{
	$("#cheese").hide();
	}

$(document).ready(function()
	{
	init();

	$("#btn_help").on("click", function()
		{
		if(vVictory)
			{
			$("#msg").text("Гамовер же");
			return;
			}
		honourPoints--;
		if(honourPoints===0)
			$("#hideable_counter_line").hide();
		$("#honourPointsVal").text(honourPoints);

		var arrowImg= $("<img src=\""+ arrow+"\"/>");
		arrowImg.addClass("element").addClass("hint");
		arrowImg.attr("id","arrow");
		$("#msg").text("Сюда ходи");
		$(findAWay() ).prepend(arrowImg);
		} );
	$("#reset").on("click", function()
		{
		if(vVictory)
			{
			$("#msg").text("Гамовер же");
			return;
			}
		moves++;
		$("#movesVal").text(moves);
		moveTo(".block11");
		} );
	$(".portal").on("click", function()
		{
		if($(this).hasClass("no_way") )
			{
			errorClicks++;
			processErrorClick();
			}
		else
			{
			if(vVictory)
				{
				$("#msg").text("Гамовер же");
				return;
				}
			moves++;
			$("#movesVal").text(moves);
			var data= $(this).data("jump");
			moveTo(data,$(this) );
			if(data===".block83")
				{
				vVictory=true;
				setTimeout(victory,1100);
				}
			}
		} );
	} );