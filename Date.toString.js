/*
  Date.toString.js
  
  Except otherwise declared: © Copyright 2013  James Thoburn http://jthoburn.com, http://runspired.com
  Available under Creative Commons, no attribution required (but I'd always appreciate love).
  
  The beat calculation (I'd never heard of the Internet Beat before) is inspired by http://www.jr.pl/www.quirksmode.org/js/beat.html
  
  Timezone name calculation utilizes modified MIT licensed https://bitbucket.org/pellepim/jstimezonedetect/overview
  Due to how many timezones there are and all the problems associated, read the Overview linked above for what you'll be getting.
  
  Timezone abbreviation trusts the browser to have gotten it right in the original toString method, and returns a substring from that method.
  
  
  ::	NOTE / BEST PRACTICE WARNING	::
	
	It is not considered best practice to modify the prototpyes of Native Javascript objects.  Here,
	while the case could be made that the native Date object is extremely limited in abilities and usefullness
	I still would not recommend modifying the prototype.  In my own use, the code below is converted
	for use in a "native object expansion / chaining" library.
	
	:: Last Point	::
	I have run no performance tests on this script, and there's a few things that could stand some optimization.

*/

//cache the old version, we'll also use this for getting the time zone abbreviation
Date.prototype.cachedToString = Date.prototype.toString;

