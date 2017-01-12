/*jslint browser: true, devel: true, white: true, bitwise: true, eqeq: true, plusplus: true, vars: true*/
/*global $, jQuery, to, getDate*/

/*
TODO: 
Card View
*/

$(document).ready(function () {
    'use strict';

var trade_data = [
  {
    "coin": "XCP",
    "bal": "15.2322",
    "bal_fiat": "98.23",
    "profit_fct": "2.1",
    "gross_profit": "1,000,000.00",
    "gross_profit_perc": "1000",
    "gross_loss": "0.00",
    "gross_loss_perc": "-1000",
    "max_neg": "0.00",
    "max_neg_perc": "0",
    "biggest_win": "139,323.00",
    "biggest_loss": "0.00",
    "num_winners": "143",
    "num_losers": "0"
  },
  {
    "coin": "DGB",
    "bal": "872411.489",
    "bal_fiat": "45.99",
    "profit_fct": "-0.5",
    "gross_profit": "135.01",
    "gross_profit_perc": "2.409",
    "gross_loss": "190.00",
    "gross_loss_perc": "34.2",
    "max_neg": "1202.00",
    "max_neg_perc": "140",
    "biggest_win": "2.00",
    "biggest_loss": "134.00",
    "num_winners": "4",
    "num_losers": "59"
  },
  {
    "coin": "OMNI",
    "bal": "12.2",
    "bal_fiat": "210.34",
    "profit_fct": "1.2",
    "gross_profit": "122.30",
    "gross_profit_perc": "12.7",
    "gross_loss": "19.00",
    "gross_loss_perc": "34.2",
    "max_neg": "90.00",
    "max_neg_perc": "6.823",
    "biggest_win": "94.26",
    "biggest_loss": "12.00",
    "num_winners": "7",
    "num_losers": "2"
  },
];

var stops_data = [
  {
    "coin": "XCP",
    "type": "Trailing Stop",
    "stop_at": "0.00389000",
    "current": "0.00736248	",
    "change_24hrs": "3.98",
    "balance": "143.5",
    "sell": "143.5",
    "start_at": "0.00806248"
  },
  {
    "coin": "XCP",
    "type": "Trailing Stop",
    "stop_at": "0.00389000",
    "current": "0.00736248	",
    "change_24hrs": "3.98",
    "balance": "143.5",
    "sell": "143.5",
    "start_at": "0.00806248"
  },
  {
    "coin": "XCP",
    "type": "Trailing Stop",
    "stop_at": "0.00389000",
    "current": "0.00736248	",
    "change_24hrs": "3.98",
    "balance": "143.5",
    "sell": "143.5",
    "start_at": "0.00806248"
  }
];
  
var locale = window.navigator.userLanguage || window.navigator.language;    
    
$.extend($.fn.bootstrapTable.columnDefaults, {
  	sortable: true
});  
  
$('#coins_traded_table').bootstrapTable({
  // url: 'data1.json',
  data: trade_data,
  showColumns: true,
  cardView: false, // change on media queries
  undefinedText: "na", // 'not applicable', if there is no data
  detailView: true,
  locale: locale,
    mobileResponsive: true,
    minWidth: 900
});

$('#stops_table').bootstrapTable({
  // url: 'data1.json',
  data: stops_data,
  showColumns: true,
  cardView: false, // change on media queries
  undefinedText: "na", // 'not applicable', if there is no data
  detailView: true,
    locale: locale,
    mobileResponsive: true
});
  
// adds a '£' to currencies. Set html data-formatter="currencyFormat"
function currencyFormat(value) {
    return '£' + value;
}
// adds '%'
function percentageFormat(value) {
    return value + '%';
}

/*
function priceFormatter(value) {
// 16777215 == ffffff in decimal
var color = '#'+Math.floor(Math.random() * 6777215).toString(16);
return '<div  style="color: ' + color + '">' +
        '<i class="glyphicon glyphicon-usd"></i>' +
        value.substring(1) +
        '</div>';
}*/

// Function to call AJAX and generate graph
$('#coins_traded_table').on('expand-row.bs.table', function (e, index, row, $detail) {
  $detail.html('Loading data...');
});


/*-----------------*/  
/* GENERAL HELPERS */
/*-----------------*/

    
// jQuery UI datepicker
var dateFormat = "dd/mm/yy",
from = $( "#from" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 1,
    dateFormat: "dd-mm-yy"
  }).on( "change", function() {to.datepicker( "option", "minDate", getDate( this ) );}),to = $( "#to" ).datepicker({
    defaultDate: "+1w", changeMonth: true, numberOfMonths: 1
  }).on( "change", function() {from.datepicker( "option", "maxDate", getDate( this ) );});
function getDate( element ) {
  var date;
  try {
    date = $.datepicker.parseDate( dateFormat, element.value );
  } catch( error ) {
    date = null;
  }
  return date;
}
  
    
// Title Cheveron click slides up content
$('.row_title').click(function(){
  $(this).find('i').toggleClass('rotator');
  $(this).parents('.inner_data_column').find('.data_main_bit').slideToggle();
});
    
    
//On scroll select appropriate nav li
function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('nav ul li').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.find("a").attr("href"));
        if (refElement.position().top-70 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('nav ul li').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}
$(document).on("scroll", onScroll);

    
//On click select appropriate nav li
$('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $('li').each(function () {
        $(this).removeClass('active');
    });
    $(this).parent().addClass('active');

    var target = this.hash,
        menu = target,
        $target = $(target);
        
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top-70
    }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
    });
});

    
// JqueryUI tooltips NOT WORKING!?!?!
// $('#wrapper').tooltip();
  
    
// ERROR dialog generator
$( "#error_dialog" ).dialog({
  resizable: false,
  height: "auto",
  width: 400,
  modal: true,
  buttons: {
    "Delete everything": function() {
      $( this ).dialog( "close" );
    },
  }
});
  
    
// JqueryUI form tab unit into tabs
$("#tab_unit").tabs();  

    
/*-----------------*/  
/* RISK CALC STUFF */
/*-----------------*/
var total_bal, risk_perc, stop_perc, buy_amt, risk_amt,kill_amt;
$("#risk_calc input").keyup(function(){
  var $val = $(this).val(),
      $id = $(this).attr('id');
  
  if ($id == "total_bal") {
    total_bal = $val;
  } else if ($id == "risk_perc") {
    risk_perc = $val;
  } else if ($id == "stop_perc") {
    stop_perc = $val;
  }
  
  risk_amt = total_bal*(risk_perc/100);
  buy_amt = risk_amt/(stop_perc/100);
  kill_amt = 100/risk_perc;
  
  $('#buy_amt').html(buy_amt);
  $('#risk_amt').html(risk_amt);
  $('#kill_amt').html(kill_amt);
});

    
});  

