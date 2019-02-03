var Core = {};

Core.getElementsByClass = function(theClass) {
    var elementArray = [];
    if (document.all)
    {
    elementArray = document.all;
    }
    else
    {
    elementArray = document.getElementsByTagName("*");
    }
    var matchedArray = [];
    var pattern = new RegExp("(^| )" + theClass + "( |$)");
    for (var i = 0; i < elementArray.length; i++)
    {
    if (pattern.test(elementArray[i].className))
    {
      matchedArray[matchedArray.length] = elementArray[i];
    }
    }
    return matchedArray;
};

function hideClass(classObj) {
    var list = Core.getElementsByClass(classObj);
    for (var i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
    }
}

function showDiv(divObj) {
    document.getElementById(divObj).style.display='block';
}

function hideDiv(divObj) {
    document.getElementById(divObj).style.display='none';
}

function revertClass(classObj) {
    var list = Core.getElementsByClass(classObj);
    for (var i = 0; i < list.length; i++) {
    list[i].className = classObj;
    }
}

function tab(obj) {
	var tabs = document.getElementById('tabs').getElementsByTagName('li');
	var list = Core.getElementsByClass('tabContent');
	for (var i = 0; i < tabs.length; i++) {
    	tabs[i].className = '';
		list[i].style.display = 'none';
		if (tabs[i] == obj) {
			obj.className = 'active';
			list[i].style.display = 'block';
		}
    }
}

function showMenu(obj) {
	var linksel = obj.parentNode.getElementsByTagName('a');
	var lielements = document.getElementsByName('parent');
	for (var i = 0; i < lielements.length; i++) {
		if(linksel[i] == obj) {
			if(lielements[i].className == '') {
				lielements[i].className = 'visibleSub';
				document.getElementById('nav').className = 'navVisible';
			} else if (lielements[i].className == 'alt') {
				lielements[i].className = 'alt visibleSub';
				document.getElementById('nav').className = 'navVisible';
			} else {
				lielements[i].className = '';
				document.getElementById('nav').className = '';
			}
		} else {
			if(linksel[i].className == 'alt') {
				lielements[i].className = 'alt';
			} else {
				lielements[i].className = '';
			}
		}
		// updated 16. Sep 14
		$("#nav .slInnerTop").html(' ');
		$('.subNavigationBottom').removeClass('subNavigationBottomMobile');
		// /updated 16. Sep 14
		$('.subNavigationTopBlock a').removeClass('active');
	}
}

function topMenu() {
	if(document.getElementById('topMenu').className == 'topMenu normalVisible') {
		document.getElementById('topMenu').className = 'topMenu';
	} else {
		document.getElementById('topMenu').className = 'topMenu normalVisible';
	}
}

function closeChairs(obj){
	var elem = obj.parentNode.parentNode.parentNode;
	if(elem.className == 'sliderTopHolder normalVisible') {
		elem.className = 'sliderTopHolder sliderTopHolderClosed normalVisible';
		obj.innerHTML = 'Show Chairs';
	} else {
		elem.className = 'sliderTopHolder normalVisible';
		obj.innerHTML = 'Hide Chairs';
	}
}

function popupOpen(obj) {
	if(document.getElementById(obj).style.display == 'block') {
		document.getElementById(obj).style.display = 'none';
		document.getElementById('popupBg').style.display = 'none';
	} else {
		document.getElementById(obj).style.display = 'block';
		document.getElementById('popupBg').style.display = 'block';
	}
	window.scroll(0, 0);
}

function popupOpen2(obj) {
	if(document.getElementById(obj).style.display == 'block') {
		document.getElementById(obj).style.display = 'none';
		document.getElementById('popupBg').style.display = 'none';
	} else {
		document.getElementById(obj).style.display = 'block';
		document.getElementById('popupBg').style.display = 'block';
	}
	
}


function textiles(obj) {
	ind = $(".colorItem").index(obj);
	$(".colorBox").hide();
	$(".colorBox").eq(ind).show();
}

function clearField(obj, def) {
	if(obj.value == def) {
		obj.value = '';
	}
}

