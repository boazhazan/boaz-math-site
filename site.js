'use strict';
const exercises = {
  fractions: {label:'שברים · למצוא שפה משותפת',question:'1/3 + 1/4 = ?',hint:'כדי לחבר שברים, צריך לחלק את השלם לחלקים באותו גודל. איזה מספר מתחלק גם ב־3 וגם ב־4?',solution:'מחלקים לשנים עשר חלקים שווים. שליש הוא 4/12 ורבע הוא 3/12. מחברים את החלקים: 4/12 + 3/12 = 7/12.'},
  equation: {label:'משוואות · אותה פעולה בשני הצדדים',question:'3(x − 2) = 12',hint:'אפשר להתחיל בחלוקת שני אגפי המשוואה ב־3. מה נשאר בתוך הסוגריים?',solution:'מחלקים את שני האגפים ב־3 ומקבלים x − 2 = 4. מוסיפים 2 לשני האגפים: x = 6. בודקים במשוואה המקורית: 3 × (6 − 2) = 12.'},
  function: {label:'פונקציות · להבין את ההצבה',question:'f(x) = x² − 4x + 3\nf(2) = ?',hint:'בכל מקום שבו מופיע x מציבים 2. זכרו לחשב קודם חזקה וכפל.',solution:'מציבים: f(2) = 2² − 4 × 2 + 3. מחשבים: 4 − 8 + 3 = −1. לכן f(2) = −1.'}
};
let exercise = 'fractions';
document.querySelectorAll('[data-exercise]').forEach(button=>button.addEventListener('click',()=>{
  exercise=button.dataset.exercise;
  document.querySelectorAll('[data-exercise]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.getElementById('exerciseLabel').textContent=exercises[exercise].label;
  document.getElementById('exerciseQuestion').textContent=exercises[exercise].question;
  document.getElementById('fractionBars').hidden=exercise!=='fractions';
  document.getElementById('exerciseHint').hidden=true;
  document.getElementById('exerciseSolution').hidden=true;
}));
document.getElementById('hintBtn')?.addEventListener('click',()=>{const el=document.getElementById('exerciseHint');el.textContent=exercises[exercise].hint;el.hidden=false;});
document.getElementById('solutionBtn')?.addEventListener('click',()=>{const el=document.getElementById('exerciseSolution');el.textContent=exercises[exercise].solution;el.hidden=false;});
document.getElementById('format')?.addEventListener('change',event=>{const home=event.target.value==='home';document.getElementById('neighborhoodGroup').hidden=!home;});
document.getElementById('lessonForm')?.addEventListener('submit',event=>{
  event.preventDefault();const format=document.getElementById('format').value;
  let message='היי בועז, אשמח לבדוק התאמה וזמינות לשיעור במתמטיקה.\nשלב לימודים: '+document.getElementById('grade').value+'\nסוג שיעור: '+(format==='home'?'בבית התלמיד בחדרה':'בזום');
  const neighborhood=document.getElementById('neighborhood').value.trim();if(format==='home'&&neighborhood)message+='\nשכונה בחדרה: '+neighborhood;
  const need=document.getElementById('need').value.trim();if(need)message+='\nבמה צריך עזרה: '+need;
  window.open('https://wa.me/972523616310?text='+encodeURIComponent(message),'_blank','noopener');
});
