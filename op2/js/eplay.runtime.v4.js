!(function () {

  var __head = document.getElementsByTagName('head')[0];
  var __link = document.createElement('link');
  __link.async = false;
  __link.rel = 'stylesheet';
  __link.type = 'text/css';
  __link.href = (window.EPLAY_SYNC_CSS || 'https://cdn-latam.eplaytecnologia.com') + '/player/css/player.runtime.v1.css';
  __link.media = 'all';
  __head.appendChild(__link);

  try {
    window.addEventListener("message", function (event) {
      if (event.data.command == 'open') {
        window.location = event.data.url;
      }

      if (event.data.command == 'showbutton') {
        var tmpLinkAccess = event.data.linkAccess;
        var params = new URLSearchParams(window.location.search);

        if(params.get('src')){
          let sizeParams = new  URLSearchParams(tmpLinkAccess);
          let letter = sizeParams.size > 0 && sizeParams.values.length > 0 ? "&" : "?";
          tmpLinkAccess = tmpLinkAccess+letter+"src="+params.get("src");
        }
        if(params.get('utm_campaign')){
          let sizeParams = new  URLSearchParams(tmpLinkAccess);
          let letter = sizeParams.size > 0 && sizeParams.values.length > 0 ? "&" : "?";
          tmpLinkAccess = tmpLinkAccess+letter+"utm_campaign="+params.get("utm_campaign");
        }
        if(params.get('utm_medium')){
          let sizeParams = new  URLSearchParams(tmpLinkAccess);
          let letter = sizeParams.size > 0 && sizeParams.values.length > 0 ? "&" : "?";
          tmpLinkAccess = tmpLinkAccess+letter+"utm_medium="+params.get("utm_medium");
        }
        createButtonCheckout(event.data.hash, event.data.color, event.data.backgroundColor, event.data.text, event.data.classbtn, tmpLinkAccess);
      }

      if (event.data.command == 'hidebutton') {
        hiddeButtonCheckout(event.data.hash);
      }
    }, false);
  } catch (e) { }


  function redirectCheckoutPlay(obj, link) {
    obj.innerHTML = 'Aguarde ....';
    window.open(link,"_self");
    //window.location = link;
  }

  
  function hiddeButtonCheckout(hash) {
    let elDivExternal = document.getElementById('div_hash_' + hash);
    elDivExternal.style.display = 'none';
  }

  function createButtonCheckout(hash, color, backgroundColor, text, classbtn, linkAccess) {
    let elDivExternal = document.getElementById('div_hash_' + hash);

    if(elDivExternal.style.display === 'block')
    {
      return;
    }

    elDivExternal.innerHTML = '<center><button class="' + classbtn + '" id="_button_trigger_pay_player_' + hash + '" style="position:relative;z-index: 100000000;">' + text + '</button></center>';
    elDivExternal.style.display = 'block';
    let elBtnTrigger = document.getElementById('_button_trigger_pay_player_' + hash);
    elBtnTrigger.style.backgroundColor = backgroundColor;
    elBtnTrigger.style.borderColor = backgroundColor;
    elBtnTrigger.style.color = color;
    elBtnTrigger.style.boxShadow = '0 0 5px ' + backgroundColor;
    elBtnTrigger.style.display = 'block';
    elBtnTrigger.style.zIndex = 10000;
    elBtnTrigger.addEventListener('click', function (e) {
          setTimeout(function(){
            redirectCheckoutPlay(elBtnTrigger, linkAccess); 
          }, 5000);  
        
          redirectCheckoutPlay(elBtnTrigger, linkAccess); 
      });

    setTimeout(function(){
      try{
        //document.getElementById('div_hash_'+ hash).scrollIntoView();
      }catch(err){ console.log(err); }
    }, 100);   
  }

  function getLegacyId(){
    let framesBrow = document.getElementsByTagName('div');
    for(i = 0;i < framesBrow.length; i++){
      if(framesBrow[i].id && framesBrow[i].id.toString().substring(0, 8) === 'div_hash')
      { return framesBrow[i].id.toString().replace('div_hash_',''); }
    }
    return "";
  }
 

})(window, document);