Date.prototype.toString = function formatDate(f) {

  if( !f )
    return this.cachedToString();	// 'D l d Y H:i:s \G\M\TO (T)';

  var	  f   =	String(f)
   		  i	=	f.length,
		  ret	=	'',
		  DO	=	this,
		  _p = function(n,c) {
		  			n = n.toString();
		  			return n.length < c ? _p('0' + n, c) : n;
		  },
		  days = Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'),
		  months = Array('January','February','March','April','May','June','July','August','September','October','November','December'),
          	  ru_pre_dst_change = new Date(2010, 6, 15, 1, 0, 0, 0),
		  dst_starts = {
                    'America/Denver':       new Date(2011, 2, 13, 3, 0, 0, 0),
                    'America/Mazatlan':     new Date(2011, 3, 3, 3, 0, 0, 0),
                    'America/Chicago':      new Date(2011, 2, 13, 3, 0, 0, 0),
                    'America/Mexico_City':  new Date(2011, 3, 3, 3, 0, 0, 0),
                    'America/Asuncion':     new Date(2012, 9, 7, 3, 0, 0, 0),
                    'America/Santiago':     new Date(2012, 9, 3, 3, 0, 0, 0),
                    'America/Campo_Grande': new Date(2012, 9, 21, 5, 0, 0, 0),
                    'America/Montevideo':   new Date(2011, 9, 2, 3, 0, 0, 0),
                    'America/Sao_Paulo':    new Date(2011, 9, 16, 5, 0, 0, 0),
                    'America/Los_Angeles':  new Date(2011, 2, 13, 8, 0, 0, 0),
                    'America/Santa_Isabel': new Date(2011, 3, 5, 8, 0, 0, 0),
                    'America/Havana':       new Date(2012, 2, 10, 2, 0, 0, 0),
                    'America/New_York':     new Date(2012, 2, 10, 7, 0, 0, 0),
                    'Asia/Beirut':          new Date(2011, 2, 27, 1, 0, 0, 0),
                    'Europe/Helsinki':      new Date(2011, 2, 27, 4, 0, 0, 0),
                    'Europe/Istanbul':      new Date(2011, 2, 28, 5, 0, 0, 0),
                    'Asia/Damascus':        new Date(2011, 3, 1, 2, 0, 0, 0),
                    'Asia/Jerusalem':       new Date(2011, 3, 1, 6, 0, 0, 0),
                    'Asia/Gaza':            new Date(2009, 2, 28, 0, 30, 0, 0),
                    'Africa/Cairo':         new Date(2009, 3, 25, 0, 30, 0, 0),
                    'Pacific/Auckland':     new Date(2011, 8, 26, 7, 0, 0, 0),
                    'Pacific/Fiji':         new Date(2010, 11, 29, 23, 0, 0, 0),
                    'America/Halifax':      new Date(2011, 2, 13, 6, 0, 0, 0),
                    'America/Goose_Bay':    new Date(2011, 2, 13, 2, 1, 0, 0),
                    'America/Miquelon':     new Date(2011, 2, 13, 5, 0, 0, 0),
                    'America/Godthab':      new Date(2011, 2, 27, 1, 0, 0, 0),
                    'Europe/Moscow':        ru_pre_dst_change,
                    'Asia/Yekaterinburg':   ru_pre_dst_change,
                    'Asia/Omsk':            ru_pre_dst_change,
                    'Asia/Krasnoyarsk':     ru_pre_dst_change,
                    'Asia/Irkutsk':         ru_pre_dst_change,
                    'Asia/Yakutsk':         ru_pre_dst_change,
                    'Asia/Vladivostok':     ru_pre_dst_change,
                    'Asia/Kamchatka':       ru_pre_dst_change,
                    'Europe/Minsk':         ru_pre_dst_change,
                    'Australia/Perth':      new Date(2008, 10, 1, 1, 0, 0, 0)
                },
          HEMISPHERE_SOUTH = 's',
		  timezones = {
								  '-720,0'   : 'Etc/GMT+12',
								  '-660,0'   : 'Pacific/Pago_Pago',
								  '-600,1'   : 'America/Adak',
								  '-600,0'   : 'Pacific/Honolulu',
								  '-570,0'   : 'Pacific/Marquesas',
								  '-540,0'   : 'Pacific/Gambier',
								  '-540,1'   : 'America/Anchorage',
								  '-480,1'   : 'America/Los_Angeles',
								  '-480,0'   : 'Pacific/Pitcairn',
								  '-420,0'   : 'America/Phoenix',
								  '-420,1'   : 'America/Denver',
								  '-360,0'   : 'America/Guatemala',
								  '-360,1'   : 'America/Chicago',
								  '-360,1,s' : 'Pacific/Easter',
								  '-300,0'   : 'America/Bogota',
								  '-300,1'   : 'America/New_York',
								  '-270,0'   : 'America/Caracas',
								  '-240,1'   : 'America/Halifax',
								  '-240,0'   : 'America/Santo_Domingo',
								  '-240,1,s' : 'America/Santiago',
								  '-210,1'   : 'America/St_Johns',
								  '-180,1'   : 'America/Godthab',
								  '-180,0'   : 'America/Argentina/Buenos_Aires',
								  '-180,1,s' : 'America/Montevideo',
								  '-120,0'   : 'Etc/GMT+2',
								  '-120,1'   : 'Etc/GMT+2',
								  '-60,1'    : 'Atlantic/Azores',
								  '-60,0'    : 'Atlantic/Cape_Verde',
								  '0,0'      : 'Etc/UTC',
								  '0,1'      : 'Europe/London',
								  '60,1'     : 'Europe/Berlin',
								  '60,0'     : 'Africa/Lagos',
								  '60,1,s'   : 'Africa/Windhoek',
								  '120,1'    : 'Asia/Beirut',
								  '120,0'    : 'Africa/Johannesburg',
								  '180,0'    : 'Asia/Baghdad',
								  '180,1'    : 'Europe/Moscow',
								  '210,1'    : 'Asia/Tehran',
								  '240,0'    : 'Asia/Dubai',
								  '240,1'    : 'Asia/Baku',
								  '270,0'    : 'Asia/Kabul',
								  '300,1'    : 'Asia/Yekaterinburg',
								  '300,0'    : 'Asia/Karachi',
								  '330,0'    : 'Asia/Kolkata',
								  '345,0'    : 'Asia/Kathmandu',
								  '360,0'    : 'Asia/Dhaka',
								  '360,1'    : 'Asia/Omsk',
								  '390,0'    : 'Asia/Rangoon',
								  '420,1'    : 'Asia/Krasnoyarsk',
								  '420,0'    : 'Asia/Jakarta',
								  '480,0'    : 'Asia/Shanghai',
								  '480,1'    : 'Asia/Irkutsk',
								  '525,0'    : 'Australia/Eucla',
								  '525,1,s'  : 'Australia/Eucla',
								  '540,1'    : 'Asia/Yakutsk',
								  '540,0'    : 'Asia/Tokyo',
								  '570,0'    : 'Australia/Darwin',
								  '570,1,s'  : 'Australia/Adelaide',
								  '600,0'    : 'Australia/Brisbane',
								  '600,1'    : 'Asia/Vladivostok',
								  '600,1,s'  : 'Australia/Sydney',
								  '630,1,s'  : 'Australia/Lord_Howe',
								  '660,1'    : 'Asia/Kamchatka',
								  '660,0'    : 'Pacific/Noumea',
								  '690,0'    : 'Pacific/Norfolk',
								  '720,1,s'  : 'Pacific/Auckland',
								  '720,0'    : 'Pacific/Tarawa',
								  '765,1,s'  : 'Pacific/Chatham',
								  '780,0'    : 'Pacific/Tongatapu',
								  '780,1,s'  : 'Pacific/Apia',
								  '840,0'    : 'Pacific/Kiritimati'
  						},
  		  AMBIGUITIES = {
					  'America/Denver':       ['America/Denver', 'America/Mazatlan'],
					  'America/Chicago':      ['America/Chicago', 'America/Mexico_City'],
					  'America/Santiago':     ['America/Santiago', 'America/Asuncion', 'America/Campo_Grande'],
					  'America/Montevideo':   ['America/Montevideo', 'America/Sao_Paulo'],
					  'Asia/Beirut':          ['Asia/Beirut', 'Europe/Helsinki', 'Europe/Istanbul', 'Asia/Damascus', 'Asia/Jerusalem', 'Asia/Gaza'],
					  'Pacific/Auckland':     ['Pacific/Auckland', 'Pacific/Fiji'],
					  'America/Los_Angeles':  ['America/Los_Angeles', 'America/Santa_Isabel'],
					  'America/New_York':     ['America/Havana', 'America/New_York'],
					  'America/Halifax':      ['America/Goose_Bay', 'America/Halifax'],
					  'America/Godthab':      ['America/Miquelon', 'America/Godthab'],
					  'Asia/Dubai':           ['Europe/Moscow'],
					  'Asia/Dhaka':           ['Asia/Yekaterinburg'],
					  'Asia/Jakarta':         ['Asia/Omsk'],
					  'Asia/Shanghai':        ['Asia/Krasnoyarsk', 'Australia/Perth'],
					  'Asia/Tokyo':           ['Asia/Irkutsk'],
					  'Australia/Brisbane':   ['Asia/Yakutsk'],
					  'Pacific/Noumea':       ['Asia/Vladivostok'],
					  'Pacific/Tarawa':       ['Asia/Kamchatka'],
					  'Africa/Johannesburg':  ['Asia/Gaza', 'Africa/Cairo'],
					  'Asia/Baghdad':         ['Europe/Minsk']
          			},
		  m	=	{
					d	:	function(){ return _p( m.j() , 2 );  }, 			//day
					D	:	function(){ return m.l().slice(0,3); },
					j	:	function(){ return DO.getDate(); },
					l	:	function(){ return days[ m.w() ]; },
					N	:	function(){ return m.w() || 7;},
					S	:	function(){ var j = m.j(); return j < 4 | j > 20 && (['st', 'nd', 'rd'][ j%10 - 1] || 'th');},
					w	:	function(){ return DO.getDay(); },
					z	:	function(){ var SD = new Date( m.Y() , 0 , 1 ); return Math.round( (DO - SD) / 864e5 ); },
					//week number (-2) is currently wrong
					W	:	function(){ var ST = new Date( m.Y(), m.n() - 1, n.j() - m.N() + 3 ), JF = new Date( ST.getFullYear(), 0, 4);  return _p( 1 + Math.round( (ST-JF) / 864e5 / 7 ), 2);  },	//week
					F	:	function(){ return months[ DO.getMonth() ]; }, //month
					m	:	function(){ var m = String( DO.getMonth() + 1 ); return (m.length == 1)? '0'+m : m; },
					M	:	function(){ return m.F().slice(0,3); },
					n	:	function(){ return DO.getMonth() + 1; },
					t	:	function(){ return (new Date( m.Y(), m.n() , 0)).getDate(); },
					L	:	function(){ return ((new Date( m.Y(), 2 , 0)).getDate() == 28)? 0 : 1; }, //year
					o	:	function(){ var n = m.n(),W = m.W(),Y = m.Y(); console.log(n); return Y + ( n===12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0 ); },
					Y	:	function(){ return DO.getFullYear(); },
					y	:	function(){ return m.Y() % 1000 % 100; },
					a	:	function(){ return (( DO.getHours() * 3600 + DO.getMinutes() * 60  + DO.getSeconds() ) > 43200)? 'pm' : 'am'; },	//time
					A	:	function(){ return (( DO.getHours() * 3600 + DO.getMinutes() * 60  + DO.getSeconds() ) > 43200)? 'PM' : 'AM'; },
					B	:	function(){
								var off = (DO.getTimezoneOffset() + 60)*60;
								var theSeconds = (DO.getHours() * 3600) + (DO.getMinutes() * 60) + DO.getSeconds() + off;
								var beat = Math.floor(theSeconds/86.4);
								if (beat > 1000) beat -= 1000;
								if (beat < 0) beat += 1000;
								return beat; }, //see http://www.jr.pl/www.quirksmode.org/js/beat.html
					g	:	function(){ return m.G() % 12 || 12; },
					G	:	function(){ return DO.getHours(); },
					h	:	function(){ return _p( m.g() , 2 ) ; },
					H	:	function(){ return _p( m.G() , 2); },
					i	:	function(){ return DO.getMinutes(); },
					s	:	function(){ return DO.getSeconds(); },
					u	:	function(){ return _p( DO.getMilliseconds() * 1000, 6); },
					e	:	function(){ var	y = m.Y(),
													_offset = function(d) {  var off = -d.getTimezoneOffset(); return (off !== null ? off : 0); },
													janOff = _offset( new Date(y,0,2) ),
													julOff = _offset( new Date(y,6,2) ),
      												key;
      											
      											if( !m.I() )
      												key = janOff;
      											else {
      												if(  janOff < julOff )
      													key = janOff +',1';
      												else
      													key = julOff + ',1,' + HEMISPHERE_SOUTH;
      											}
      											
      											var T = timezones[key];
      											if( AMBIGUITIES[T] !== 'undefined' ) {
      												var	checklist = AMBIGUITIES[T],
      														length = checklist.length,
      														i = 0,
      														tz = checklist[0];
      													for(; i < length; i+= 1) {
      														tz = checklist[i];
      														
															var	date = dst_starts[tz],
																	base_offset = ( date.getMonth() > 7 ? _offset( new Date( date.getFullYear(), 6 , 2 ))	: _offset( new Date( date.getFullYear(), 0, 2)) ),
																	date_offset = _offset(date);
	
															  if( (base_offset - date_offset) !== 0 )
																	return tz;
																
      													}
      												}
      											
      											return T;
      											
											
											},	//timezone		::		due to the huge list of timezones, this function really isn't feasible as a non-native, best effort award to the authors credited above
					I	:	function(){  var	y = m.Y(),
													a = new Date( y, 0),	// Jan 1
        											c = Date.UTC( y, 0),	// Jan 1 UTC
        											b = new Date( y, 6),  // Jul 1
        											d = Date.UTC( y, 6); // Jul 1 UTC
      											return ((a - c) !== (b - d)) ? 1 : 0; },
					O	:	function(){  var tzo = DO.getTimezoneOffset(),	a = Math.abs(tzo);	return (tzo > 0 ? "-" : "+") + _p(Math.floor(a / 60) * 100 + a % 60, 4); },
					P	:	function(){ var O = m.O(); return (O.substr(0, 3) + ":" + O.substr(3, 2));; },
					T	:	function(){ var ts = DO.cachedToString(); return ts.substr( ts.indexOf('(') + 1, ts.indexOf(')') -  ts.indexOf('(') - 1); }, //assumes the browser knows it's stuff
					Z	:	function(){ return -DO.getTimezoneOffset() * 60; },
					c	:	function(){ return DO.toString('Y-m-d\\TH:i:sP'); },	//Full Date/Time
					r	:	function(){ return DO.toString('D, d M Y H:i:s O'); },
					U	:	function(){ return DO.getTime() / 1000 | 0 }
				};
			
		
	while( i > 0 && i-- ) {
		if( m.hasOwnProperty( f.charAt(i) ) && ( !i || f.charAt(i-1) != '\\') )
			ret = m[ f.charAt(i) ]() + ret;
		else
			ret = f.charAt(i) + ret;
	}
	
	return ret;
	
};
