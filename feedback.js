'use strict';
const form=document.getElementById('feedbackForm');
const role=document.getElementById('role');
const consent=()=>form.querySelector('input[name="consent"]:checked')?.value;
function refreshFields(){
  const professional=role.value==='professional';
  document.getElementById('studentQuestions').hidden=!role.value||professional;
  document.getElementById('professionalQuestions').hidden=!professional;
  document.getElementById('fullNameOption').hidden=!professional;
  if(!professional&&document.getElementById('attribution').value==='professional-name')document.getElementById('attribution').value='anonymous';
  const publish=consent()==='publish';
  document.getElementById('publicationFields').hidden=!publish;
  document.getElementById('quote').required=publish;
  const named=publish&&document.getElementById('attribution').value!=='anonymous';
  document.getElementById('displayNameGroup').hidden=!named;
  document.getElementById('displayName').required=named;
}
form.addEventListener('change',refreshFields);
form.addEventListener('input',()=>{document.getElementById('review').hidden=true;document.getElementById('sendFeedback').removeAttribute('href');});
form.addEventListener('change',()=>{document.getElementById('review').hidden=true;document.getElementById('sendFeedback').removeAttribute('href');});
const val=id=>document.getElementById(id).value.trim();
form.addEventListener('submit',event=>{
  event.preventDefault();
  const roleText=role.options[role.selectedIndex].text;
  let message='משוב לבועז חזן\nתאריך: '+new Intl.DateTimeFormat('he-IL',{timeZone:'Asia/Jerusalem'}).format(new Date())+'\nממלא/ת: '+roleText;
  const add=(label,id)=>{const value=val(id);if(value)message+='\n\n'+label+':\n'+value;};
  add('ההיכרות והמסגרת','relationship');
  if(role.value==='professional')add('תחום העבודה המשותפת','professionalContext');
  else{add('שלב לימודים','schoolStage');add('הצורך בתחילת הלמידה','startingPoint');}
  add('מה עזר ומה פחות התאים','experience');add('שינוי ודוגמה','change');add('הצעות לשיפור','improve');
  if(consent()==='publish'){
    message+='\n\nאישור פרסום: אני מאשר/ת לפרסם באתר של בועז רק את הציטוט ופרטי הזיהוי הבאים. שאר התשובות לשיפור בלבד. שינוי בנוסח הציטוט דורש אישור נוסף.';
    add('הציטוט המאושר לפרסום','quote');
    message+='\n\nצורת הצגה: '+document.getElementById('attribution').selectedOptions[0].text;
    if(val('attribution')!=='anonymous')add('שם מאושר להצגה','displayName');
    message+='\nתיאור מאושר להצגה: '+(val('publicRole')||roleText);
  }else message+='\n\nאישור פרסום: לא מאשר/ת. כל התשובות לשיפור בלבד. אין לפרסם את המשוב או פרטים מתוכו באתר.';
  document.getElementById('reviewMessage').textContent=message;
  document.getElementById('sendFeedback').href='https://wa.me/972523616310?text='+encodeURIComponent(message);
  document.getElementById('review').hidden=false;
  document.getElementById('review').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
});
refreshFields();
