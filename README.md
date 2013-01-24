Date.toString.js
================

`Date.prototype.cachedToString();`
`Date.prototype.toString( format );`

A replacement `Date.toString()` method for Javascript `Date` object that allows custom date formatting.  Calling `Date.toString()` without an argument returns the result of `Date.cachedToString()` string with the format `'D l d Y H:i:s \G\M\TO (T)'`

This method produces formatted strings identical to PHPs Date() class: http://php.net/manual/en/function.date.php

Formatting options:
<table>
<tr>
  <td>d</td>
  <td>Day of the month</td>
  <td>2 digits with leading zeros	01 to 31</td>
</tr>
<tr>
  <td>D</td>
  <td>A textual representation of a day</td>
  <td>three letters	Mon through Sun</td>
</tr>
<tr>
  <td>j</td>
  <td>Day of the month without leading zeros</td>
  <td>1 to 31</td>
</tr>
<tr>
  <td>l</td>
  <td>(lowercase 'L')	A full textual representation of the day of the week</td>
  <td>Sunday through Saturday</td>
</tr>
<tr>
  <td>N</td>
  <td>ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)</td>
  <td>1 (for Monday) through 7 (for Sunday)</td>
</tr>
<tr>
  <td>S</td>
  <td>English ordinal suffix for the day of the month</td>
  <td>2 characters	st, nd, rd or th. Works well with j</td>
</tr>
<tr>
  <td>w</td>
  <td>Numeric representation of the day of the week</td>
  <td>0 (for Sunday) through 6 (for Saturday)</td>
</tr>
<tr>
  <td>z</td>
  <td>The day of the year (starting from 0)</td>
  <td>0 through 365</td>
</tr>
<tr>
  <td>W</td>
  <td>ISO-8601 week number of year, weeks starting on Monday (added in PHP 4.1.0)</td>
  <td>Example: 42 (the 42nd week in the year)</td>
</tr>
<tr>
  <td>F</td>
  <td>A full textual representation of a month, such as January or March</td>
  <td>January through December</td>
</tr>
<tr>
  <td>m</td>
  <td>Numeric representation of a month, with leading zeros</td>
  <td>01 through 12</td>
</tr>
<tr>
  <td>M</td>
  <td>A short textual representation of a month, three letters</td><td>Jan through Dec</td>
</tr>
<tr>
  <td>n</td>
  <td>Numeric representation of a month, without leading zeros</td>
  <td>1 through 12</td>
</tr>
<tr>
  <td>t</td>
  <td>Number of days in the given month</td>
  <td>28 through 31</td>
</tr>
<tr>
  <td>L</td>
  <td>Whether it's a leap year</td>
  <td>1 if it is a leap year, 0 otherwise.</td>
</tr>
<tr>
  <td>o</td>
  <td>ISO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0)</td>
  <td>Examples: 1999 or 2003</td>
</tr>
<tr>
  <td>Y</td>
  <td>A full numeric representation of a year, 4 digits</td>
  <td>Examples: 1999 or 2003</td>
</tr>
<tr>
  <td>y</td>
  <td>A two digit representation of a year</td>
  <td>Examples: 99 or 03</td>
</tr>
<tr>
  <td>a</td>
  <td>Lowercase Ante meridiem and Post meridiem</td>
  <td>am or pm</td>
</tr>
<tr>
  <td>A</td>
  <td>Uppercase Ante meridiem and Post meridiem</td>
  <td>AM or PM</td>
</tr>
<tr>
  <td>B</td>
  <td>Swatch Internet time</td>
  <td>000 through 999</td>
</tr>
<tr>
  <td>g</td>
  <td>12-hour format of an hour without leading zeros</td>
  <td>1 through 12</td>
</tr>
<tr>
  <td>G</td>
  <td>24-hour format of an hour without leading zeros</td>
  <td>0 through 23</td>
</tr>
<tr>
  <td>h</td>
  <td>12-hour format of an hour with leading zeros</td>
  <td>01 through 12</td>
</tr>
<tr>
  <td>H</td>
  <td>24-hour format of an hour with leading zeros</td>
  <td>00 through 23</td>
</tr>
<tr>
  <td>i</td>
  <td>Minutes with leading zeros</td>
  <td>00 to 59</td>
</tr>
<tr>
  <td>s</td>
  <td>Seconds, with leading zeros</td>
  <td>00 through 59</td>
</tr>
<tr>
  <td>u</td>
  <td>Microseconds (added in PHP 5.2.2). Note that date() will always generate 000000 since it takes an integer parameter, whereas DateTime::format() does support microseconds.</td>
  <td>Example: 654321</td>
</tr>
<tr>
  <td>e</td>
  <td>Timezone identifier (added in PHP 5.1.0)</td>
  <td>Examples: UTC, GMT, Atlantic/Azores</td>
</tr>
<tr>
  <td>I</td>
  <td>(capital i)	Whether or not the date is in daylight saving time</td>
  <td>1 if Daylight Saving Time, 0 otherwise.</td>
</tr>
<tr>
  <td>O</td>
  <td>Difference to Greenwich time (GMT) in hours</td>
  <td>Example: +0200</td>
</tr>
<tr>
  <td>P</td>
  <td>Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3)</td>
  <td>Example: +02:00</td>
</tr>
<tr>
  <td>T</td>
  <td>Timezone abbreviation</td>
  <td>Examples: EST, MDT ...</td>
</tr>
<tr>
  <td>Z</td>
  <td>Timezone offset in seconds.</td>
  <td>The offset for timezones west of UTC is always negative, and for those east of UTC is always positive.	-43200 through 50400</td>
</tr>
<tr>
  <td>c</td>
  <td>ISO 8601 date (added in PHP 5)</td>
  <td>2004-02-12T15:19:21+00:00</td>
</tr>
<tr>
  <td>r</td>
  <td>» RFC 2822 formatted date
  <td>Example: Thu, 21 Dec 2000 16:01:07 +0200</td>
</tr>
<tr>
  <td>U</td>
  <td>Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)</td>
  <td></td>
</tr>
</table>


Except otherwise declared: © Copyright 2013  James Thoburn http://jthoburn.com, http://runspired.com
Available under `Creative Commons: no attribution required (CC0)` [but I'd always appreciate love].
  
The beat calculation (I'd never heard of the Internet Beat before) credits http://www.jr.pl/www.quirksmode.org/js/beat.html
  
Timezone name calculation utilizes modified MIT licensed https://bitbucket.org/pellepim/jstimezonedetect/overview
Due to how many timezones there are and all the problems associated, read the Overview linked above for what you'll be getting.
  
Timezone abbreviation trusts the browser to have gotten it right in the original toString method, and returns a substring from that method.
  
  
NOTE / BEST PRACTICE WARNING
--

It is not considered best practice to modify the prototypes of Native Javascript objects.  Here,
while the case could be made that the native Date object is extremely limited in abilities and usefullness
I still would not recommend modifying the prototype.  In my own use, the code below is converted
for use in a "native object expansion / chaining" library.
	
Final Point
--
I have run few performance tests on this script, and there's likely a few things that could stand some optimization.  The minified version was compiled using ADVANCED_OPTIMIZATION and the Google Appspot closure compiler.
