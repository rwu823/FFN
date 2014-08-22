define(function(require){

  var Kit = require('lib/js/kit') ;
  require('./editor.css') ;
  
  function tipHTML(){
  /*>>>
    <div id="command">$<input /></div>    

    <div id="tip_f1" class="tip_view _f1 _off" >
      <h2>Hot Key</h2>
      <div class="_g">
        <em>F1</em><p>On/Off Help</p>
        <em>F2</em><p>On/Off Perl Manual</p>
        <em>F11</em><p>On/Off Full Screen</p>
      </div>
      <div class="_g">
        <em>Alt + G</em><p>Grid</p>
        <em>Alt + H</em><p>History</p>
        <em>Alt + B</em><p>Batch</p>
        <em>Alt + Z</em><p>Toggle Local/DB</p>
      </div>
      <div class="_g">
        <em>Ctrl + S</em><p>Save & Publish current language</p>
        <em>Ctrl + Shift + S</em><p>Save & Publish All</p>
        <em>Ctrl + Shift + P</em><p>Open command</p>
        <em>Ctrl + Alt + C</em><p>Copy template name</p>
      </div>
      <h2>Command Line</h2>
      <div class="_g _c2">
        <em>vi/vim [template name]</em><p>Open template</p>
        <em>commit [log]</em><p>Commit to DB</p>
        <em>grep [text]</em><p>Search Text</p>
        <em>text/text_js [deftag]</em><p>Find deftag</p>
        <em>clear</em><p>Clear Local</p>
        <em>pu [1234]</em><p>Publish 1=dev,2=staging,3=release,4=live</p>
      </div>

      <div class="_g _c2">
        <em>deftag [text1|text2]</em><p>Find text in deftags</p>
        <em>set [type]</em><p>Set highlight syntax</p>
        <em>env [-d -p -s]</em><p>Change environment -d=dev#, -p=port, -s=site</p>
      </div>
    </div>

    <div id="tip_f2" class="tip_view _f2 _off">
      <h2>GLOBAL</h2>
      <div class="_g _c2">
        <div class="_code">
          <b>{GLOBAL}{SITE}</b>
          <pre>
  [if $self->{GLOBAL}{SITE} eq 'ffadult'] [endif]
          </pre>
        </div>

        <div class="_code">
          <b>{GLOBAL}{DOMAIN_COBRAND}</b>
          <pre>
  [if $self->{DOMAIN_COBRAND} eq 'passion'] [endif]
          </pre>
        </div>

        <div class="_code">
          <b>{GLOBAL}{ADMIN}</b>
          <pre>
  [if $self->{GLOBAL}{ADMIN} == 1] [endif]
          </pre>
        </div>

        <div class="_code">
          <b>{GLOBAL}{LEVEL}</b>
          <pre>
  300 -> Gold
  200 -> Silver
  100 -> Standard
          </pre>
        </div>

        <div class="_code">
          <b>{GLOBAL}{ANON}</b>
          <pre>
  [if $self->{GLOBAL}{ANON} == 1] [endif]
          </pre>
        </div>        

        <div class="_code">
          <b>{GLOBAL}{LANG}</b>
          <pre>
  // english, chinese, spanish, french, german,
  // japanese, korean, portuguese, italian, dutch, swedish
  [if $self->{GLOBAL}{LANG} eq 'english'] [endif]
          </pre>
        </div> 

        <div class="_code">
          <b>{GLOBAL}{PDF}{country}</b>
          <pre>
  [if $self->{GLOBAL}{PDF}{country} eq 'United States'] [endif]
          </pre>
        </div> 

      </div>

      <div class="_g _c2">

        <div class="_code">
          <b>[var GLOBAL->GRAPHICS_DOMAIN]</b>
          <pre>
  http://graphics.pop6.com
          </pre>
        </div>

        <div class="_code">
          <b>
            [var GLOBAL->YEAR] <br/>
            [var GLOBAL->MONTH] <br/>
            [var GLOBAL->DAY] <br/>
            [var GLOBAL->HOUR] <br/>
            [var GLOBAL->MINUTE] <br/>
            [var GLOBAL->SECOND] <br/>
          </b>
          <pre>
  get server time
          </pre>
        </div>

        <div class="_code">
          <b>[var GLOBAL->P_PDF->handle]</b>
          <pre>
  get handle
          </pre>
        </div>

        <div class="_code">
          <b>[var GLOBAL->P_PDF->UID]</b>
          <pre>
  get uid/pwsid
          </pre>
        </div>

        <div class="_code">
          <b>[var GLOBAL->P_PDF->db_user_id]</b>
          <pre>
  member uid
          </pre>
        </div>
 
        <div class="_code">
          <b>[var GLOBAL->V_PDF->db_user_id]</b>
          <pre>
  own uid
          </pre>
        </div>
 


      </div> 

      <h2>ENV</h2>
        <div class="_g">
          
        </div>

    </div> <!-- #tip_f2 -->

  <<<*/
  } 
  
  return {
    tip : tipHTML.toHTML() 

  }  
  
})