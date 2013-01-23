/*
  Date.toString.js
  
  Except otherwise declared: © Copyright 2013  James Thoburn http://jthoburn.com, http://runspired.com
  Available under Creative Commons, no attribution required (but I'd always appreciate love).
  
  The beat calculation (I'd never heard of the Internet Beat before) is inspired by http://www.jr.pl/www.quirksmode.org/js/beat.html
  
  Timezone based calculations utilize MIT licensed https://bitbucket.org/pellepim/jstimezonedetect/overview
  For which I've provided an exposed method.  Due to how many timezones there are and all the problems associated, read
  the Overview linked above for what you'll be getting.
  
  
  
  ::	NOTE / BEST PRACTICE WARNING	::
	
	It is not considered best practice to modify the prototpyes of Native Javascript objects.  Here,
	while the case could be made that the native Date object is extremely limited in abilities and usefullness
	I still would not recommend modifying the prototype.  In my own use, the code below is converted
	for use in a "native object expansion / chaining" library.
	
	:: Last Point	::
	I have run no performance tests on this script, and there's a few things that could stand some optimization.

*/

//returns an object with the Olson timezone name, 
Date.prototype.getTimezone = function() {
		
}

Date.prototype.toString = function(f) {

  var f   =	String(f);

  if( !f )
    f = 'D l d Y H:i:s \G\M\TO (T)';

  var i	=	f.length,
		  ret	=	'',
		  DO	=	this,
		  map	=	{
					d	:	function(){ var d = String( DO.getDate() ); return (d.length == 1)? '0'+d : d;  }, //day
					D	:	function(){ var abbr = Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat'); return abbr[ DO.getDay() ]; },
					j	:	function(){ return DO.getDate(); },
					l	:	function(){ var days = Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'); return days[ DO.getDay() ]; },
					N	:	function(){ var d = DO.getDay(); return (d == 0)? '7' : String(d) ;},
					S	:	function(){ var d = DO.getDate(); if( d > 3 && d < 21 ) return 'th'; d = d % 10; if( d == 1 ) return 'st'; if ( d == 2 ) return 'nd'; if( d == 3 ) return 'rd'; return 'th';  },
					w	:	function(){ return DO.getDay(); },
					z	:	function(){ var SD = new Date( DO.getFullYear(), 0, 1); return Math.ceil( ( DO.getTime() - SD.getTime() ) / (24 * 60 * 60 * 1000) ) + 1; },
					W	:	function(){ var ST = new Date( DO.getFullYear(), 0, 1 ); if( ST.getDay() != 4 ) ST.setMonth( 0, 1 + (( 4 - ST.getDay()) + 7) % 7); var FT = new Date( DO.valueOf() );  FT.setDate( FT.getDate() - ((DO.getDay() + 6) %7) + 3); return 1 + Math.ceil( ( ST.getTime() - FT.getTime() ) / (7 *24 * 60 * 60 * 1000)); },	//week
					F	:	function(){ var months = Array('January','February','March','April','May','June','July','August','September','October','November','December'); return months[ DO.getMonth() ]; }, //month
					m	:	function(){ var m = String( DO.getMonth() + 1 ); return (m.length == 1)? '0'+m : m; },
					M	:	function(){ var months = Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'); return months[ DO.getMonth() ]; },
					n	:	function(){ return String( DO.getMonth() + 1 ); },
					t	:	function(){ var EOM = new Date( DO.getYear, DO.getMonth() + 1, 0); return String( EOM.getDate() ); },
					L	:	function(){ var EOF = new Date( DO.getYear, 2 , 0); return (EOF.getDate() == 28)? '0' : '1'; }, //year
					o	:	function(){ var T = new Date(DO.valueOf());  T.setDate( T.getDate() - ((DO.getDay() + 6) % 7) + 3); return String( T.getFullYear() ); },
					Y	:	function(){ return String( DO.getFullYear() ); },
					y	:	function(){ return String( DO.getFullYear() ).substr(2); },
					a	:	function(){ return (( DO.getHours() * 3600 + DO.getMinutes() * 60  + DO.getSeconds() ) > 43200)? 'pm' : 'am'; },	//time
					A	:	function(){ return (( DO.getHours() * 3600 + DO.getMinutes() * 60  + DO.getSeconds() ) > 43200)? 'PM' : 'AM'; },
					B	:	function(){
								var off = (DO.getTimezoneOffset() + 60)*60;
								var theSeconds = (DO.getHours() * 3600) + (DO.getMinutes() * 60) + DO.getSeconds() + off;
								var beat = Math.floor(theSeconds/86.4);
								if (beat > 1000) beat -= 1000;
								if (beat < 0) beat += 1000;
								return beat; }, //see http://www.jr.pl/www.quirksmode.org/js/beat.html but altered to use DST detection
					g	:	function(){ var h = DO.getHours(); if( h == 0) return '12'; return String( h % 12 ); },
					G	:	function(){ return String( DO.getHours() ); },
					h	:	function(){ var h = DO.getHours(); if( h == 0) return '12'; h = String(h % 12 ); return (h.length == 1)? '0'+h : h; },
					H	:	function(){ var h = String( DO.getHours() ); return (h.length == 1)? '0'+h : h; },
					i	:	function(){ return String( DO.getMinutes() ); },
					s	:	function(){ return String( DO.getSeconds() ); },
					u	:	function(){ return String( DO.getMilliSeconds() )+'000'; },
					e	:	function(){ return false; },	//timezone
					I	:	function(){ return false; },
					O	:	function(){ return false; },
					P	:	function(){ return false; },
					T	:	function(){ return false; },
					Z	:	function(){ return false; },
					c	:	function(){ return false; },	//Full Date/Time
					r	:	function(){ return false; },
					U	:	function(){ return false; }
				};
			
		
	while( i-- ) {
		if( map.hasOwnProperty( f[i] ) && ( !i || f[i-1] != '\') )
			ret = map[ f[i] ]() + ret;
		else
			ret = f[i] + ret;
	}
	
	return ret;
	
}
