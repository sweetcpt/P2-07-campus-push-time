(function(){
  var P=window.P2, form=document.getElementById('entryForm'), error=document.getElementById('entryError');
  var studentInput=document.getElementById('studentId'), nameInput=document.getElementById('name'), classInput=document.getElementById('className');
  var saved=P.getProfile();
  if(saved){studentInput.value=saved.studentId;nameInput.value=saved.name;classInput.value=saved.className;}
  if(new URLSearchParams(location.search).get('preview'))document.getElementById('previewNote').hidden=false;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var data={studentId:studentInput.value.trim(),name:nameInput.value.trim(),className:classInput.value.trim()};
    if(!data.studentId||!data.name||!data.className){error.textContent='请完整填写学号、姓名和班级。';error.classList.add('show');return;}
    try{var old=P.getProfile();P.setProfile(data);if(old&&old.studentId!==data.studentId)P.clearSession();var preview=new URLSearchParams(location.search).get('preview');location.href='experience.html?e=P2-07'+(preview?'&preview='+encodeURIComponent(preview):'');}
    catch(x){error.textContent='登记失败，请重新填写。';error.classList.add('show');}
  });
})();