function defaultField(obj, def) {
	if(obj.value == '') {
		obj.value = def;
	}
}

function showSearch() {
	if(document.getElementById("searchFormTop").style.display == 'inline') {
		document.getElementById("searchFormTop").style.display = 'none';
	} else {
		document.getElementById("searchFormTop").style.display = 'inline';
	}
}

function showDetails(obj) {
	if(obj.parentNode.parentNode.parentNode.className == 'reviewBox') {
		obj.parentNode.parentNode.parentNode.className = 'reviewBox reviewBoxOpened';
		obj.innerHTML = 'HIDE DETAILS';
	} else {
		obj.parentNode.parentNode.parentNode.className = 'reviewBox';
		obj.innerHTML = 'VIEW DETAILS';
	}
}

function mobileSearch() {
	if(document.getElementById("mobileSearchForm").className == 'mobileVisible mobileSearchForm mobileSearchFormVisible') {
		document.getElementById("mobileSearchForm").className = 'mobileVisible mobileSearchForm';
	} else {
		document.getElementById("mobileSearchForm").className = 'mobileVisible mobileSearchForm mobileSearchFormVisible';
	}
}
function specExpand() {
    if (document.getElementById('specExpandDiv').style.display=='none'){
        document.getElementById('specExpandDiv').style.display='block';
        document.getElementById('specExpandButton').style.backgroundImage='/userfiles/images/structure/bg-hide-link.png';
        document.getElementById('specExpandButton').innerHTML='hide full specifications';
    } else{
        document.getElementById('specExpandDiv').style.display='none';
        document.getElementById('specExpandButton').style.backgroundImage='/userfiles/images/structure/bg-hide-linkplus.png';
        document.getElementById('specExpandButton').innerHTML='show full specifications';
    }
}

//start menu script
if(document.getElementById("nav")) {
	sfHover = function() {
		var sfEls = document.getElementById("nav").getElementsByTagName("LI");
		for (var i=0; i<sfEls.length; i++) {
			sfEls[i].onmouseover=function() {
				this.className+=" sfhover";
			}
			sfEls[i].onmouseout=function() {
				this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
			}
		}
	}
	if (window.attachEvent) window.attachEvent("onload", sfHover);
}
//end menu script



// mouseleave or mouseenter events.
function isMouseLeaveOrEnter(e, handler) {
  var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
  while (reltg && reltg != handler) reltg = reltg.parentNode;
  return (reltg != handler);
}
// end mouseleave or mouseenter events.


// for admin

function updateNavItem(navid){
    ColdFusion.Window.create('navManageWindow' + navid,'Nav Management','/admin/includes/popNavManage.cfm?navid=' + navid, {x:100,y:100,height:500,width:600,modal:true,closable:true,draggable:true,resizable:true,center:true,  initshow:false,minheight:200,minwidth:200,refreshOnShow:true});
    ColdFusion.Window.show("navManageWindow" + navid);
}

function resortNavGroup(parentid){
    ColdFusion.Window.create('navSortWindow' + parentid,'Sort Nav Group','/admin/includes/popNavSort.cfm?parentid=' + parentid, {x:100,y:100,height:500,width:600,modal:true,closable:true,draggable:true,resizable:true,center:true,  initshow:false,minheight:200,minwidth:200,refreshOnShow:true});
    ColdFusion.Window.show("navSortWindow" + parentid);
}

function valFilename(fname) {
var fnameVal = fname.fileName.value;
if (/^[A-Za-z0-9_]+$/.test(fnameVal))
     {
       return true;}
else
     {
       alert("A valid filename is required \n(alphanumeric characters and underscores only)");
       return false;
     }


}



function hideClass(classObj) {
		var list = Core.getElementsByClass(classObj);
		for (var i = 0; i < list.length; i++) {
		list[i].style.display = 'none';
		}
	}

	function showClass(classObj) {
		var list = Core.getElementsByClass(classObj);
		for (var i = 0; i < list.length; i++) {
		list[i].style.display = '';
		}
}
